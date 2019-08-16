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
	channel: 'h5',
	net: '',
	token: ''
}

//判断苹果系统和安卓系统
// function detect() {
// 	var equipmentType = "";
// 	var agent = navigator.userAgent.toLowerCase();
// 	var android = agent.indexOf("android");
// 	var iphone = agent.indexOf("iphone");
// 	var ipad = agent.indexOf("ipad");
// 	if (android != -1) {
// 		equipmentType = "android";
// 	}
// 	if (iphone != -1 || ipad != -1) {
// 		equipmentType = "ios";
// 	}
// 	return equipmentType;
// }
// var detect = detect()

// if (detect === 'ios') {
// 	$('.downLoadBtn').css('display', 'none')
// }

function getUrlStr(name, url) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(url)) {
		return unescape(RegExp.$2.replace(/\+/g, " "))
	}
	return undefined
}

// function downLoadGoto() {
// 	location.href = 'http://m.caixiaomi.net'
// }

function activity_smClick() {
	$.modal({
		title: '规则说明',
		text: '<p class="left">1.通过此页面注册并下载APP完成任务后可领取购彩金；<br />2、每个新注册手机号只可获得一次奖励；<br />3、通过作弊违规手段获取奖励者，我们有权取消其资格，并依法追讨损失；<br /> 4、该活动最终解释权归圣和彩店所有；</p>',
		buttons: [{
			text: '知道了',
			onClick: function () {
				$.closeModal()
			}
		}, ]
	})
}

//验证码逻辑
function getSmsCode() {
	var obj = {}
	obj.body = {
		'mobile': $('.phoneVal').val(),
		'smsType': '1'
	}
	obj.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/sms/sendSmsCode',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj),
		dataType: "json",
		success: function (data) {
			//					console.log(data)
			if (data.code == '301010') {
				$.hideIndicator();
				$.modal({
					title: '提示',
					text: '当前手机号码已注册',
					buttons: [{
						text: '我知道了',
						onClick: function () {
							//$.router.load("#router2")
							$.closeModal()
						}
					}, ]
				})
			} else if (data.code == '0') {
				$.toast('验证码发送成功');
				getCode()
			} else if (data.code >= 30000 && data.code <= 310000) {
				$.hideIndicator();
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
	if ($('.phoneVal').val() === '') {
		$.toast('请输入手机号码');
	} else if (!re.test($('.phoneVal').val())) {
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
			$.hideIndicator();
			time--;
			$('.codebtn').attr('disabled',true);
			$('.codebtn').html(time+"s后重新获取");
			if (time == 0) {
				clearInterval(t);
				$('.codebtn').html("<span onClick='getSmsCode()'>重新获取</span>");
				$('.codebtn').removeAttr('disabled');
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
		'mobile': $('.phoneVal').val(),
		'smsCode': $('.codeVal').val(),
		'loginSource': '4',
		'invitCode': getUrlStr('id',location.href),
		"pushKey": "",
		"passWord": ''
	}
	obj2.device = device
	$.ajax({
		type: 'post',
		url: baseUrl + 'member/user/registerV2',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(obj2),
		dataType: "json",
		success: function (data) {
			//console.log(data)
			if (data.code == '0') {
				$.modal({
					title: '提示',
					text: '领取成功',
					buttons: [{
						text: '下载APP',
						onClick: function () {
							//$.router.load("#router2")
							downLoadBtn();
						}
					}, ]
				})
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

function wxpd() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

function downLoadBtn() {
	location.href = 'https://shenghecaidian-1258992454.cos.ap-chengdu.myqcloud.com/20190422/dist/index.html'
	// if (wxpd()) {
	// 	location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=net.caixiaomi.info'
	// } else {
	// 	location.href = 'http://m.caixiaomi.net/activity/down/cxm?ct=2&fr=cxm_h5home'
	// }
	// if(detect==='ios'){
	// 	location.href = 'http://m.caixiaomi.net'
	// }else if(detect==='android'){
	// 	location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=net.caixiaomi.info'
	// }
}
var u = navigator.userAgent
var sAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
// 安卓
if (sAndroid) {
    window.addEventListener('resize', function() {
        if (document.activeElement.tagName == "INPUT") {
            window.setTimeout(function() {
                document.activeElement.scrollIntoViewIfNeeded() // 异常时可以用 document.activeElement.scrollIntoView(false)
            }, 0)
        }
    })
}
function inputBlur () {
    setTimeout(() => {
        window.scrollTo(0, 0)
    }, 100)
}