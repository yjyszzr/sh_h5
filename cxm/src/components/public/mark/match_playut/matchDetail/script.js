import api from '../../../../../fetch/api'
import { Toast } from 'mint-ui'
import datefilter from '../../../../../util/datefilter'
export default {
    name: 'matchDetail',
    data () {
      return {
         matchDetailObj: {}
      }
    },
    created(){
        let data = {
            'matchId': this.$store.state.mark_playObj.bfmatchId
        }
        api.matchTeamInfosSum(data)
            .then(res => {
                if(res.code==0) {
                    this.matchDetailObj = res.data
                    // console.log(res)
                }
        })
    },
    methods: {
        cancel(){
            if(this.$store.state.mark_playObj.matchDetailFlag==false){
                this.$store.dispatch("getMatchDetailFlag",true)
            }else{
                this.$store.dispatch("getMatchDetailFlag",false)
            }
            this.$emit('closeMarkCz')
        },
        confirm(){
            this.$router.push({
                path: '/lottery/teamDetail',
                query:{
                    id: this.matchDetailObj.matchInfo.matchId
                },
                replace: true
            })
        },
        matchTimeDate(c){
            return datefilter(Number(c * 1000), 3)
        }
    },
    mounted(){
        
    }
}