import api from '../../../../fetch/api.js'
import time from '../data/data.vue'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import {mapState} from 'vuex'
export default {
  name: "match_filter",
  data() {
    return {
        matchFilterList: []
    };
  },
    components:{
      'v-time': time
    },
  methods: {
    cancel() {
      this.$store.dispatch("getMarkShow",false)
      this.$store.dispatch("getMarkReset",0)
    },
    team(index) {
        if(this.$refs.match_name[index].className == 'filterActive') {
            this.$refs.match_name[index].className = ''
        } else {
            this.$refs.match_name[index].className = 'filterActive'
        }
    },
    allFilter() {
        let arr = this.$refs.match_name
        for(let i = 0; i < arr.length; i++) {
            this.$refs.match_name[i].className = 'filterActive'
        }
    },
    reserveFilter() {
        let arr = this.$refs.match_name
        for(let i = 0; i < arr.length; i++) {
            if(this.$refs.match_name[i].className == 'filterActive') {
                this.$refs.match_name[i].className = ''
            } else {
                this.$refs.match_name[i].className = 'filterActive'
            }
        }
    },
    hotFilter() {
        let arr = this.$refs.match_name
        for(let i = 0; i < arr.length; i++) {
            this.$refs.match_name[i].className = ''
            if(arr[i].innerText == '德甲' || arr[i].innerText == '法甲' || arr[i].innerText == '西甲' || arr[i].innerText == '意甲' || arr[i].innerText == '英超') {
                this.$refs.match_name[i].className = 'filterActive'
            }
        }
    },
    confim(){
        let arr = this.$refs.match_name
        let arrTeam = []
        this.matchFilterList.forEach(item=>{
            for(let i=0;i<arr.length;i++){
                if(arr[i].className == 'filterActive'){
                    if(arr[i].innerText==item.leagueAddr){
                        arrTeam.push(item.leagueId)
                    }
                }
            }
        })
        Indicator.open()
        if(this.$route.path.split('/')[1]=='lotteryResult'){
            this.$store.dispatch("getLeagueIds",arrTeam.join(','))
            let data={
                dateStr: this.$store.state.mark_showObj.mark_dateVal,
                leagueIds: this.$store.state.mark_showObj.leagueIds,
                type: this.$store.state.mark_showObj.lotteryResultTableIndex
            }
            this.$store.dispatch("getResultList",data)
        }else{
            let data = {
                'leagueId': arrTeam.join(','),
                'playType': this.playType
            }
            this.$store.dispatch("getLeagueIds",arrTeam.join(','))
            this.$store.dispatch("getMatchList",data)
            this.$store.dispatch("getMarkReset",1)
        }
        this.$store.dispatch("getMarkShow",false)
    },
    lotteryResultFilter(c){
        api.getFilterConditionsSomeDay({'dateStr':c})
        .then(res => {
            if(res.code==0) {
                this.matchFilterList = res.data
                if(this.$store.state.mark_showObj.leagueIds==''){
                    let arr = res.data.map((item)=>{
                        return item.leagueId
                    })
                    if(this.$store.state.mark_showObj.isAlreadyBuyMatch!='1'){
                        this.$store.dispatch("getLeagueIds",arr.join(','))
                    }
                }
            }
        })
    }
  },
  mounted(){
      if(this.$route.path.split('/')[1]=='lotteryResult'){
        this.lotteryResultFilter(this.$store.state.mark_showObj.mark_dateVal)
      }else{
        api.filterConditions({})
        .then(res => {
            if(res.code==0) {
                this.matchFilterList = res.data
                if(this.$store.state.mark_showObj.leagueIds==''){
                    let arr = res.data.map((item)=>{
                        return item.leagueId
                    })
                    this.$store.dispatch("getLeagueIds",arr.join(','))
                }
            }
        })
      }
  },
  computed: {
    ...mapState({
         playType: state => state.freebuyId
    })
  },
};