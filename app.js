//app.js

import request from './utils/api'
import "assets/js/qiniuUploader.js"

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
         let that = this;
         wx.getUserInfo({
            success: function (res2) {
              console.log(res2);
              // console.log(res2.userInfo);
              that.globalData.userInfo = res2.userInfo;
              //that.globalData.userInfo.islogin = true;
              request.wxlogin({
                data:{
                  code:res.code,
                  nickName: res2.userInfo.nickName,
                  avatarUrl: res2.userInfo.avatarUrl,
                  gender: res2.userInfo.gender
                },
                success: res=>{
                  console.log("login res:", res)
                  if(res.code == 0) {
                     wx.setStorage({
                        key: 'access-token',
                        data: res.data.token,
                    })
                  }
                },
                fail: res => {
                  console("login fail:", res)
                }
              })

            
            },
            fail:function(){
              // that.authorizeCheck("scope.userInfo");
            }
          });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {
      nickName: "请点击登录",
      username: "点击去登录",
      avatarUrl: "/images/head.png"
    }
  }
})