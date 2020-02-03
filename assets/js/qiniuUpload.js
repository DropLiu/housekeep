const Utf8 = require("./crypto-js-3.1.9/enc-utf8")
const Base64 = require("./crypto-js-3.1.9/enc-base64");
const HmacSHA1 = require("./crypto-js-3.1.9/hmac-sha1");
const MD5 = require('./crypto-js-3.1.9/md5')

const qiniuUploader = require("../../assets/js/qiniuUploader");

const downloadSer = "https://src.hhjz.biggerforum.org"
const accessKey = "5pPu1GqaNINdSsnjueIHBjhdemr9MhUgAeP4FyUu"
const secretKey = "f6xp8ny9Twbb4XHnv7wKzZ-_pzy-_7Ik0Ynn8S4i"
const bucket = "honghe-jiazheng"

//URL 安全的 Base64 编码，
function urlsafe_base64_encode(data) {
	//对于字符串，转换为wordArray
	if (data.clamp == undefined) {
		console.log('data transfor')
		data = Utf8.parse(data)
	}
	//转码，并将'+'替换为'-', '/'替换为'_'
	return Base64.stringify(data).replace('+', '-').replace('/', '_')
}


/**
	bucket：上传到 七牛云 的目标空间
	deadline： 截止时间的时间戳
**/
function createToken(accessKey, secretKey, bucket, deadline) {
	//构造上传策略
	var policy = { "scope": bucket, "deadline": deadline },
		//json解析为字符串
		policy_str = JSON.stringify(policy)
	//策略转码
	var policy_encode = urlsafe_base64_encode(policy_str)


	var hash = HmacSHA1(policy_encode, secretKey);
	//base64 编码
	var hash_encode = urlsafe_base64_encode(hash)

	//拼接最终token
	return accessKey + ':' + hash_encode + ':' + policy_encode
}

function uploadQiNiu(filePath, success) {

	wx.getFileSystemManager().readFile({
		filePath: filePath,
		encoding: "latin1",
		success: (res) => {
			const fileMd5 = MD5(res.data).toString()
			console.log('fileMd5 ' + fileMd5)


			qiniuUploader.upload(filePath,
				(res) => {
					//success
					success(res.fileUrl)
					console.log('file url is: ' + res.fileUrl)
				},
				(err) => {
					//fail
					console.error(err);
				},

				{
					region: 'SCN', // 华南区
					domain: downloadSer,
					shouldUseQiniuFileName: false,
					key: fileMd5,
					uptokenFunc: function () {
						const deadline = new Date().getTime() + 3600 * 1000
						const token = createToken(accessKey, secretKey, bucket, deadline)

						return token
					}
				},

				(progress) => {
					//progress
					console.log('上传进度', progress.progress)
					console.log('已经上传的数据长度', progress.totalBytesSent)
					console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
				},
				() => {
					//cacel 取消上传
				},
				() => {
					//before 上传前执行的操作
				},
				() => {
					//complete上传结束后的操作（无论成功或失败）
				}
			);

		},
		fail: (err) => {
			console.log('readFile fail, ' + err)
		}
	})

}


export { createToken, uploadQiNiu }