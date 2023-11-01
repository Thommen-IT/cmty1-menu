// this function accepts a callback function as params.callback that will be called with the command results
// if a callback is not provided it returns a promise that will resolve with the command results
function addCommandCallback(command, params, persistCallback) {
    if(params && (params.callback || params.callbackFunction)){
        // execute command with provided callback function
        addCommand(command, params, persistCallback);
    } else {
        // create a temporary function and return a promise that executes command
        var tempFunctionName = '_gonative_temp_' + Math.random().toString(36).slice(2);
        if(!params) params = {};
        params.callback = tempFunctionName;
        return new Promise(function(resolve, reject) {
            // declare a temporary function
            window[tempFunctionName] = function(data) {
                resolve(data);
                delete window[tempFunctionName];
            }
            // execute command
            addCommand(command, params);
        });
    }
}

function addCallbackFunction(callbackFunction, persistCallback){
    var callbackName;
    if(typeof callbackFunction === 'string'){
        callbackName = callbackFunction;
    } else {
        callbackName = '_gonative_temp_' + Math.random().toString(36).slice(2);
        window[callbackName] = function(...args) {
            callbackFunction.apply(null, args);
            if(!persistCallback){ // if callback is used just once
                delete window[callbackName];
            }
        }
    }
    return callbackName;
}

function addCommand(command, params, persistCallback){
    var commandObject = undefined;
    if(params) {
        commandObject = {};
        if(params.callback && typeof params.callback === 'function'){
            params.callback = addCallbackFunction(params.callback, persistCallback);
        }
        if(params.callbackFunction && typeof params.callbackFunction === 'function'){
            params.callbackFunction = addCallbackFunction(params.callbackFunction, persistCallback);
        }
        if(params.statuscallback && typeof params.statuscallback === 'function'){
            params.statuscallback = addCallbackFunction(params.statuscallback, persistCallback);
        }
        commandObject.gonativeCommand = command;
        commandObject.data = params;
    } else commandObject = command;

    window.webkit.messageHandlers.JSBridge.postMessage(commandObject);
}

///////////////////////////////
////    General Commands   ////
///////////////////////////////

var gonative = {};

// to be modified as required
gonative.nativebridge = {
    custom: function (params){
        addCommand("gonative://nativebridge/custom", params);
    },
    multi: function (params){
        addCommand("gonative://nativebridge/multi", params);
    }
};

gonative.registration = {
    send: function(customData){
        var params = {customData: customData};
        addCommand("gonative://registration/send", params);
    }
};

gonative.sidebar = {
    setItems: function (params){
        addCommand("gonative://sidebar/setItems", params);
    },
    getItems: function (params){
        return addCommandCallback("gonative://sidebar/getItems", params);
    }
};

gonative.tabNavigation = {
    selectTab: function (tabIndex){
        addCommand("gonative://tabs/select/" + tabIndex);
    },
    deselect: function (){
        addCommand("gonative://tabs/deselect");
    },
    setTabs: function (tabs){
        addCommand("gonative://tabs/setTabs", { tabs });
    }
};

gonative.share = {
    sharePage: function (params){
        addCommand("gonative://share/sharePage", params);
    },
    downloadFile: function (params){
        addCommand("gonative://share/downloadFile", params);
    },
    downloadImage: function (params){
        addCommand("gonative://share/downloadImage", params);
    }
};

gonative.open = {
    appSettings: function (){
        addCommand("gonative://open/app-settings");
    }
};

gonative.webview = {
    clearCache: function(){
        addCommand("gonative://webview/clearCache");
    },
    clearCookies: function(){
        addCommand("gonative://webview/clearCookies");
    },
    reload: function () {
        addCommand("gonative://webview/reload");
    }
};

gonative.webconsolelogs = {
    print: function(params){
        addCommand("gonative://webconsolelogs/print", params);
    }
}

gonative.config = {
    set: function(params){
        addCommand("gonative://config/set", params);
    }
};

