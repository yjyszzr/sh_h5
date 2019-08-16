import {nativeApp,isWebview,getCsUrl} from '@/util/common'
import {Indicator} from 'mint-ui'
import api from '@/fetch/api'
export default {
    name: 'index',
    data(){
        return {
            bounsStatus: '0', //伯乐红包状态控制显-隐
            rybounsStatus: false, //荣耀开红包总金额变化
            activityUserInfo:{}, //推广用户信息
            dq_pos: {}, //伯乐当前档位信息保存
            gear_pos: {}, //伯乐下一前档位信息保存
            totalMoneyAdd: '0', //总奖励金增加动画数据
            acitvityBl: [], //荣耀档位信息保存
            acitvityRy: [], //荣耀档位信息保存
            ryBfb: 0, //满足条件荣耀档位百分比保存
            markShow: false, //弹窗展示
            jtype: '', //奖类型
            flShow: '', //返利奖模块显隐
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    created(){
        nativeApp({'methodName':'showTitle','title':'推广赚钱'})
    },
    methods:{
        //从app端初始化
        init(){
            //从app端获取token
            window.actionMessage =  (arg)=> {
                localStorage.setItem('token',JSON.parse(arg).token)
                this.fetchData();
            }
            nativeApp({'methodName':'getToken'})
        },
        // 点击伯乐-荣耀红包
        openBouns(c,s){
            Indicator.open()
            let data = {
                "actId": c.act_id,
                "actType": s=='bl'?"3":"4",
                "gearPosition": c.gear_position,
                "gearPositionMoney": c.gear_position_money
            }
            api.recieveHBByActType(data)
            .then(res => {
                if (res.code == 0) {
                    if(s=='bl'){
                        this.bounsStatus = 2;
                    }else{
                        c.show = true;
                        this.rybounsStatus = true;
                    }  
                    this.totalMoneyAdd = c.gear_position_money;
                    setTimeout(()=>{
                        if(s=='ry'){
                            c.show = false;
                            this.rybounsStatus = false;
                        }
                        this.fetchData();
                    },1000)
                }
            })
        },
        //数据请求
        fetchData(){
            api.showActivityByTg({})
            .then(res => {
                if (res.code == 0) {
                    this.activityUserInfo = res.data.activityUserInfo
                    let fl= res.data.activity.find(item=>{
                        return item.act_type == '4';
                    })
                    if(fl){
                        this.flShow = Number(fl.number)
                    }else{
                        this.flShow = 0 
                    }
                    if(res.data.acitvityBl.length>0){
                        //伯乐档位排序
                        res.data.acitvityBl.sort((a,b)=>{
                            return Number(a.gear_position)-Number(b.gear_position);
                        })
                        this.acitvityBl = res.data.acitvityBl
                        //当前档位查找
                        this.dq_pos = res.data.acitvityBl.find((item)=>{
                            return item.is_status == '0';
                        }) || res.data.acitvityBl[res.data.acitvityBl.length-1]

                        //下一档位查找
                        this.gear_pos = res.data.acitvityBl.find((item)=>{
                            return item.gear_position>Number(res.data.activityUserInfo.invitation_number)
                        })

                        if(this.dq_pos.gear_position>Number(res.data.activityUserInfo.invitation_number)){
                            this.bounsStatus = 0;
                        }else{
                            this.bounsStatus = 1;
                        }
                    }
                    if(res.data.acitvityRy.length>0){
                        //荣耀档位排序
                        res.data.acitvityRy.sort((a,b)=>{
                            return Number(a.gear_position)-Number(b.gear_position);
                        })

                        this.acitvityRy = res.data.acitvityRy

                        let dbz = Number(this.activityUserInfo.invitation_add_reward); 
                        let ryArr = res.data.acitvityRy;
                        //荣耀档位百分比计算
                        if(dbz<=ryArr[0].gear_position){
                            this.ryBfb = (1/ryArr.length*100)*dbz/ryArr[0].gear_position
                        }else if(dbz>ryArr[0].gear_position&&dbz<=ryArr[1].gear_position){
                            this.ryBfb = 1/ryArr.length*100+((1/ryArr.length*100)*(dbz-ryArr[0].gear_position)/(ryArr[1].gear_position-ryArr[0].gear_position))
                        }else if(dbz>ryArr[1].gear_position&&dbz<=ryArr[2].gear_position){
                            this.ryBfb = 2/ryArr.length*100+((1/ryArr.length*100)*(dbz-ryArr[1].gear_position)/(ryArr[2].gear_position-ryArr[1].gear_position))
                        }else if(dbz>ryArr[2].gear_position&&dbz<=ryArr[3].gear_position){
                            this.ryBfb = 3/ryArr.length*100+((1/ryArr.length*100)*(dbz-ryArr[2].gear_position)/(ryArr[3].gear_position-ryArr[2].gear_position))
                        }else if(dbz>ryArr[3].gear_position&&dbz<=ryArr[4].gear_position){
                            this.ryBfb = 4/ryArr.length*100+((1/ryArr.length*100)*(dbz-ryArr[3].gear_position)/(ryArr[4].gear_position-ryArr[3].gear_position))
                        }else if(!ryArr[5]&&dbz>ryArr[4].gear_position){
                            this.ryBfb = 100;
                        }else if(ryArr[5]&&dbz>ryArr[4].gear_position&&dbz<=ryArr[5].gear_position){
                            this.ryBfb = 5/ryArr.length*100+((1/ryArr.length*100)*(dbz-ryArr[4].gear_position)/(ryArr[5].gear_position-ryArr[4].gear_position))
                        }else if(ryArr[5]&&dbz>ryArr[5].gear_position){
                            this.ryBfb = 100;
                        }
                    }
                }
            })
        },
        //人民币单位转化
        rmbGsh(c){
            if(c.length<=4){
                return c/1000+'千';
            }else{
                return c/10000+'万';
            }
        },
        //跳转我的总奖金
        goMygroincome(){
            if(!isWebview()){
                this.$router.push({
                    path: '/user/activity/mygrossincome'
                })
            }else{
                nativeApp({'methodName':'pushUrl','url':getCsUrl()+'/user/activity/mygrossincome?cxmxc=scm&type=1'})
            }
        },
        //跳转受邀人数
        goInvitedFriends(){
            if(!isWebview()){
                this.$router.push({
                    path: '/user/activity/invitedfriends'
                })
            }else{
                nativeApp({'methodName':'pushUrl','url':getCsUrl()+'/user/activity/invitedfriends?cxmxc=scm&type=1'})
            }
        },
        //弹窗
        ts(c){
            this.jtype = c;
            this.markShow = !this.markShow;
        },
        //关闭弹窗
        close(){
            this.markShow = false;
        },
        //跳转我的二维码
        myercode(){
            if(!isWebview()){
                this.$router.push({
                    path: '/user/activity/ercode',
                    query:{
                        userid: this.activityUserInfo.user_id
                    }
                })
            }else{
                nativeApp({'methodName':'pushUrl','url':getCsUrl()+'/user/activity/ercode?cxmxc=scm&type=1&userid='+this.activityUserInfo.user_id})
            }
        },
        //分享
        share(){
            if(isWebview()){
                nativeApp({'methodName':'goShare','title':'您收到一个红包','description':'注册送68元彩金首单免费!','url':getCsUrl()+'/static/activity/tg/index.html?id='+this.activityUserInfo.user_id,'thumbUrl':getCsUrl()+'/static/activity/tg/img/fx.jpg'})
            }
        }
    },
    mounted(){
        if(!isWebview()){
            this.fetchData();
        }else{
            this.init();
        }
    }
}