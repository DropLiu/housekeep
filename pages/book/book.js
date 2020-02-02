// pages/book/book.js
import request from '../../utils/api'
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    imgSer: app.__serurl,
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
      content:[
        {
          page: 1,
          limit: 4,
          count: 0,
          list:[],    
        }, {
          page: 1,
          limit: 4,
          count: 0,
          list:[],    
        }, {
          page: 1,
          limit: 4,
          count: 0,
          list:[],    
        }, {
          page: 1,
          limit: 4,
          count: 0,
          list:[],    
        }
      ],
      list_bak:[
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
    const id = e.currentTarget.dataset.id,
          that = this
    let currList = this.data.book.content[id].list
    if(currList.length==0){
      request.shifuList({
        data:{
          category: id,
          page: 1,
          limit: 4
        },
        success: res => {
          var lsit = "book.content["+id+"].list",
              page = "book.content["+id+"].page",
              count = "book.content["+id+"].count"
          if (res.code == 0) {
            currList = res.data.list
            that.setData({
              count:res.data.count,
              list : res.data.list,
              "book.curr": currList
            })
          }
          // console.log(list)
        },
        fail: err => {
          console.log(err)
        }
      })
    }

    this.setData({
      "tab.TabCur": id,
      "tab.scrollLeft": (id-1)*60,
      "book.curr": currList
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const that = this
    request.shifuList({
      data:{
        page: 1,
        limit: 4
      },
      success: res => {
        
        if (res.code == 0) {
          that.setData({
            "book.content[0].count":res.data.count,
            "book.content[0].list": res.data.list,
            "book.curr": res.data.list
          })
        }
        // console.log(list)
      },
      fail: err => {
        console.log(err)
      }
    })
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
    const that = this,
          tabCurr = this.data.tab.TabCur,
          book = this.data.book,
          currPage = book.content[tabCurr].page + 1,
          currLimit = book.content[tabCurr].limit,
          currList = book.content[tabCurr].list,
          currCount = book.content[tabCurr].count

    if(currCount<=currList.length){
      return;
    }

    request.shifuList({
      data: {
        page: currPage,
        limit: currLimit,
        category: tabCurr,
      },
      success: res => {
        
        
        if (res.code == 0) {

          currList.push(...res.data.list)
          var data = {}
          data["book.content["+tabCurr+"].list"] = currList
          data["book.content["+tabCurr+"].page"] = currPage
          data["book.curr"] = currList
          that.setData(data)
          // console.log(data)
        }
        // console.log(list)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})