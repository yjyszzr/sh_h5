import api from '../../../../../fetch/api'
import { Toast } from 'mint-ui'
export default {
    name: 'score',
    data () {
      return {
          scoreObj: {
              flag: '1'
          },
          scoreArr: new Set(),
          scoreList: []
      }
    },
    methods: {
        cancel(){
            this.$emit('closeMarkCz')
        },
        confirm(){
            this.$emit('closeMarkCz')
            if(this.scoreArr.size==0){
                _.unset(this.$store.state.mark_playObj.bfIdSaveMap,this.scoreObj.matchId)
            }else{
                _.set(this.$store.state.mark_playObj.bfIdSaveMap,this.scoreObj.matchId,this.scoreList)
            }
            this.$store.state.mark_playObj.bfIdSaveMapFlag+=1
        },
        bfClick(c){
            if(c.target.parentElement.className == ''){
                c.target.parentElement.className = 'bfSelected'
                this.scoreArr.add(c.target.parentElement.children[1].innerText)
            }else{
                c.target.parentElement.className = ''
                this.scoreArr.delete(c.target.parentElement.children[1].innerText)
            }
            this.scoreList = Array.from(this.scoreArr)
        }
    },
    mounted(){
        this.$store.state.matchObj.playList.forEach(item => {
            for(let i = 0;i < item.playList.length;i ++){
                if(item.playList[i].matchId == this.$store.state.mark_playObj.bfmatchId){
                   this.scoreObj =  item.playList[i]
                }
            }
        });
        if(_.has(this.$store.state.mark_playObj.bfIdSaveMap,this.scoreObj.matchId)){
            this.scoreArr = new Set()
            _.forIn(this.$store.state.mark_playObj.bfIdSaveMap, (value, key) => {
                if ( this.scoreObj.matchId == key) {
                    //this.scoreArr = value
                    value.forEach(item=>{
                        this.scoreArr.add(item)
                    })
                }
            });
        }else{
            this.scoreArr = new Set()
        }
        this.scoreList = Array.from(this.scoreArr)
    }
}