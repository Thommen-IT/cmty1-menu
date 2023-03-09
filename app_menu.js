// this function accepts a callback function as params.callback that will be called with the command results
// if a callback is not provided it returns a promise that will resolve with the command results
function addCommandCallback(command, params, persistCallback) {
    if(params && params.callback){
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
  
    // Begin changes
    // 1. Comment out or delete the following iOS specific method
    // window.webkit.messageHandlers.JSBridge.postMessage(commandObject);

    // 2. Add the following to provide compatibility for both iOS and Android
    if(navigator.vendor === 'Apple Computer, Inc.'){
        window.webkit.messageHandlers.JSBridge.postMessage(commandObject);
    }
    else {
        if(params) commandObject = JSON.stringify(commandObject);
        JSBridge.postMessage(commandObject);
    }
    // End of changes
}

///////////////////////////////
////    General Commands   ////
///////////////////////////////

var gonative = {};

// to be modified as required
gonative.nativebridge = {
    custom: function (params){
        addCommand("gonative://nativebridge/custom", params);
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
        addCommand("gonative://tabs/select", {tabIndex});
    },
    deselect: function (){
        addCommand("gonative://tabs/deselect");
    },
    setTabs: function (params){
        addCommand("gonative://tabs/setTabs", params);
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
    }
};

gonative.navigationMaxWindows = {
    set: function (maxWindows){
        var params = {
            data: maxWindows,
            persist: true
        };
        addCommand("gonative://navigationMaxWindows/set", params);
    },
    setCurrent: function(maxWindows){
        var params = {data: maxWindows};
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

///////////////////////////////
////     iOS Exclusive     ////
///////////////////////////////

gonative.ios = {};

gonative.ios.window = {
    open: function (urlString){
        var params = {url: urlString};
        addCommand("gonative://window/open", params);
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

function set_menu() {
  var host = window.location.host;
  switch(host) {
      case 'cmty.one':
        var items = [{
              label: "HOME",
              url: "https://cmty.one/",
              icon: ""
            },{
              label: "LATEST",
              url: "https://cmty.one/latest/",
              icon: ""
            }, {
              label: "NEWS",
              isGrouping: true, 
              subLinks: [{
                label: "SUPREME",
                url: "https://cmty.one/category/supreme/",
                icon: ""
              },{
                label: "PALACE",
                url: "https://cmty.one/category/palace/",
                icon: ""
              }, {
                label: "FASHION",
                url: "https://cmty.one/category/fashion/",
                icon: ""
              }, {
                label: "SNEAKERS",
                url: "https://cmty.one/category/sneakers/",
                icon: ""
              }]
            },{
              label: "GALLERY",
              url: "",
              icon: ""
            }];
        addCommand("gonative://sidebar/setItems", {"items":items,"enabled": true, "persist":false});
        break;
      case 'supremecommunity.com':
      case 'www.supremecommunity.com':
        var items = [{
              label: "HOME",
              url: "https://www.supremecommunity.com/mobile2",
              icon: ""
            },{
              label: "DROPLISTS",
              url: "https://www.supremecommunity.com/season/latest/droplists/",
              icon: ""
            },{
              label: "ITEMS",
              url: "https://www.supremecommunity.com/season/latest/overview/",
              icon: ""
            },{
              label: "LEFT TO DROP",
              url: "https://www.supremecommunity.com/season/latest/lefttodrop/",
              icon: ""
            },{
              label: "RESTOCKS",
              isGrouping: true, 
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
              url: "https://www.supremecommunity.com/season/latest/overview/",
              icon: ""
            },{
              label: "HELP",
              url: "https://www.supremecommunity.com/help/",
              icon: ""
            }];
          addCommand("gonative://sidebar/setItems", {"items":items,"enabled": true, "persist":false});
        break;
      case 'golfwangcommunity.com':
      case 'www.golfwangcommunity.com':
        var items = [{
              label: "HOME",
              url: "https://www.golfwangcommunity.com/mobile2",
              icon: "" 
            },{
              label: "DROPLISTS",
              url: "https://www.golfwangcommunity.com/droplists",
              icon: "" 
            },{
              label: "COLLECTIONS",
              url: "https://www.golfwangcommunity.com/collection",
              icon: ""
            },{
              label: "ITEMS",
              url: "https://www.golfwangcommunity.com/collection/all",
              icon: ""
            },{
              label: "LOOKBOOKS",
              url: "https://www.golfwangcommunity.com/lookbook/latest/",
              icon: "" 
            },{
              label: "RESTOCKS",
              url: "https://www.golfwangcommunity.com/restocks/",
              icon: "" 
            },{
              label: "LOOKBOOKS",
              url: "https://www.golfwangcommunity.com/lookbook/latest",
              icon: "" 
            },{
              label: "HELP",
              url: "https://www.golfwangcommunity.com/help",
              icon: "" 
            }];
        addCommand("gonative://sidebar/setItems", {"items":items,"enabled": true, "persist":false});
        break;
      case 'palacecmty.com':
      case 'www.palacecmty.com':
        var items = [{
              label: "HOME",
              url: "https://www.palacecmty.com/mobile2",
              icon: "" 
            },{
              label: "DROPLISTS",
              url: "https://www.palacecmty.com/droplists",
              icon: "" 
            },{
              label: "COLLECTIONS",
              url: "https://www.palacecmty.com/collections",
              icon: ""
            },{
              label: "ITEMS",
              url: "https://www.palacecmty.com/collections/all",
              icon: ""
            },{
              label: "RESTOCKS",
              isGrouping: true, 
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
              icon: "" 
            },{
              label: "HELP",
              url: "https://www.palacecmty.com/help",
              icon: "" 
            }];
        addCommand("gonative://sidebar/setItems", {"items":items,"enabled": true, "persist":false});
        break;
      default:
        console.log("No menu items found for this domain.")
  }
}

function set_title(title){
    //gonative.navigationTitles.setCurrent({'title':title})
    window.location.href = 'gonative://navigationTitles/setCurrent?title=' + title
}

if (navigator.userAgent.indexOf('cmtyone') > -1) {
    if (window.location.pathname != "/" && window.location.pathname != "/mobile" && window.location.pathname != "/mobile2" && window.location.hostname != "cmty.one") { 
        set_title(document.title.split(' -')[0]);
    }
}

function gonative_library_ready(){
    set_menu();
}