gonative.navigationTitles = {
    set: function (parameters){
        var params = {
            persist: parameters.persist,
            data: parameters
        };
        addCommand("gonative://navigationTitles/set", params);
    },
    setCurrent: function (params){
        addCommand("gonative://navigationTitles/setCurrent", params);
    },
    revert: function(){
        addCommand("gonative://navigationTitles/set?persist=true");
    }
};

gonative.navigationLevels = {
    set: function (parameters){
        var params = {
            persist: parameters.persist,
            data: parameters
        };
        addCommand("gonative://navigationLevels/set", params);
    },
    setCurrent: function(params){
        addCommand("gonative://navigationLevels/set", params);
    },
    revert: function(){
        addCommand("gonative://navigationLevels/set?persist=true");
    }
};

gonative.statusbar = {
    set: function (params){
        addCommand("gonative://statusbar/set", params);
    },
    matchBodyBackgroundColor: function (params){
        addCommand("gonative://statusbar/matchBodyBackgroundColor", params);
    }
};

gonative.screen = {
    setBrightness: function(data){
        var params = data;
        if(typeof params === 'number'){
            params = {brightness: data};
        }
        addCommand("gonative://screen/setBrightness", params);
    },
    setMode: function(params) {
        if (params.mode) {
            addCommand("gonative://screen/setMode", params);
        }
    },
    keepScreenOn: function(params){
        addCommand("gonative://screen/keepScreenOn", params);
    },
    keepScreenNormal: function(){
        addCommand("gonative://screen/keepScreenNormal");
    }
};

gonative.navigationMaxWindows = {
    set: function (maxWindows, autoClose){
        var params = {
            data: maxWindows,
            autoClose: autoClose,
            persist: true
        };
        addCommand("gonative://navigationMaxWindows/set", params);
    },
    setCurrent: function(maxWindows, autoClose){
        var params = {data: maxWindows, autoClose: autoClose};
        addCommand("gonative://navigationMaxWindows/set", params);
    }
}

gonative.connectivity = {
    get: function (params){
        return addCommandCallback("gonative://connectivity/get", params);
    },
    subscribe: function (params){
        return addCommandCallback("gonative://connectivity/subscribe", params, true);
    },
    unsubscribe: function (){
        addCommand("gonative://connectivity/unsubscribe");
    }
}

gonative.run = {
    deviceInfo: function(){
        addCommand("gonative://run/gonative_device_info");
    }
};

gonative.deviceInfo = function(params){
    return addCommandCallback("gonative://run/gonative_device_info", params, true);
};

gonative.internalExternal = {
    set: function(params){
        addCommand("gonative://internalExternal/set", params);
    }
};

gonative.clipboard = {
    set: function(params){
        addCommand("gonative://clipboard/set", params);
    },
    get: function(params){
        return addCommandCallback("gonative://clipboard/get", params);
    }
};

gonative.window = {
    open: function (urlString){
        var params = {url: urlString};
        addCommand("gonative://window/open", params);
    },
    close: function () {
        addCommand("gonative://window/close");
    }
}

///////////////////////////////
////     iOS Exclusive     ////
///////////////////////////////

gonative.ios = {};

gonative.ios.window = {
    open: function (urlString){
        var params = {url: urlString};
        addCommand("gonative://window/open", params);
    },
    setWindowOpenHideNavbar: function (value){
        var params = {windowOpenHideNavbar: value};
        addCommand("gonative://window/setWindowOpenHideNavbar", params);
    }
};

gonative.ios.geoLocation = {
    requestLocation: function (){
        addCommand("gonative://geolocationShim/requestLocation");
    },
    startWatchingLocation: function (){
        addCommand("gonative://geolocationShim/startWatchingLocation");
    },
    stopWatchingLocation: function (){
        addCommand("gonative://geolocationShim/stopWatchingLocation");
    }
};

gonative.ios.attconsent = {
    request: function (params){
        return addCommandCallback("gonative://ios/attconsent/request", params);
    },
    status: function (params){
        return addCommandCallback("gonative://ios/attconsent/status", params);
    }
};

gonative.ios.backgroundAudio = {
    start: function(){
        addCommand("gonative://backgroundAudio/start");
    },
    end: function(){
        addCommand("gonative://backgroundAudio/end");
    }
};

