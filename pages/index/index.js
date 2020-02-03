import request from '../../utils/api'
const app = getApp()
Page({
  data: {
    imgSer: app.__serurl,
    swiper: {
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true,
      list: []
    },
    hotService: {
      page: 1,
      limit: 4,
      count: 0,
      load: true,
      list: [

      ]
    },
    hotService_bak: {
      list: [
        {
          title: "房屋维修",
          desc: "房屋管道开换锁 大平台全保障",
          promotePrice: 180.00,
          originalPrice: 200,
          book: 3,
          remain: 97,
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDlkonhBSjQuM_DATCMBjj8AkBl.png"
        },
        {
          title: "家电维修",
          desc: "家用电器电脑 大平台全保障",
          promotePrice: 100.00,
          originalPrice: 110,
          book: 2,
          remain: 98,
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDikonhBSi7mpjIBDCMBjj8AkBl.png"
        },
        {
          title: "家庭保洁",
          desc: "专业培训上岗 100%健康审核",
          promotePrice: 70.00,
          originalPrice: 90,
          book: 1,
          remain: 99,
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACDokonhBSiYg5v5AjCMBjj8AkBl.png"
        }
      ]
    },
    news: {
      list: [
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACCA-ojhBSit_ovLBjCkAzj6AUBl.png",
          title: "家政保姆谈经验：“小苏打”巧用在",
          desc: "每个行业都会有一些别人不知道的必杀技，这就是传说中的“术业有专攻”，而一个人想要在一个行业中混得风生"
        },
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACCC-ojhBSix5srtBzCQAjj6AUBl.png",
          title: "靠谱的家政公司应该具备的几点！",
          desc: "找家政公司就怕找到不靠谱的家政公司，那么怎么找到一家靠谱的家政公司呢？靠谱的家政公司应该具备哪些因素"
        },
        {
          img: "http://515046.s81i.faiusr.com/4/101/AFEI5rcfEAQYACCWgYnhBSiU0b-DBjCkAzj6AUBl.png",
          title: "西安家政保洁进入旺季 提前一天都约不到",
          desc: "眼看着就是咱们的农历新年了，很多市民都已经开始了忙活家里的大扫除，现在大伙为了省事都会找保洁，可这会"
        }
      ]
    }

  },

  onLoad: function (options) {
    const that = this
    request.brandList({
      success: res => {
        console.log("brandList: ", res)
        if (res.code == 0) {
          that.setData({
            "swiper.list": res.data
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
    request.shifuList({
      data: {
        page: 1,
        limit: 4
      },
      success: res => {
        
        if (res.code == 0) {
          that.setData({
            "hotService.list": res.data.list,
            "hotService.count": res.data.count,
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  onReachBottom: function(){
    let that = this, data = this.data
    // console.log(this.data.imgSer)
    const currPgae = data.hotService.page,
          limit = data.hotService.limit,
          list = data.hotService.list,
          count = data.hotService.count

    if(count <= list.length){
      that.setData({
        'hotService.load': false
      })
      return;
    }

    request.shifuList({
      data: {
        page: currPgae + 1,
        limit: limit
      },
      success: res => {
        list.push(...res.data.list)

        if (res.code == 0) {
          that.setData({
            "hotService.list": list,
            "hotService.page": currPgae + 1
          })
        }
        // console.log(list)
      },
      fail: err => {
        console.log(err)
      }
    })
  }
  
})