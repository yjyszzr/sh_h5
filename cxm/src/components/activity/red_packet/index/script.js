import {means,isShare,nativeApp} from '../../../../util/common'
import api from '../../../../fetch/api'
import {Indicator, Toast} from 'mint-ui'
import countDown from '../count_down/count_down'
import { MessageBox } from 'mint-ui';

export default {
    name: 'red_packet',
    data(){
        return {
            token: '',
            packet:{},
            countUserInfo:{},
            y_Carousel: [], //中奖信息
            activeIndex: 0
        }
    },

    beforeCreate() {
        Indicator.open()
    },
    components: {
        "v-countDown": countDown,
    },
    created() {
        window.actionMessage = function (arg) {
            localStorage.setItem('token', JSON.parse(arg).token)
        }
    },
    mounted(){
        //分享
        isShare('充值送壕礼，最高800元红包随机送', '充值狂欢日,随机送800元', '/activity/red_packet?cxmxc=scm&cmshare=1&showtitle=1&type=1&usinfo=1','/static/activity_Back/newComerReg/img/logozc.jpg')
        let data = {
            pageNum:1,
            pageSize:10
        }
        api.toRechange(data)
            .then(res => {
                if (res.code == 0) {
                    this.packet = res.data
                }
            })
        //跑马灯效果
        api.getWinningList(data)
            .then(res => {
                if (res.code == 0) {
                    this.y_Carousel = res.data
                    setInterval(_ => {
                        if (this.activeIndex < this.y_Carousel.length - 1) {
                          this.activeIndex += 1;
                        } else {
                          this.activeIndex = 0;
                        }
                      }, 3000);
                }
            })
        nativeApp({'methodName':'showTitle','title':'活动详情'})
        means('活动详情').isTitle
    },
    computed: {
        //跑马灯
        top() {
          return -this.activeIndex * 1.03 + "rem";
        }
    },
    methods: {
    //倒计时结束操作
        callback(){},
        //火速充值按钮操作
        btn(realValue, type){

            Indicator.open()
             //app充值传钱转对象
            let price = {"price":realValue}
            means(price).paydata

            let data = {
                str:''
            }
            api.countUser(data)
                .then(res => {
                    if (res.code == 0) {
                        this.countUserInfo = res.data;
                        //yesOrNo0未充值 1充值         type 0 新用户，1老用户
                        if (!localStorage.getItem('token')) {
                            this.$router.push({
                                path: '/user/sms'
                            })
                        }else if(this.countUserInfo.yesOrNo == 0 && type == 1){
                            MessageBox.confirm('',{
                                message: '有新用户专享活动，仍然继续？',
                                title: '提示',
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then(action => {
                                if(this.$route.query.cfrom == 'app'){
                                    location.href="/user/recharge?cxmxc=scm&type=11&extparam=paydata"
                                }else{
                                    this.$router.push({
                                        path: '/user/recharge',
                                        query: {
                                            'price': price.price
                                        },
                                        replace: false
                                    })
                                }
                            },action =>{

                            })
                            return false;
                        }else if(this.countUserInfo.yesOrNo == 1 && type == 0){
                            Toast('本活动仅限新用户参与');
                            return false;
                        }else{
                            if(this.$route.query.cfrom == 'app'){
                                location.href="/user/recharge?cxmxc=scm&type=11&extparam=paydata&cmshare=1"
                                return false;
                            }
                            this.$router.push({
                                    path: '/user/recharge',
                                    query: {
                                        'price': price.price
                                    },
                                    replace: false
                            })
                        }
                    }
                })
        }
    }
}