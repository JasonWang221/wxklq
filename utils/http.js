var rootDoc = 'http://183.203.130.54:8090/wxklqapi/';//你的域名  
function req(url, infoType, method, pageSize, pageStart,cbProg) {  //url访问的接口，data请求参数,cbProg回调函数
  wx.request({
    url: rootDoc + url,
    data: { 'infoType': infoType,'pageSize':pageSize,'pageStart':pageStart},
    method: method,
    header: { 'content-type': 'application/json' },
    success: function (res) {
      return typeof cbProg == "function" && cbProg(res.data)
    },
    fail: function () {
      return typeof cbProg == "function" && cbProg(false)
    }
  })
}

module.exports = {
  request: req
}  