gonative.ios.contextualNavToolbar = {
    set: function (params){
        addCommand("gonative://ios/contextualNavToolbar/set", params);
    }
};


///////////////////////////////
////   Android Exclusive   ////
///////////////////////////////

gonative.android = {};

gonative.android.geoLocation = {
    promptAndroidLocationServices: function(){
        addCommand("gonative://geoLocation/promptAndroidLocationServices");
    }
};

gonative.android.screen = {
    fullscreen: function(){
        addCommand("gonative://screen/fullscreen");
    },
    normal: function(){
        addCommand("gonative://screen/normal");
    },
    keepScreenOn: function(){
        addCommand("gonative://screen/keepScreenOn");
    },
    keepScreenNormal: function(){
        addCommand("gonative://screen/keepScreenNormal");
    }
};

gonative.android.audio = {
    requestFocus: function(enabled){
        var params = {enabled: enabled};
        addCommand("gonative://audio/requestFocus", params);
    }
};

//////////////////////////////////////
////   Webpage Helper Functions   ////
//////////////////////////////////////

function gonative_match_statusbar_to_body_background_color() {
    let rgb = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substring(rgb.indexOf('(')+1).split(")")[0].split(sep).map(function(x) { return x * 1; });
    if(rgb.length === 4){
        rgb = rgb.map(function(x){ return parseInt(x * rgb[3]); })
    }
    let hex = '#' + rgb[0].toString(16).padStart(2,'0') + rgb[1].toString(16).padStart(2,'0') + rgb[2].toString(16).padStart(2,'0');
    let luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // per ITU-R BT.709
    if(luma > 40){
        gonative.statusbar.set({'style': 'dark', 'color': hex});
    }
    else{
        gonative.statusbar.set({'style': 'light', 'color': hex});
    }
}

///////////////////////////////
////    Median Functions   ////
///////////////////////////////

var median = {};

median.keyboard = {
    info: function () {
        return addCommandCallback("median://keyboard/info");
    },
    listen: function (callback) {
        addCommand("median://keyboard/listen", { callback });
    }
};

/* OneSignal Plugin */
// onesignal
gonative.onesignal = {
    run: {
        onesignalInfo: function(){
            addCommand("gonative://run/gonative_onesignal_info");
        }
    },
    onesignalInfo: function(params){
        return addCommandCallback("gonative://run/gonative_onesignal_info", params, true);
    },
    register: function (){
        addCommand("gonative://onesignal/register");
    },
    userPrivacyConsent:{
        grant: function (){
            addCommand("gonative://onesignal/userPrivacyConsent/grant");
        },
        revoke: function (){
            addCommand("gonative://onesignal/userPrivacyConsent/revoke");
        }
    },
    tags: {
        getTags: function(params){
            return addCommandCallback("gonative://onesignal/tags/get", params);
        },
        setTags: function (params){
            addCommand("gonative://onesignal/tags/set", params);
        },
        deleteTags: function (params){
            addCommand("gonative://onesignal/tags/delete", params);
        }
    },
    showTagsUI: function (){
        addCommand("gonative://onesignal/showTagsUI");
    },
    promptLocation: function (){
        addCommand("gonative://onesignal/promptLocation");
    },
    iam: {
        addTrigger: function (triggers){
            if(triggers){
                var keyLocal = Object.keys(triggers)[0];
                var params = {
                    key: keyLocal,
                    value: triggers[keyLocal]
                };
                addCommand("gonative://onesignal/iam/addTrigger", params);
            }
        },
        addTriggers: function (params){
            addCommand("gonative://onesignal/iam/addTriggers", params);
        },
        removeTriggerForKey: function (key){
            var params = {key: key};
            addCommand("gonative://onesignal/iam/removeTriggerForKey", params);
        },
        getTriggerValueForKey: function (key){
            var params = {key: key};
            addCommand("gonative://onesignal/iam/getTriggerValueForKey", params);
        },
        pauseInAppMessages: function (){
            addCommand("gonative://onesignal/iam/pauseInAppMessages?pause=true");
        },
        resumeInAppMessages: function (){
            addCommand("gonative://onesignal/iam/pauseInAppMessages?pause=false");
        },
        setInAppMessageClickHandler: function (handler){
            var params = {handler: handler};
            addCommand("gonative://onesignal/iam/setInAppMessageClickHandler", params);
        }
    },
    externalUserId: {
        set: function (params){
            addCommand("gonative://onesignal/externalUserId/set", params);
        },
        remove: function (){
            addCommand("gonative://onesignal/externalUserId/remove");
        }
    },
    enableForegroundNotifications: function (enabled) {
        addCommand("gonative://onesignal/enableForegroundNotifications", { enabled });
    }
};


