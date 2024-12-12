function getPageHtml() {
  return document.documentElement.outerHTML;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "getSelectedText",
      title: "Get Selected Text",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "getPageHtml",
      title: "Get Page HTML",
      contexts: ["page"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "getPageHtml") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getPageHtml
      }, (injectionResults) => {
        for (const frameResult of injectionResults) {
          console.log('Page HTML:', frameResult.result);
          chrome.storage.local.set({ pageHtml: frameResult.result }, () => {
            // Open a new tab with the popup.html URL
            chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
          });
        }
      });
    }
    else if (info.menuItemId === "getSelectedText") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getPageHtml
      }, (injectionResults) => {
        for (const frameResult of injectionResults) {
          console.log('Selected text:', frameResult.result);
          chrome.storage.local.set({ selectedText: frameResult.result }, () => { 
            chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') }); 
          });
          // chrome.storage.local.set({ selectedText: frameResult.result });
          // chrome.runtime.sendMessage({ selectedText: frameResult.result });
        }
      });
    }
  });
  
  function getSelectedText() {
    return window.getSelection().toString();
  }
  