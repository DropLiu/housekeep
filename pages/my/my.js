// pages/my/my.js

var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {
      niackName:"请点击登录",
      avatarUrl:"",
      
    },
    isLogin: false,
    order: {
      pay: 1,
      toSend: 0,
      send: 0,
      comment: 0,
      afterSale: 0
    },
    wallet: {
      coupon: 2,
      point: 0,
      red: 3,
      allowance: 0,
      gift: 0
    }
  },

  toLogin: function () {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/auth/tologin/tologin',
      })
    }
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
    let userInfo = wx.getStorageSync('userInfo');
    let isLogin = wx.getStorageSync('isLogin');
    // 页面显示
    if (userInfo && isLogin) {
      this.setData({
        userInfo: userInfo,
        isLogin: isLogin
      });
    } else {
      // 未登录信息
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: isLogin
      });
    }
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

  toAbout: function(e){
    console.log("to page about")
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})