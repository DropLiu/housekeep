// pages/auth/tologin/tologin.js

var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo
        app.globalData.userInfo = res.userInfo;
        app.globalData.userInfo.username = "微信用户";
        wx.setStorageSync('userInfo', res.userInfo);
        console.log(app.globalData.userInfo)
      }
    })
    
  },
  wxlogin: function (e) {
    let that = this;
    // 判断是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 获取用户信息
          that.getUserInfo();
          // 记录登录状态
          wx.setStorageSync('isLogin', true);
          wx.showToast({
            title: '登录成功',
            icon: 'success',//当icon：'none'时，没有图标 只有文字
            duration: 1200
          })
          // 返回上一层
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  mlogin:function(e){
    wx.showToast({
      title: '当前不可用',
      icon: 'none',//当icon：'none'时，没有图标 只有文字
      duration: 1200
    })

  },

})