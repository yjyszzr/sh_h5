import api from '../../../fetch/api'
import {Indicator, Toast} from 'mint-ui'
import datefilter from '../../../util/datefilter'
import detail from '../detail/index'
import outs from '../outs/outs.vue'
import lineup from '../lineup'
export default {
    name: 'teamDetail',
    beforeCreate() {
        Indicator.open()
    },
    data () {
        return {
            flag: '1',
            ckxqObj:{},
            zObj: {},
            dfList: ['matchNum','matchH','matchD','matchL','ballIn','ballLose','ballClean','score','teamOrder'],
            kobj: {},
            setInterval: '',
            res: {},
            eventList: [],
            matchLiveStatisticsDTO: []
        }
    },
    created(){

    },
    components:{
        'v-detail': detail,
        'v-outs':outs,
        'v-lineup': lineup
    },
    methods:{
        fetchData(){
            let data = {
                'matchId': this.$route.query.id
            }
            api.matchTeamInfos(data)
                .then(res => {
                    if(res.code==0) {
                        this.ckxqObj = res.data
                        let zlist = [],hlist = [],klist = [],vzlist=[],vhlist=[],vklist=[]
                        function lt(obj,list,item){
                            if(obj==null){
                                list.push('-')
                            }else{
                                _.forIn(obj, (value, key)=> {
                                    if(item==key){
                                        if(value==null){
                                            value = '-'
                                        }
                                        if(item=='ballIn'||item=='ballLose'){
                                            value += '/'
                                        }
                                        list.push(value)
                                    }
                                });
                            }
                        }
                        this.dfList.forEach(item => {
                            lt(res.data.homeTeamScoreInfo.lteamScore,zlist,item)
                            lt(res.data.homeTeamScoreInfo.hteamScore,hlist,item)
                            lt(res.data.homeTeamScoreInfo.tteamScore,klist,item)
                            lt(res.data.visitingTeamScoreInfo.lteamScore,vzlist,item)
                            lt(res.data.visitingTeamScoreInfo.hteamScore,vhlist,item)
                            lt(res.data.visitingTeamScoreInfo.tteamScore,vklist,item)
                        });
                        this.zObj.zlist = zlist
                        this.zObj.hlist = hlist
                        this.zObj.klist = klist
                        this.kobj.zlist = vzlist
                        this.kobj.hlist = vhlist
                        this.kobj.klist = vklist
                    }
                })
        },
        matchTimeDate(c){
            return datefilter(c*1000,1)
        },
        goTZ(){
            this.$router.go(-2)
        },
        fxTab(c,s){
            $('.currer').removeClass('currer')
            c.target.parentElement.className='currer'
            this.flag=s
        },
        colorMatchRs(c){
            switch (c) {
                case '胜':
                    return '#ea5504'
                case '平':
                    return '#0099d9'
                case '负':
                    return '#44ae35'
            }
        },
        // 获取比赛赛况
        getInfo(){
            var that = this
            let data = {
                matchId: that.$route.query.id
            }
            api.info(data)
                .then(res=>{
                    if(res.code == 0){
                        dataFn(res)
                    }
                })
            that.setInterval = setInterval(function () {
                api.info(data)
                    .then(res=>{
                        if(res.code == 0){
                            dataFn(res)
                        }
                    })
            },60000)
            function dataFn (res) {
                that.res = res.data
                that.eventList = res.data.eventList
                that.matchLiveStatisticsDTO = res.data.matchLiveStatisticsDTO
            }
        },
        dtfilter(c){
            return `${datefilter(c*1000,0)} ${datefilter(c*1000,1)}`
        },
        matchfinsh(c){
            switch (c){
                case '2': return '取消';
                case '4': return '推迟';
                case '5': return '暂停';
            }
        }
    },
    mounted(){
        this.getInfo()
        this.fetchData()
    },
    destroyed(){
        clearInterval(this.setInterval)
    }
}