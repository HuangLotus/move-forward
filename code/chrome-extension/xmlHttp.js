let CE_VENV_TAGS
window.addEventListener("message", function(event) {
  if(event.data.ce_venv_tags) {
    tags = event.data.ce_venv_tags
    CE_VENV_TAGS = JSON.parse(tags)
    // console.log('收到来自content-scripts的VENV消息', CE_VENV_TAGS, event);
  }
}, false);

// 虚环境的要排除
const EXCLUDE_CONFIG_URL_LIST = ['/leo-venv-tools/api']
const REPLACE_DOMAIN_REGEX = /\/\/([^\/]*)\/\.*/

function handleInterceptorsRequestByTag(url, selectedVirtualEnvList) {
  // console.log('拦截判断 start', selectedVirtualEnvList)
  const isIgnore =
    EXCLUDE_CONFIG_URL_LIST.length && EXCLUDE_CONFIG_URL_LIST.some(item => url.indexOf(item) !== -1)
  let matched = false
  if (isIgnore || !selectedVirtualEnvList || selectedVirtualEnvList.length === 0) {
    console.log('拦截异常提前返回')
    return {
      modifiedUrl: url,
      matched
    }
  }
  let modifiedUrl = url
  selectedVirtualEnvList = selectedVirtualEnvList.filter(item => !item.isChildren)
  // console.log('selectedVirtualEnvList', url, selectedVirtualEnvList)
  selectedVirtualEnvList.forEach(virtualItem => {
    virtualItem.baseHosts.forEach(item => {
      if (!matched && url.indexOf(virtualItem.path) > -1){
        if(url.indexOf('local')> -1 || url.indexOf(item.baseHost) > -1){
          modifiedUrl = modifiedUrl.replace(REPLACE_DOMAIN_REGEX, `//${virtualItem.host}/`)
          matched = true
        }
        let noOrigin = url.indexOf('http') === -1 && url.indexOf(location.origin) === -1
        if (noOrigin) {
          modifiedUrl = `${location.protocol}//${virtualItem.host}${modifiedUrl}`
          // console.log('noorigin 匹配上啦', virtualItem.host, modifiedUrl)
          matched = true
        }
      }
    })
  })
  return {
    modifiedUrl,
    matched
  }
}

function openBypass(original_function) {
  return function(method, url, async) {
    url = interceptUrl(url, 'xml')
    return original_function.apply(this, arguments);
  };
}

// 拦截url
function interceptUrl(url, type){
  let resObj = {
    matched: false,
    modifiedUrl: url
  }
  CE_VENV_TAGS && CE_VENV_TAGS.forEach(item => {
    if (!resObj.matched && item.selectVenvHostList && item.selectVenvHostList.length > 0){
      resObj = handleInterceptorsRequestByTag(url, item.selectVenvHostList)
    }
  })
  if (resObj.matched) {
    console.log(`【虚环境拦截成功】${type}请求：`, url + ' ====》 ' + resObj.modifiedUrl)
  }
  return resObj.modifiedUrl
}

XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);
// XMLHttpRequest.prototype.send = sendBypass(XMLHttpRequest.prototype.send);
window.originFetch = window.fetch.bind(window)
function myFetch(...args){
  args[0] = interceptUrl(args[0], 'fetch')
  return window.originFetch.call(this, ...args)
}
window.fetch = myFetch

// function sendBypass(original_function) {
//   return function(data) {
//     // 保存请求相关参数
//     this.requestData = data;
//     return original_function.apply(this, arguments);
//   };
// }