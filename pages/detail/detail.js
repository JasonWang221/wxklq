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
    loadingHidden: false,
    cellHeight: '120px',
    pictures:
    ['https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/5d4fa35c6d1215b5689257307c461dd2541448.jpeg',
      'https://p0.meituan.net/movie/0c49f98a93881b65b58c349eed219dba290900.jpg',
      'https://p1.meituan.net/movie/45f98822bd15082ae3932b6108b17a01265779.jpg',
      'https://p1.meituan.net/movie/722de9a7b0c1f9c262162d87eccaec7c451290.jpg',
      'https://p0.meituan.net/movie/cb9be5bbedb78ce2ef8e83c93f83caca474393.jpg',
      'https://p1.meituan.net/movie/a852b992cdec15319c717ba9fa9b7a35406466.jpg',
      'https://p1.meituan.net/movie/dc1f94811793e9c653170cba7b05bf3e484939.jpg'
    ]
  },

  /**
     * 图片预览
     */
  previewImage: function (e) {
    var that = this,
      //获取当前图片的下标
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.pictures;
    wx.previewImage({
      //当前显示下标
      current: pictures[index],
      //数据源
      urls: pictures
    })
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
          windowWidth: res.windowWidth,
          cellHeight: ((res.windowWidth-4) / 3) + 'px',
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