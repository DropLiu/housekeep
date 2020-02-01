import { request } from './request'


// 登录
function wxlogin(params) {
	request('/wx/login', 'post', params)
}

// 轮播图广告
function brandList(params) {
	request('/wx/brand', 'get', params)
}


// 获取师傅列表
function shifuList(params) {
	request('/wx/shifu', 'get', params)
}


// 师傅详细信息
function shifuInfo(params, id) {
	request('/wx/shifu/' + id, 'get', params)
}

// 区域列表
function arean(params) {
	request('/wx/arean', 'get', params)
}

// 反馈
function feedBack(params) {
	request('/wx/feedback', 'post', params)
}

// 大类列表
function categoryList(params) {
	request('/wx/category', 'get', params)
}


export default { // 暴露接口
  wxlogin,
  brandList,
  shifuList,
  shifuInfo,
  arean,
  feedBack,
  categoryList
}

