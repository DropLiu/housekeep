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
    },
    book:{
      loading: false,
      curr:[],
      list:[
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDdkonhBSikiJrvBTCMBjj8AkBl.png",
          title: "家庭简单保洁",
          desc:"专业培训上岗 100%健康审核",
          booked: 5,
          remain:95,
          promotePrice: 0,
          originalPrice: 0
        },
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDlkonhBSjQuM_DATCMBjj8AkBl.png",
          title: "房屋维修",
          desc:"房屋管道开换锁 大平台全保障",
          booked: 3,
          remain: 97,
          promotePrice: 180,
          originalPrice: 200
        },
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDikonhBSi7mpjIBDCMBjj8AkBl.png",
          title: "家电维修",
          desc:"家用电器电脑 大平台全保障",
          booked: 2,
          remain: 98,
          promotePrice: 100,
          originalPrice: 110
        },
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDgkonhBSjQmoCRBDCMBjj8AkBl.png",
          title: "保姆月嫂",
          desc:"专业认证 对细节极致追求",
          booked: 0,
          remain: 100,
          promotePrice: 0,
          originalPrice: 100
        },
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDokonhBSiYg5v5AjCMBjj8AkBl.png",
          title: "家庭简单保洁",
          desc:"专业培训上岗 100%健康审核",
          booked: 1,
          remain: 99,
          promotePrice: 70,
          originalPrice: 90
        }
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