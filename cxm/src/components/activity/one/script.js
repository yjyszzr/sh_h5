import {
	means,
	isShare,detect,nativeApp
} from '../../../util/common'
import api from '../../../fetch/api'
import {
	Toast,
	Indicator,MessageBox
} from 'mint-ui'
export default {
	name: 'one',
	data() {
		return {
			mobileVal: '',
			telVal: '',
			stop: false,
			changeText: '获取验证码',
			remainTime: 60,
		}
	},
	mounted() {
		var winHeight = $(window).height(); //获取当前页面高度
		$(window).resize(function () {
			var thisHeight = $(this).height();
			if (winHeight - thisHeight > 50) {
				$('body').css('height', winHeight + 'px');
			} else {
				$('body').css('height', '100%');
			}
		})
		nativeApp({'methodName':'showTitle','title':'注册送红包'})
		means('注册送红包').isTitle
		isShare(' 新人注册送好礼，100元红包等你来领', '注册就送100元新人大礼包', '/activity/one?type=isShare', '/static/activity_Back/newComerReg/img/logozc.jpg')
	},
	methods: {
		changeNum() {
			Indicator.open()
			//验证码信息
			let data = {
				'mobile': this.mobileVal,
				'smsType': 1
			}
			let sendldxType = ''
			if(this.$route.query.frtype=='ldx'){
				sendldxType = api.sendVerificationCode(data)
			}else{
				sendldxType = api.SendSmsCode(data)
			}
			sendldxType
				.then(res => {
					if (res.code == 0) {
						//发短信成功了，再调下面这两句
						this.stop = true;
						this.Interval = setInterval(this.update, 1000)
					} else if (res.code == '301010') {
						if(this.$route.query.type=='isShare'){
							MessageBox.alert('', {
								message: '您已领取',
								title: '提示',
								confirmButtonText: '查看',
								closeOnClickModal: true
							}).then(action => {
								if(detect()==='ios'){
									this.$router.push({
										path: '/'
									})
								}else{
									this.$router.push({
										path: '/activity/down/cxm',
										query:{
											ct: '2',
											fr: 'cxm_h5home'
										}
									})
								}
							});
						}else{
							MessageBox.alert('', {
								message: '您已领取，可在"我的卡券"里查看，将这个好消息告诉好友！',
								title: '提示',
								confirmButtonText: '我知道了',
								closeOnClickModal: false
							}).then(action => {
	
							});
						}
					} else if (res.code >= 30000 && res.code <= 310000) {
						Toast(res.msg)
					}
				})
		},
		update() {
			if (this.remainTime <= 1) {
				// 重置计数
				this.remainTime = 60
				// 清除计时器
				clearInterval(this.Interval)
				this.changeText = '重新获取'
				this.stop = false
			} else {
				// 倒计时
				this.remainTime--;
			}
		},
		lqbtn() {
			Indicator.open()
			//验证码信息
			let data = {
				'mobile': this.mobileVal,
				'smsCode': this.telVal,
				'loginSource': '4',
				'passWord': -1
			}
			let sendldxType = ''
			if(this.$route.query.frtype=='ldx'){
				data.invitationUserId = this.$route.query.a_
				data.loginSource = 'ldx'
				sendldxType = api.oldbeltnewregister(data)
			}else{
				sendldxType = api.Register(data)
			}
			sendldxType
				.then(res => {
					if (res.code == 0) {
						if(this.$route.query.type=='isShare'){
							MessageBox.alert('', {
								message: '领取成功',
								title: '提示',
								confirmButtonText: '查看',
								closeOnClickModal: true
							}).then(action => {
								if(detect()==='ios'){
									this.$router.push({
										path: '/'
									})
								}else{
									// this.$router.push({
									// 	path: '/activity/down/cxm',
									// 	query:{
									// 		ct: '2',
									// 		fr: 'cxm_h5home'
									// 	}
									// })
									this.$router.push({
										path: '/'
									})
								}
							});
						}else{
							Toast('领取成功,请到我的卡券查看')
						}
					} else if (res.code >= 30000 && res.code <= 310000) {
						Toast(res.msg)
					}
				})
		}
	},
	destroyed() {
		clearInterval(this.Interval)
	}
}