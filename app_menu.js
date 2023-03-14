function set_menu() {
  var host = window.location.host;
  var items = "[]";
  switch(host) {
      case 'cmty.one':
        items = [{
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
        break;
      case 'supremecommunity.com':
      case 'www.supremecommunity.com':
        items = [{
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
        break;
      case 'golfwangcommunity.com':
      case 'www.golfwangcommunity.com':
        items = [{
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
        break;
      case 'palacecmty.com':
      case 'www.palacecmty.com':
        items = [{
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
        break;
      default:
        console.log("No menu items found for this domain.")
  }
  if (items && items.length) {
    var json = JSON.stringify(items);
    window.location.href="gonative://sidebar/setItems?items=" + encodeURIComponent(json);
  }
}

function set_title(title){
    //gonative.navigationTitles.setCurrent({'title':title})
    window.location.href = 'gonative://navigationTitles/setCurrent?title=' + title;
}

document.addEventListener("DOMContentLoaded", () => {
    if (navigator.userAgent.indexOf('cmtyone') > -1) {
        if (window.location.pathname != "/" && window.location.pathname != "/mobile" && window.location.pathname != "/mobile2" && window.location.hostname != "cmty.one") { 
            set_title(document.title.split(' -')[0]);
        }
        set_menu();
    }
});
