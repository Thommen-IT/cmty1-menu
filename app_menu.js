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
    //gonative.onesignal.tags.getTags({callback:migrateTagsCallbackFunction});
}



    