/* CMTY1 Menu Code */

var urls = [];
function set_menu() {
  var host = window.location.host;
  var items = "[]";
  switch(host) {
      case 'cmty.one':
        items = [{
              label: "HOME",
              url: "https://cmty.one/",
              icon: "fas fa-home"
            },{
              label: "LATEST",
              url: "https://cmty.one/latest/",
              icon: "fas fa-sparkles"
            }, {
              label: "NEWS",
              isGrouping: true,
              icon: "fas fa-newspaper",
              subLinks: [{
                label: "SUPREME",
                url: "https://cmty.one/category/supreme/",
                icon: "custom icon-supreme-logo"
              },{
                label: "PALACE",
                url: "https://cmty.one/category/palace/",
                icon: "custom icon-palace-logo"
              }, {
                label: "FASHION",
                url: "https://cmty.one/category/fashion/",
                icon: "fas fa-shirt"
              }, {
                label: "SNEAKERS",
                url: "https://cmty.one/category/sneakers/",
                icon: "fas fa-shoe-prints"
              }]
            },{
              label: "GALLERY",
              url: "",
              icon: "fas fa-images-user"
            }];
        break;
      case 'supremecommunity.com':
      case 'www.supremecommunity.com':
        items = [{
              label: "HOME",
              url: "https://www.supremecommunity.com/mobile2",
              icon: "fas fa-home"
            },{
              label: "ITEMS",
              url: "https://www.supremecommunity.com/season/latest/overview/",
              icon: "fas fa-clothes-hanger"
            },{
              label: "DROPLISTS",
              url: "https://www.supremecommunity.com/season/latest/droplists/",
              icon: "fas fa-list-dropdown"
            },{
              label: "LEFT TO DROP",
              url: "https://www.supremecommunity.com/season/latest/lefttodrop/",
              icon: "fas fa-list-timeline"
            },{
              label: "RESTOCKS",
              isGrouping: true, 
              icon: "fas fa-retweet",
              subLinks: [{
                label: "EU",
                url: "https://www.supremecommunity.com/restocks/eu/",
                icon: "" 
              }, {
                label: "UK",
                url: "https://www.supremecommunity.com/restocks/uk/",
                icon: ""
              },{
                label: "US",
                url: "https://www.supremecommunity.com/restocks/us/",
                icon: ""
              },{
                label: "JPN",
                url: "https://www.supremecommunity.com/restocks/jpn/",
                icon: ""
              }]
            },{
              label: "SELLOUT TIMES",
              isGrouping: true,
              icon: "fas fa-timer",
              subLinks: [{
                label: "EU",
                url: "https://www.supremecommunity.com/season/latest/times/eu/",
                icon: "" 
              }, {
                label: "UK",
                url: "https://www.supremecommunity.com/season/latest/time/uk/",
                icon: ""
              },{
                label: "US",
                url: "https://www.supremecommunity.com/season/latest/time/us/",
                icon: ""
              },{
                label: "JPN",
                url: "https://www.supremecommunity.com/season/latest/time/jpn/",
                icon: ""
              }]
            },{
              label: "LOOKBOOKS",
              url: "https://www.supremecommunity.com/season/latest/lookbook/",
              icon: "fas fa-book-user"
            },{
              label: "WEBSHOP",
              url: "https://supreme.com/shop/all",
              icon: "fas fa-shop"
            },{
              label: "HELP",
              url: "https://www.supremecommunity.com/help/",
              icon: "fas fa-square-question"
            }];
        break;
      case 'golfwangcommunity.com':
      case 'www.golfwangcommunity.com':
        items = [{
              label: "HOME",
              url: "https://www.golfwangcommunity.com/mobile2",
              icon: "fas fa-home" 
            },{
              label: "DROPLISTS",
              url: "https://www.golfwangcommunity.com/droplists",
              icon: "fas fa-list-dropdown" 
            },{
              label: "COLLECTIONS",
              url: "https://www.golfwangcommunity.com/collection",
              icon: "fas fa-chart-tree-map"
            },{
              label: "ITEMS",
              url: "https://www.golfwangcommunity.com/collection/all",
              icon: "fas fa-clothes-hanger"
            },{
              label: "LOOKBOOKS",
              url: "https://www.golfwangcommunity.com/lookbook/latest/",
              icon: "fas fa-book-user" 
            },{
              label: "RESTOCKS",
              url: "https://www.golfwangcommunity.com/restocks/",
              icon: "fas fa-retweet"
            },{
              label: "LOOKBOOKS",
              url: "https://www.golfwangcommunity.com/lookbook/latest",
              icon: "fas fa-book-user" 
            },{
              label: "WEBSHOP",
              url: "https://golfwang.com/collections/all",
              icon: "fas fa-shop"
            },{
              label: "HELP",
              url: "https://www.golfwangcommunity.com/help",
              icon: "fas fa-square-question" 
            }];
        break;
      case 'palacecmty.com':
      case 'www.palacecmty.com':
        items = [{
              label: "HOME",
              url: "https://www.palacecmty.com/mobile2",
              icon: "fas fa-home" 
            },{
              label: "DROPLISTS",
              url: "https://www.palacecmty.com/droplists",
              icon: "fas fa-list-dropdown" 
            },{
              label: "COLLECTIONS",
              url: "https://www.palacecmty.com/collections",
              icon: "fas fa-chart-tree-map"
            },{
              label: "ITEMS",
              url: "https://www.palacecmty.com/collections/all",
              icon: "fas fa-clothes-hanger"
            },{
              label: "RESTOCKS",
              isGrouping: true,
              icon: "fas fa-retweet",
              subLinks: [{
                label: "EU",
                url: "https://www.palacecmty.com/restocks/eu",
                icon: "" 
              }, {
                label: "UK",
                url: "https://www.palacecmty.com/restocks/uk",
                icon: ""
              },{
                label: "US",
                url: "https://www.palacecmty.com/restocks/us",
                icon: ""
              },{
                label: "JPN",
                url: "https://www.palacecmty.com/restocks/jp",
                icon: ""
              }]
            },{
              label: "LOOKBOOKS",
              url: "https://www.palacecmty.com/lookbooks",
              icon: "fas fa-book-user" 
            },{
              label: "WEBSHOP",
              url: "https://shop.palaceskateboards.com",
              icon: "fas fa-shop"
            },{
              label: "HELP",
              url: "https://www.palacecmty.com/help",
              icon: "fas fa-square-question" 
            }];
        break;
      default:
        console.log("No menu items found for this domain.")
  }
  if (items && items.length) {
      //window.location.href="gonative://sidebar/setItems?items=" + encodeURIComponent(json);
      //urls.push("gonative://sidebar/setItems?items=" + encodeURIComponent(JSON.stringify(items)));
      gonative.sidebar.setItems({"items":items, "enabled":true, "persist":false});     
  }
}

