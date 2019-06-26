import {
	means,
    isShare,
    getCsUrl,
    nativeApp
} from '../../../../util/common'
import api from '../../../../fetch/api'
import {
	Indicator
} from 'mint-ui'
export default {
    name: 'oldbeltnew',
    beforeCreate() {
        Indicator.open()
    },
    data(){
        return {
            nums: [
                '15','35','50','70','80','200'
            ],
            oldObj:{
                'invitationNum': '-',
                'reward': '-'
            },
            uid:this.$route.query.uid,
            numList:[0,0,0,0,0,0],
            markflag: false,
            cfrom: this.$route.query.cfrom,
            zdlflag: false
        }
    },
    created(){
       
    },
    methods:{
        fetchData(){
			let data = {
				'str': ''
			}
			api.invitationNumAndReward(data)
				.then(res => {
					if (res.code == 0) {
                        this.oldObj = res.data
                        if(res.data.invitationNum=='-'){
                            return false;
                        }
                        if(res.data.invitationNum>=10){
                            this.$refs.numsItem[0].style.background = '#ea5504'
                        }
                        if(res.data.invitationNum>=20){
                            this.$refs.numsItem[1].style.background = '#ea5504'
                        }
                        if(res.data.invitationNum>=30){
                            this.$refs.numsItem[2].style.background = '#ea5504'
                        }
                        if(res.data.invitationNum>=40){
                            this.$refs.numsItem[3].style.background = '#ea5504'
                        }
                        if(res.data.invitationNum>=50){
                            this.$refs.numsItem[4].style.background = '#ea5504'
                        }
                        if(res.data.invitationNum>=100){
                            this.$refs.numsItem[5].style.background = '#ea5504'
                        }
                        if(res.data.invitationNum<=10){
                            this.numList[0] = (res.data.invitationNum/10)*100
                        }else if(res.data.invitationNum>10&&res.data.invitationNum<=20){
                            this.numList[0] = 100
                            this.numList[1] = ((res.data.invitationNum-10)/10)*100
                        }else if(res.data.invitationNum>20&&res.data.invitationNum<=30){
                            this.numList[0] = 100
                            this.numList[1] = 100
                            this.numList[2] = ((res.data.invitationNum-20)/10)*100
                        }else if(res.data.invitationNum>30&&res.data.invitationNum<=40){
                            this.numList[0] = 100
                            this.numList[1] = 100
                            this.numList[2] = 100
                            this.numList[3] = ((res.data.invitationNum-30)/10)*100
                        }else if(res.data.invitationNum>40&&res.data.invitationNum<=50){
                            this.numList[0] = 100
                            this.numList[1] = 100
                            this.numList[2] = 100
                            this.numList[3] = 100
                            this.numList[4] = ((res.data.invitationNum-40)/10)*100
                        }else{
                            this.numList[0] = 100
                            this.numList[1] = 100
                            this.numList[2] = 100
                            this.numList[3] = 100
                            this.numList[4] = 100
                            this.numList[5] = res.data.invitationNum>=100?100:((res.data.invitationNum-50)/50)*100
                        }
					}
				})
        },
        fx(){
            if(this.cfrom=='app'){
                this.markflag = true
            }else{
                this.zdlflag = true
            }
        },
        geturl(){
            return getCsUrl()+'/activity/one?type=isShare&frtype=ldx&a_='+this.uid
        }
    },
    mounted(){
        this.fetchData()
        isShare('新人注册送好礼，100元红包等你来领', '注册就送100元新人大礼包', '/activity/one?type=isShare&frtype=ldx&a_='+this.uid, '/static/activity_Back/newComerReg/img/logozc.jpg')
        nativeApp({'methodName':'showTitle','title':'邀请好友得红包'})
        means('邀请好友得红包').isTitle
    }
}