// pages/upload/upload.js
const AV = require('../../utils/av-weapp.js')
var that;
Page({
  data: {
    images: [],
    uploadedImages: [],
    imageWidth:120
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var objectId = options.objectId;
    console.log(objectId);
  },
  chooseImage: function () {
    that=this;
    // 选择图片
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log('------>>>>>>'+tempFilePaths);
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
      }
    })
  },
  previewImage: function () {
    that = this;
    // 预览图集
    wx.previewImage({
      urls: that.data.images
    });
  },
  submit: function () {
    that = this;
    // 提交图片，事先遍历图集数组
    that.data.images.forEach(function (tempFilePath) {
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then(
        // file => console.log(file.url())
        function (file) {
          // 先读取
          var uploadedImages = that.data.uploadedImages;
          uploadedImages.push(file.url());
          // 再写入
          that.setData({
            uploadedImages: uploadedImages
          });
          console.log(uploadedImages);
        }
        ).catch(console.error);
    });
    wx.showToast({
      title: '爆料成功',
      success: function () {
        wx.navigateBack();
      }
    });
  },
  deleteImg: function (e) {
    that=this;
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
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
          imageWidth: res.screenWidth / 4 - 10
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