function set_title(title) {
    //window.location.href = 'gonative://navigationTitles/setCurrent?title=' + title;
    //urls.push('gonative://navigationTitles/setCurrent?title=' + encodeURIComponent(title));
    gonative.navigationTitles.setCurrent({title: title})
}

function migrateTags(data) {
    const migrationMap = {
        'restocks_eu': {key: 'restocks_location', value: 'EU'},
        'restocks_us': {key: 'restocks_location', value: 'US'},
        'restocks_jp': {key: 'restocks_location', value: 'JP'}
    };
    
    const defaultTags = {
        'supreme': 1,
        'cmty1': 1,
        'palace': 1,
        'golfwang': 1,
        'restocks_filter_active': 0,
        'restocks_location': 'US',
        'restocks_supreme': 0,
        'restocks_palace': 0,
        'restocks_golfwang': 0,
    };
    
    let migratedTags = {};
    let restocksValueOne = false;
    let restocksFilterExists = false;
    
    // If tags exist in data and 'cmty1' is not a key in tags
    if (data.tags && !('cmty1' in data.tags)) {
        for (const [oldTag, value] of Object.entries(data.tags)) {
            // If oldTag exists in migrationMap, use the new tag
            if (oldTag in migrationMap) {
                if (typeof migrationMap[oldTag] === 'string') {
                    migratedTags[migrationMap[oldTag]] = value;
                } else if (typeof migrationMap[oldTag] === 'object' && value === 1) {
                    migratedTags[migrationMap[oldTag].key] = migrationMap[oldTag].value;
                    restocksValueOne = true;
                }
            } else if (oldTag in defaultTags || (oldTag.startsWith('restocks_filter_') && value === 1)) {
                // If the old tag exists in defaultTags or is an active 'restocks_filter_', use the old tag
                migratedTags[oldTag] = value;
                // Check for any tag that starts with 'restocks_filter_' and is not 'restocks_filter_active'
                if (oldTag.startsWith('restocks_filter_') && oldTag !== 'restocks_filter_active') {
                    restocksFilterExists = true;
                }
            }
        }
        
        // If any of the 'restocks_' tags was 1, set 'restocks_supreme' to 1
        if (restocksValueOne) {
            migratedTags['restocks_supreme'] = 1;
        }

        // If any 'restocks_filter_' exists, set 'restocks_filter_active' to 1, otherwise set it to 0
        migratedTags['restocks_filter_active'] = restocksFilterExists ? 1 : 0;
        
        // Merge default tags with migrated tags
        migratedTags = {...defaultTags, ...migratedTags};

        // Migrated Tags

        gonative.onesignal.tags.deleteTags();
        gonative.onesignal.tags.setTags({tags:migratedTags});
        console.log("Updated app install - migrate tags");
        //return migratedTags;
    } else if (!data.tags) {
        // If no tags exist in data, use default tags
        // New App Install
        gonative.onesignal.tags.setTags({tags:defaultTags});
        console.log("New App Install - default tags");
        //return defaultTags;
    }

    // If 'cmty1' is a key in tags, return original data
    // We already updated
    console.log("We already updated. No new tags");
}

