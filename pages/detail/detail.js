// pages/detail/detail.js
var Http = require('../../utils/http.js');
var path='detail';
var pageSize = 5;
var infoType='';
var method = 'POST';
var options={};

Page({

  /**
   * 页面的初始数据
   */

  data: {
    list:[],
    maxtime: '',
    windowHeight:'',
    windowWidth:'',
    pageStart:0,
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    infoType = options.type;
    this.reqDataFS(infoType,this.data.pageStart);
  },
  /**
   * 请求服务端数据
   */
  reqDataFS(infoType, pageStart){
    var that = this;
    Http.request(path, infoType, method, pageSize, pageStart, function (res) {
      if (res) {
        that.setData({
          list: that.data.list.concat(res.details),
          loadingHidden: true,
          infoType: infoType
        })
        console.log(res);
      } else {
        console('请求失败！');
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉刷新...')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loadingHidden: false,
      pageStart: this.data.pageStart + 1
    })

    console.log("上拉加载更多..." + this.data.pageStart)

    this.reqDataFS(infoType, this.data.pageStart)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})