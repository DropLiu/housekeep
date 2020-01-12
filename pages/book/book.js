// pages/book/book.js
Page({

  /**
   * Page initial data
   */
  data: {
    tab:{
      TabCur: 0,
      scrollLeft:0,
      list:[
        "全部","家庭保洁","保姆月嫂","家电维修"
      ]
    }

  },

  tabSelect(e) {
    this.setData({
      "tab.TabCur": e.currentTarget.dataset.id,
      "tab.scrollLeft": (e.currentTarget.dataset.id-1)*60
    })
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

  }
})