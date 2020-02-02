const Utf8 = require("./crypto-js-3.1.9/enc-utf8")
const Base64 = require("./crypto-js-3.1.9/enc-base64");
const HmacSHA1 = require("./crypto-js-3.1.9/hmac-sha1");

//URL 安全的 Base64 编码，
function urlsafe_base64_encode(data) {
	//对于字符串，转换为wordArray
	if(data.clamp == undefined){
		console.log('data transfor')
		data = Utf8.parse(data)
	}
	//转码，并将'+'替换为'-', '/'替换为'_'
	return Base64.stringify(data).replace('+', '-').replace('/','_')
}


/**
	bucket：上传到 七牛云 的目标空间
	deadline： 截止时间的时间戳
**/
function createToken(accessKey, secretKey, bucket, deadline) {
	//构造上传策略
	var policy = {
		"scope": bucket,
		"deadline": deadline
	},
	//json解析为字符串
		policy_str = JSON.stringify(policy)
	
		//策略转码
	var policy_encode = urlsafe_base64_encode(policy_str)

	
	var hash = HmacSHA1(policy_encode, secretKey);
		//base64 编码
	var	hash_encode = urlsafe_base64_encode(hash)

	//拼接最终token
	return accessKey + ':' + hash_encode + ':' + policy_encode
}

export  { createToken }