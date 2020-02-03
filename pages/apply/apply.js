// pages/apply/apply.js
import request from '../../utils/api'
import { uploadQiNiu } from '../../assets/js/qiniuUpload';
Page({

  /**
   * Page initial data
   */
  data: {
    picker: ['清洁', '家装', '电信'],
    category: ['暂无'],
    typ: ['清洁', '家装', '电信'],
    imgList: [],
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const that = this

    //加载大类列表
    request.categoryList({
      success(res) {
        console.log('load category success', res)
        if (res.code == 0) {
          var list = []
          res.data.list.forEach(e => {
            list.push(e.name)
          });
          that.setData({
            'category': list
          })

        }
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '网络连接失败,请检查网络连接',
          icon: 'none',
          duration: 1200
        })
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

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  uploadImg: function (filePath) {

  },
  // 选中editor
  onEditorReady() {
    // console.log("editor ready")
    const that = this
    wx.createSelectorQuery().select('#detail').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  insertImg: function (e) {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const filePath = res.tempFilePaths[0];

        uploadQiNiu(filePath, (filePath) => {
          //插入图片
          that.editorCtx.insertImage({
            src: filePath,
            width: '80%',
            success: function () {
              console.log('insert image success')
              that.uploadImg(res.tempFilePaths[0])
            }
          })
        })
      }
    })
  }
})