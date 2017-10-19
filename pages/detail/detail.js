// pages/detail/detail.js
var Http = require('../../utils/http.js');
var url='detail';
var pageSize = 10;
var pageStart = 0;
var infoType='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    maxtime: '',
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    Http.request(url, options.type, 'POST', pageSize, pageStart, function (res) {
      if(res){
        that.setData({
          list: res.details,
          loadingHidden: true,
          infoType: options.type
        })
        console.log(res);
      }else{
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})