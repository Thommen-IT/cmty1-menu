/* CMTY1 Menu Code — dynamic fetch from per-tenant /api/v1/app/menu.json */

var urls = [];
var isSetupComplete = false;
var startDomain = "cmtyone.com";

/* Fallback menu for cmtyone.com (platform hub — no tenant API yet) */
var CMTYONE_FALLBACK = [
    { label: "HOME",     url: "https://cmtyone.com",            icon: "fas fa-home" },
    { label: "RELEASES", url: "https://cmtyone.com/releases/",  icon: "fas fa-sparkles" },
    { label: "SUPREME",  url: "https://cmtyone.com/supreme/",   icon: "fas fa-sparkles" },
    { label: "NIKE",     url: "https://cmtyone.com/nike/",      icon: "fas fa-sparkles" },
    { label: "ART",      url: "https://cmtyone.com/art/",       icon: "fas fa-sparkles" },
    { label: "FASHION",  url: "https://cmtyone.com/fashion/",   icon: "fas fa-sparkles" }
];

function set_menu() {
    var host = window.location.host;

    /* Platform hub still uses the hardcoded fallback */
    if (host === "cmty.one" || host === "cmtyone.com" || host === "www.cmtyone.com") {
        median.sidebar.setItems({ items: CMTYONE_FALLBACK, enabled: true, persist: false });
        return;
    }

    /* Tenant domains: fetch live menu from AIO */
    fetch("/api/v1/app/menu.json", { credentials: "same-origin" })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data && data.enabled && data.items && data.items.length) {
                median.sidebar.setItems({
                    items: data.items,
                    enabled: true,
                    persist: data.persist === true
                });
            } else {
                console.log("CMTY1: menu.json returned no items for " + host);
            }
        })
        .catch(function (err) {
            console.log("CMTY1: menu fetch error: " + err);
        });
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function set_title(title) {
    median.navigationTitles.setCurrent({title: title});
}

function prepare_title() {
    var metaElement = document.querySelector('meta[name="app-title"]');
    var metaContent = metaElement ? metaElement.getAttribute('content') : null;
    var htmlTitle = document.title.split(' -')[0];
    var title = metaContent && metaContent.trim() !== '' ? metaContent : htmlTitle;
    set_title(title);
}

/* Onesignal */
function generateSelectiveOneSignalInfoHash(oneSignalInfo) {
    const keysToInclude = ['osVersion', 'appBuild', 'appVersion', 'oneSignalNotificationPermissionStatus', 'oneSignalSubscribed', 'oneSignalNotificationsEnabled', 'installationId'];

    const filteredInfo = {};
    keysToInclude.forEach(key => {
        if (oneSignalInfo.hasOwnProperty(key)) {
            filteredInfo[key] = oneSignalInfo[key];
        }
    });

    const str = JSON.stringify(filteredInfo, Object.keys(filteredInfo).sort());
    let hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash.toString();
}

function sendOneSignalInfoToServer(oneSignalInfo) {
    const endpoint = 'https://app.cmty.one/api/register-push';

    try {
        const iamDetailsJson = localStorage.getItem('iamPromptDetails');
        if (iamDetailsJson) {
            const iamDetails = JSON.parse(iamDetailsJson);
            oneSignalInfo.iamInteractionAction = iamDetails.interactionType;
            oneSignalInfo.iamInteractionTimestamp = iamDetails.timestamp;
        }
    } catch (error) {
        console.error('Error appending IAM interaction details to OneSignal info:', error);
    }

    console.log('CMTY1: OneSignal info sending:' + JSON.stringify(oneSignalInfo));

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oneSignalInfo)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => console.log('CMTY1: OneSignal info sent successfully:' + JSON.stringify(data)))
    .catch(error => console.log('CMTY1: Error sending OneSignal info:' + JSON.stringify(error)));
}

function cmty_push_registered() {
    median.onesignal.onesignalInfo().then(function (oneSignalInfo) {
        sendOneSignalInfoToServer(oneSignalInfo);
    });
}

/* In-App Messaging (IAM) */
function checkAndTriggerIAMPrompt(oneSignalInfo) {
    var iamDetails = localStorage.getItem('iamPromptDetails');
    var details = iamDetails ? JSON.parse(iamDetails) : null;

    if (!details) {
        if (!oneSignalInfo.oneSignalSubscribed || (isIOS() && oneSignalInfo.oneSignalNotificationPermissionStatus !== 'authorized')) {
            console.log('CMTY1: First visit without IAM interaction recorded. Showing IAM prompt.');
            triggerIAM(true);
            return;
        }
    } else if (details.interactionType === "pushLater") {
        const daysSinceLastPrompt = (Date.now() - details.timestamp) / (1000 * 60 * 60 * 24);
        if (daysSinceLastPrompt >= 7) {
            console.log('CMTY1: "PushLater" selected and 7 days passed. Showing IAM prompt again.');
            triggerIAM(true);
            return;
        } else {
            console.log('CMTY1: "PushLater" selected but not enough time has passed. Skipping IAM prompt.');
            triggerIAM(false);
            return;
        }
    }

    console.log('CMTY1: Conditions for showing IAM prompt not met.');
    triggerIAM(false);
}

function triggerIAM(showIAM) {
    console.log('CMTY1: triggerIAM showPrompt: ' + showIAM);
    if (showIAM) {
        median.onesignal.iam.addTrigger({'showPrompt': 'true'});
    } else {
        median.onesignal.iam.removeTriggerForKey('showPrompt');
    }
}

function iamResponseHandler(data) {
    console.log('CMTY1: OneSignal iamResponseHandler');
    try {
        const interactionData = {
            interactionType: data.clickName,
            timestamp: Date.now()
        };
        localStorage.setItem('iamPromptDetails', JSON.stringify(interactionData));
        median.onesignal.onesignalInfo().then(function (oneSignalInfo) {
            sendOneSignalInfoToServer(oneSignalInfo);
        });
    } catch (error) {
        console.log('Error in IAM response: ' + JSON.stringify(error));
    }
}

function median_library_ready() {
    console.log('CMTY1: median_library_ready');
    median.onesignal.iam.setInAppMessageClickHandler('iamResponseHandler');

    if (isSetupComplete) return;
    if (navigator.userAgent.indexOf('cmtyone') > -1) {
        if (window.location.pathname != "/" && window.location.pathname != "/mobile" && window.location.pathname != "/mobile2" && window.location.hostname != "cmty.one" && window.location.hostname != "cmtyone.com") {
            prepare_title();
        }
        set_menu();
        isSetupComplete = true;
    }
}

function median_onesignal_info(oneSignalInfo) {
    console.log('CMTY1: Received OneSignal Info:' + JSON.stringify(oneSignalInfo));

    if (window.location.hostname === startDomain) {
        sendOneSignalInfoToServer(oneSignalInfo);
        checkAndTriggerIAMPrompt(oneSignalInfo);
        return;
    }

    const currentHash = generateSelectiveOneSignalInfoHash(oneSignalInfo);
    const storedHash = localStorage.getItem('oneSignalSelectiveInfoHash');
    localStorage.setItem('oneSignalSelectiveInfoHash', currentHash);

    if (currentHash === storedHash) {
        console.log('CMTY1: Significant OneSignal info has not changed. No need to send to server.');
        return;
    }
    sendOneSignalInfoToServer(oneSignalInfo);
}

if (window.median) {
    window.median_library_ready();
}

window.addEventListener('hashchange', function () {
    if (!window.location.hash.includes('google_vignette')) {
        console.log('#google_vignette has been removed from the URL hash');
        prepare_title();
    }
});
