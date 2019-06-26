import {
	means,nativeApp
} from '../../../../util/common'
import api from '../../../../fetch/api'
import {
	Indicator,Toast
} from 'mint-ui'
export default {
    name: 'oldbeltyd',
    data(){
        return {
            login: this.$route.query.isLogin,
            token: ''
        }
    },
    created(){
        let that = this
        window.actionMessage = (arg) => {
            if(JSON.parse(arg).token!==''){
                that.token = JSON.parse(arg).token
                localStorage.setItem('token', JSON.parse(arg).token)
            }
        }
    },
    methods:{
        fx(){
            if(this.$route.query.cfrom=='app'){
                if(this.login=='0'&&this.token==''){
                    location.href = 'http://m.caixiaomi.net?cxmxc=scm&type=5&usinfo=1'
                }else{
                    Indicator.open()
                    let data = {
                        'str': ''
                    }
                    api.shareMyLinks(data)
                        .then(res => {
                            if (res.code == 0) {
                                location.href = '/activity/oldbeltnew?cxmxc=scm&showtitle=1&cmshare=1&cfrom=app&uid='+res.data.userld
                            }
                        })
                }
            }else{
                if(localStorage.getItem('token')){
                    Indicator.open()
                    let data = {
                        'str': ''
                    }
                    api.shareMyLinks(data)
                        .then(res => {
                            if (res.code == 0) {
                                this.$router.push({
                                    path: '/activity/oldbeltnew',
                                    query: {
                                        'uid': res.data.userld
                                    }
                                })
                            }
                        })
                }else{
                    this.$router.push({
                        path: '/user/sms'
                    })
                }
            }
        }
    },
    mounted(){
        nativeApp({'methodName':'showTitle','title':'邀请好友得红包'})
        means('邀请好友得红包').isTitle
    }
}