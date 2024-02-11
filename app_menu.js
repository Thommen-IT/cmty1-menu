/* CMTY1 Menu Code */

var urls = [];
var isSetupComplete = false;

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
      median.sidebar.setItems({"items":items, "enabled":true, "persist":false});     
  }
}

function set_title(title) {
    //window.location.href = 'median://navigationTitles/setCurrent?title=' + title;
    median.navigationTitles.setCurrent({title: title})
}

function prepare_title() {
    var metaElement = document.querySelector('meta[name="app-title"]');
    var metaContent = metaElement ? metaElement.getAttribute('content') : null;
    var htmlTitle = document.title.split(' -')[0];
    var title = metaContent && metaContent.trim() !== '' ? metaContent : htmlTitle;
    set_title(title);
}

/* In-App Messaging (IAM) */
// Function to save IAM interaction to localStorage
function saveIAMInteraction(data) {
    const interactionData = {
        type: data.clickName, // Interaction type (e.g., pushAllow, pushLater, pushClosed)
        firstClick: data.firstClick === "true",
        closed: data.closesMessage === "true",
        timestamp: new Date().getTime()
    };
    window.alert(JSON.stringify(interactionData));
    localStorage.setItem('iamPrompt', JSON.stringify(interactionData));
}

// Handler for IAM response
function iamResponseHandler(data) {
    try {
	window.alert(JSON.stringify(data));
        saveIAMInteraction(data);
    } catch (error) {
        console.error('Error in IAM response:', error);
    }
}

// Check if IAM prompt should be shown
function checkIAMPrompt() {
    const interaction = localStorage.getItem('iamPrompt');
    if (!interaction) return true; // No previous interaction, show prompt

    const { type, timestamp } = JSON.parse(interaction);
    const elapsedDays = (new Date().getTime() - timestamp) / (1000 * 3600 * 24);

    // Logic to determine if the prompt should be shown again
    if ((type === 'pushLater' && elapsedDays >= 7) || (type === 'pushClosed' && elapsedDays >= 14)) {
        return true;
    }
    return false;
}

// Trigger the IAM prompt based on conditions
function triggerIAM() {
    if (checkIAMPrompt()) {
        median.onesignal.iam.addTrigger({'showPrompt': 'true'});
    } else {
        median.onesignal.iam.addTrigger({'showPrompt': 'false'});
    }
}

// Manually trigger the IAM prompt, e.g., from settings page
function manualTriggerIAM() {
    median.onesignal.iam.addTrigger({'showPrompt': 'true'});
}
/* End In-App Messaging (IAM) */


function median_library_ready(){
   if (isSetupComplete) return;
   if (navigator.userAgent.indexOf('cmtyone') > -1) {
      median.onesignal.iam.setInAppMessageClickHandler('iamResponseHandler');
      triggerIAM();
	   
      var isAppUser = true;
      if (window.location.pathname != "/" && window.location.pathname != "/mobile" && window.location.pathname != "/mobile2" && window.location.hostname != "cmty.one" && window.location.hostname != "cmtyone.com") { 
     	prepare_title();
      }
     set_menu();
     isSetupComplete = true;
  }
}

// Call the function manually if your page content is slow to load and
// expose the median_library_ready() function, e.g. using a web framework
if(window.median){
	window.median_library_ready();
}

// Check if the hash does not include 'google_vignette' - vignette ads
window.addEventListener('hashchange', function() {
    if (!window.location.hash.includes('google_vignette')) {
        console.log('#google_vignette has been removed from the URL hash');
     	prepare_title();
    } 
});



    
