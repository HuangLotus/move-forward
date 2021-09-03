console.log('chrome extension content script')

var s = document.createElement("script");
s.src = chrome.extension.getURL("xmlHttp.js");
s.onload = function() {
  chrome.storage.local.get(['ce_venv_tags'], (result) => {
    window.postMessage({"ce_venv_tags": JSON.stringify(result.ce_venv_tags), "from": 'content-scripts' }, '*');
  });
};
(document.head || document.documentElement).appendChild(s);

// 官方，接受来自backgroun.js的消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log('content-scripts 接受到来自backgroun.js的消息', request.localStorageTags)
    window.postMessage({"ce_venv_tags": JSON.stringify(request.localStorageTags), "from": 'content-scripts from background.js, then post to xmlhttp' }, '*');
  }
);
