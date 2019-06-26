import api from '../../../../fetch/api.js'
import score from './score/index.vue'
import bqc from './bqc/index.vue'
import mix from './mix/index.vue'
import matchDetail from './matchDetail/index.vue'
import popup from './popup/popup.vue'
import bankList from './bankList/index.vue'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name: "match_playut",
  data() {
    return {
        list: new Set(),
        bounsId: ''
    };
  },
  components:{
    'v-score': score,
    'v-bqc': bqc,
    'v-mix': mix,
    'v-matchdetail': matchDetail,
    'v-popup': popup,
    'v-banklist': bankList
  },
  methods: {
    closeMarkCz(){
      this.$store.dispatch("getMarkplay",'')
      setTimeout(()=>{
        this.$store.dispatch("getMarkplayBox",false)
      },250)
    },
    closeMarkCzZz(){
      if(this.$store.state.mark_playObj.matchDetailFlag==false){
          this.$store.dispatch("getMatchDetailFlag",true)
      }else{
          this.$store.dispatch("getMatchDetailFlag",false)
      }
      this.closeMarkCz()
    },
    changeColor(c,s){
      if(c.target.className=='current'&&this.list.size>1){
        c.target.className=''
        this.list.delete(s)
      }else{
        c.target.className='current'
        this.list.add(s)
      }
    },
    confirm(){
      this.closeMarkCz()
      this.$store.state.mark_playObj.playutText = Array.from(this.list)
      this.$store.state.mark_playObj.playutText.sort((a,b)=>{
        return a.split('&')[0]-b.split('&')[0]
      })
      Indicator.open()
    },
    bounsSelected(c,i){
      if(this.$refs.userBonusIdS[i].className == 'bounsId'){
        this.$refs.userBonusIdS[i].className = ''
      }else{
        $('.bounsId').removeClass('bounsId')
        this.$refs.userBonusIdS[i].className = 'bounsId'
      }
      //console.log($('.bounsId').length)
      if($('.bounsId').length<=0){
        this.bounsId = -1
      }else{
        this.bounsId = c.userBonusId
      }
    },
    yhBtn(){
       this.closeMarkCz()
       this.$store.state.mark_playObj.mybounsId = this.bounsId
    }
  },
  mounted(){
    
  },
  computed: {  
    status() {  
        return this.$store.state.mark_playObj.playutText; 
    },
    markStatus(){
        return this.$store.state.mark_playObj.mark_play;
    } 
  },  
  watch: {
    status(a,b){
      this.list = new Set(this.$store.state.mark_playObj.playutText)
    }
  }
};