function migrateTagsCallbackFunction(tagResult){
    migrateTags(tagResult);
}

/*function gonative_library_ready() {
    if (navigator.userAgent.indexOf('cmtyone') > -1) {
        if (window.location.pathname != "/" && window.location.pathname != "/mobile" && window.location.pathname != "/mobile2" && window.location.hostname != "cmty.one") { 
            var metaContent = document.querySelector('meta[name="app-title"]')?.getAttribute('content');
            var htmlTitle = document.title.split(' -')[0];
            var title = metaContent && metaContent.trim() !== '' ? metaContent : htmlTitle;
            set_title(title);
        }
        set_menu();

        // Migrate Tag
        gonative.onesignal.tags.getTags({callback:tagGetCallbackFunction});

        //window.location.href = 'gonative://nativebridge/multi?data=' + encodeURIComponent(JSON.stringify({urls: urls}));
    }
}*/

if (navigator.userAgent.indexOf('cmtyone') > -1) {
    var isAppUser = true;
    if (window.location.pathname != "/" && window.location.pathname != "/mobile" && window.location.pathname != "/mobile2" && window.location.hostname != "cmty.one") { 
      var metaContent = document.querySelector('meta[name="app-title"]')?.getAttribute('content');
      var htmlTitle = document.title.split(' -')[0];
      var title = metaContent && metaContent.trim() !== '' ? metaContent : htmlTitle;
      set_title(title);
    }
    set_menu();

    // Migrate Tag
    gonative.onesignal.tags.getTags({callback:migrateTagsCallbackFunction});
}



    
