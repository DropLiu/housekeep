// pages/apply/apply.js
const qiniuUploader = require("../../assets/js/qiniuUploader");
import { createToken } from '../../assets/js/qiniuUploadToken'
Page({

  /**
   * Page initial data
   */
  data: {
    picker: ['清洁', '家装', '电信'],
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
    const that = this

    qiniuUploader.upload(filePath, (res) => {
      that.setData({
        'imageObject': res
      });
      console.log('file url is: ' + res.fileUrl)
    }, (error) => {
      console.error('error: ' + JSON.stringify(error));
    },
      {
        region: 'SCN', // 华南区
        domain: '',
        shouldUseQiniuFileName: false,
        key: 'logo',
        uptokenFunc: function () {
          var accessKey = "5pPu1GqaNINdSsnjueIHBjhdemr9MhUgAeP4FyUu",
            secretKey = "f6xp8ny9Twbb4XHnv7wKzZ-_pzy-_7Ik0Ynn8S4i",
            bucket = "honghe-jiazheng",
            deadline = new Date().getTime() + 3600 * 1000
          // deadline = 1580566537639
          const token = createToken(accessKey, secretKey, bucket, deadline)

          return token

        }
      },

      (progress) => {
        console.log('上传进度', progress.progress)
        console.log('已经上传的数据长度', progress.totalBytesSent)
        console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
      }, cancelTask => that.setData({ cancelTask })
    );
  },
  // 选中editor
  onEditorReady() {
    console.log("editor ready")
    const that = this
    wx.createSelectorQuery().select('#desc').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  insertImg: function (e) {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          width: '80%',
          success: function () {
            console.log('insert image success')
            that.uploadImg(res.tempFilePaths[0])
          }
        })
      }
    })
  }
})