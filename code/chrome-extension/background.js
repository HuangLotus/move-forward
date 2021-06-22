console.log('in background.js')
const storageKey = location.origin + '/popup.html'
const item = localStorage.getItem(storageKey)
let LS = item && JSON.parse(item)
chrome.storage.local.set({'ce_venv_tags': LS.tags})

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('changes',changes)
  for (key in changes) {
  var storageChange = changes[key];

  if (key === 'ce_venv_tags') {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    },
    function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          text: 'redirectSuccess',
          localStorageTags: storageChange.newValue
        },
        function(response) {
          console.log('message', response)
        }
      )
    })
  }
}
})


// 虚环境的要排除
const EXCLUDE_CONFIG_URL_LIST = ['/leo-venv-tools/api']
const REPLACE_DOMAIN_REGEX = /\/\/([^\/]*)\/\.*/

function handleInterceptorsRequestByTag(details, selectedVirtualEnvList) {
  const isIgnore =
    EXCLUDE_CONFIG_URL_LIST.length && EXCLUDE_CONFIG_URL_LIST.some(item => details.url.indexOf(item) !== -1)
  if (isIgnore || !selectedVirtualEnvList || selectedVirtualEnvList.length === 0) {
    return
  }
  let matched = false
  selectedVirtualEnvList = selectedVirtualEnvList.filter(item => !item.isChildren)
  selectedVirtualEnvList.forEach(virtualItem => {
    virtualItem.baseHosts.forEach(item => {
      if (details.url.indexOf(virtualItem.path) > -1){
        if(details.url.indexOf('local')>-1 || details.url.indexOf(item.baseHost) > -1){
          // details.url = details.url.replace(REPLACE_DOMAIN_REGEX, `//${virtualItem.host}/`)
          console.log('匹配上啦', virtualItem.host, details.url)
          matched = true
        }
      }
    })
  })
  return matched
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const srcUrl = details.url
    const storageKey = location.origin + '/popup.html'
    const item = localStorage.getItem(storageKey)
    let LS = item && JSON.parse(item)
    // console.log('1 onBeforeRequest 从LS中获取数据', details.method, srcUrl, details, details.requestBody)
    // 没有数据，直接跳过
    if (!LS || (LS && (!LS.tags || LS.tags.length === 0))) {
      return { cancel: false }
    }
    let matched = false
    LS.tags.forEach(item => {
      if (!matched && handleInterceptorsRequestByTag(details, item.selectVenvHostList)){
        matched = true
      }
    })
    // console.log('matched', matched)
    // 域名转发
    if (matched) {
    // if (srcUrl !== details.url) {
      // console.log('转发的域名', srcUrl, '=>', details.url)
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        function(tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              text: 'redirectSuccess',
              srcUrl,
              redirectUrl: details.url,
              localStorageTags: LS.tags
            },
            function(response) {
              console.log('message', response)
            }
          )
        }
      )
      // return { redirectUrl: details.url }
    }
    return { cancel: false }
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestBody"]
);

// chrome.webRequest.onResponseStarted.addListener(
//   function(details) {
//     console.log('2【onBeforeSendHeaders】', details.url, details.method, details.requestHeaders)
//     return {requestHeaders: details.requestHeaders};
//   },
//   {urls: ["<all_urls>"]},
//   ["blocking", "requestHeaders"]);

// chrome.webRequest.onErrorOccurred.addListener(function(details) {
//   console.log('0 onErrorOccurred', details,url, details.method, details)
// })
