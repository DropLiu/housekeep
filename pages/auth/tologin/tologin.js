// pages/auth/tologin/tologin.js
import request from '../../../utils/api';
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
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          that.getUserInfo();
          wx.login({
            success(res) {
              console.log(res)
              if (res.code) {
                //发起网络请求
                
                let userInfo = wx.getStorageSync('userInfo');
                console.log('登录成功！' + JSON.stringify(userInfo))
                request.wxlogin({
                  data: {
                    code: res.code,
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    gender: userInfo.gender
                  },
                  success: res => {
                    console.log("login res:", res)
                    if (res.code == 0) {
                      wx.setStorage({
                        key: 'access-token',
                        data: res.data.token,
                      })
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
                  },
                  fail: res => {
                    console("login fail:", res)
                    
                    wx.removeStorage('userInfo')
                  }
                })

              } else {
                console.log('登录失败！' + res.errMsg)
              }
            },
            fail(err) {
              console.log(err)
            }
          })

          // 获取用户信息
          // that.getUserInfo();
          // // 记录登录状态
          // wx.setStorageSync('isLogin', true);
          // wx.showToast({
          //   title: '登录成功',
          //   icon: 'success',//当icon：'none'时，没有图标 只有文字
          //   duration: 1200
          // })
          // // 返回上一层
          // wx.navigateBack({
          //   delta: 1
          // })
        }
      }
    })
  },
  mlogin: function (e) {
    wx.showToast({
      title: '当前不可用',
      icon: 'none',//当icon：'none'时，没有图标 只有文字
      duration: 1200
    })

  },

})