$.showIndicator();
// console.log(baseUrl)
function getUrlStr(name, url) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(url)) {
		return unescape(RegExp.$2.replace(/\+/g, " "))
	}
	return undefined
}
var channels = 'xqd'
if (getUrlStr('fr', location.href)) {
	channels = getUrlStr('fr', location.href)
}
var device = {
	plat: 'h5',
	apiv: 1,
	appv: '2.1.1',
	appid: '',
	mac: '',
	w: window.screen.availWidth,
	h: window.screen.availHeight,
	os: '',
	mid: '',
	brand: '',
	build: '',
	channel: channels,
	net: '',
	token: ''
}
var userData = ''



//判断苹果系统和安卓系统
function detect() {
	var equipmentType = "";
	var agent = navigator.userAgent.toLowerCase();
	var android = agent.indexOf("android");
	var iphone = agent.indexOf("iphone");
	var ipad = agent.indexOf("ipad");
	if (android != -1) {
		equipmentType = "android";
	}
	if (iphone != -1 || ipad != -1) {
		equipmentType = "ios";
	}
	return equipmentType;
}
var detect = detect()

if (detect === 'ios') {
	$('.downLoadBtn').css('display', 'none')
}

function activity_smClick() {
	$.modal({
		title: '活动说明',
		text: '<p class="left">1、 用户通过页面注册，即可免费领取世界杯体彩一注，并获得丰厚大礼。<br />2、每位用户仅有一次机会，同一设备、手机号视为同一用户。<br />3、本活动世界杯体彩彩票均为线下实体店出票。<br /> 4、活动最终解释权归彩小秘所有。</p>',
		buttons: [{
			text: '知道了',
			onClick: function () {
				$.closeModal()
			}
		}, ]
	})
}

function getSmsCode() {
	var obj = {}
	obj.body = {
		'mobile': $('.telVal').val(),
		'smsType': '1',
		'channelId': 500
	}
	obj.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/xqdActivity/smsCode',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj),
		dataType: "json",
		success: function (data) {
			console.log(data)
			$.hideIndicator();
			if (data.code == '301010') {
				$.router.load("#router2")

				if (detect === 'ios') {
					$('.downLoadBtn').css('display', 'none')
				}
			} else if (data.code == '0') {
				$.toast('验证码发送成功');
				$('.code').show()
				$('.lqbtn').css('display', 'block')
				$('.btn').hide()
				userData = data.data
				getCode()
			} else if (data.code >= 30000 && data.code <= 310000) {
				$.toast(data.msg);
			}
		},
		error: function (err) {
			$.hideIndicator();
		}
	})
}

function register() {
	var re = /^1\d{10}$/
	if ($('.telVal').val() === '') {
		$.toast('请输入手机号码');
	} else if (!re.test($('.telVal').val())) {
		$.toast('请输入正确的手机号码');
	} else {
		$.showIndicator();
		getSmsCode()
	}
}
var validCode = true;

function getCode() {
	var time = 60;
	if (validCode) {
		validCode = false;
		var t = setInterval(function () {
			time--;
			$('.codebtn').html("<span style='color: #ea5504;'>" + time + "s</span>后重新获取");
			if (time == 0) {
				clearInterval(t);
				$('.codebtn').html("<span onClick='getSmsCode()'>重新获取</span>");
				validCode = true;
			}
		}, 1000)
	}
}

function lqbtn() {
	if ($('.codeVal').val() === '') {
		$.toast('验证码不能为空');
		return false;
	}
	$.showIndicator();
	var obj2 = {}
	obj2.body = {
		'mobile': $('.telVal').val(),
		'smsCode': $('.codeVal').val(),
		'loginSource': '4',
		'channelDistributorId': userData,
		'smsType ': 1,
		'channelId': 500
	}
	obj2.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/xqdActivity/receiveRonus',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj2),
		dataType: "json",
		success: function (data) {
			//console.log(data)
			if (data.code == '0') {
				$.toast('注册成功');
				$.router.load("#router2")
			} else if (data.code >= 30000 && data.code <= 310000) {
				$.toast(data.msg);
			}
			$.hideIndicator();
		},
		error: function (err) {
			$.hideIndicator();
		}
	})
}

function downLoadGoto() {
	var obj3 = {}
	obj3.body = {
		'clickTypeId': '500_channelToUseNum'
	}
	obj3.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/xqdActivity/clickNum',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj3),
		dataType: "json",
		success: function (data) {
			// console.log(data)
			if (data.code == '0') {}
		},
	})
	location.href = 'http://m.caixiaomi.net'
}

function wxpd() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

function downLoadBtn() {
	var obj4 = {}
	obj4.body = {
		'clickTypeId': '500_channelDownloadNum'
	}
	obj4.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/xqdActivity/clickNum',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj4),
		dataType: "json",
		success: function (data) {
			// console.log(data)
			if (data.code == '0') {}
		},
	})
	if (wxpd()) {
		location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=net.caixiaomi.info'
	} else {
		location.href = 'http://m.caixiaomi.net/activity/down/cxm?ct=2&fr=cxm_h5home'
	}
	// if(detect==='ios'){
	// 	location.href = 'http://m.caixiaomi.net'
	// }else if(detect==='android'){
	// 	location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=net.caixiaomi.info'
	// }
}

window.onload = function () {
	var obj1 = {}
	obj1.body = {

	}
	obj1.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/dl/channelConsumer/getWinningList',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj1),
		dataType: "json",
		success: function (item) {
			var str = ''
			for (var i = 0; i < 5; i++) {
				str += '<p>' + item.data[i].winningMsg + '<span>' + item.data[i].winningMoney + '</span>元</p>'
			}
			//						console.log(str)
			$('.xb').append(str)
			setTimeout(function () {
				$.hideIndicator();
			}, 300)
		},
		error: function (err) {
			//$.router.load("#router2")
			//						console.log(err.response)
			$.hideIndicator();
		}
	})
}