console.log('chrome extension content script')

var s = document.createElement("script");
s.src = chrome.extension.getURL("xmlHttp.js");
s.onload = function() {
  chrome.storage.local.get(['ce_venv_tags'], (result) => {
    window.postMessage({"ce_venv_tags": JSON.stringify(result.ce_venv_tags) }, '*');
  });
};
(document.head || document.documentElement).appendChild(s);

// 官方，接受消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    window.postMessage({"ce_venv_tags": JSON.stringify(request.localStorageTags) }, '*');
  }
);
