import {means} from '../../../../util/common'
import api from '../../../../fetch/api'
import {Indicator, Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui';

export default {
    name: 'index',
    data() {
        return {
            explain: {
                inviteNum:0,
                bettingTotalAmount:0,
                userId: ''
            },
            // userId: this.$route.query.userId,
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    created() {
        window.actionMessage = function (arg) {
            localStorage.setItem('token', JSON.parse(arg).token)
        }
    },
    mounted() {
        setTimeout(() => {
            this.fetchData()
        }, 1000)
        means('推广中心').isTitle
    },
    methods: {
        fetchData() {
            let data = {
                'userId': ''
            }
            api.extension(data)
                .then(res => {
                    if (res.code == 0) {
                        this.explain = res.data
                    }
                })
            let data1 = {
                    'url': '',
                }
                api.mycode(data1)
                    .then(res => {
                        if (res.code == 0) {
                            this.userId = res.data.userId
                        }
                })
        },
        goExplain() {
            if(this.$route.query.showtitle&&this.$route.query.showtitle=='1'){
                this.$router.push({path: '/activity/rule',query:{'showtitle':'1'}})
            }else{
                this.$router.push({path: '/activity/rule'})
            }
        },
        //额外奖励弹窗
        go_tost() {
            MessageBox.alert('', {
                message: '总收入排名第1名至第8名的店员，可获得额外1000元至50元的奖励',
                title: '额外奖励',
            }).then(action => {
            });
        },
        goCode(){
            if(this.$route.query.showtitle&&this.$route.query.showtitle=='1'){
                location.href="/activity/mycode?cxmxc=scm&cmshare=1&showtitle=1&id="+this.userId
            }else{
                this.$router.push({path: '/activity/mycode'})
            }
        },
        detail(userId) {
            if(this.$route.query.showtitle&this.$route.query.showtitle=='1'){
                location.href="/activity/income?cxmxc=scm&userId="+userId+"&showtitle=1"
            }else{
                this.$router.push({
                    path: '/activity/income',
                    query: {
                        'userId': userId
                    },
                    replace: false
                })
            }
        },
    }
}