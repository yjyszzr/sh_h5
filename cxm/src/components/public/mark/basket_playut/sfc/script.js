import { Toast } from 'mint-ui'
export default {
    name: 'score',
    data () {
      return {
          scoreObj: {
             
          },
          oddSelectNum: 0
      }
    },
    props:[
        'sfcObj'
    ],
    methods: {
        cancel(){
            this.$emit('closeMark')
        },
        confirm(){
            this.$emit('closeMark')
            this.sfcObj.selectNum = this.scoreObj.selectNum
            this.sfcObj.selectList = this.scoreObj.selectList
            if(this.scoreObj.matchPlays[0].homeCell){
                this.sfcObj.matchPlays[0].homeCell.cellSons = this.scoreObj.matchPlays[0].homeCell.cellSons
            }
            if(this.scoreObj.matchPlays[0].visitingCell){
                this.sfcObj.matchPlays[0].visitingCell.cellSons = this.scoreObj.matchPlays[0].visitingCell.cellSons
            }
            this.$emit('isSelectedTy',this.scoreObj,this.oddSelectNum)
        },
        sfcClick(c,s,type){ //胜分差点击
            let obj = {
                playType: s.matchPlays[0].playType,
                single: s.matchPlays[0].single,
                fixedOdds: s.matchPlays[0].fixedOdds,
                kz: type=='k'?'客胜':'主胜'
            }
            this.$emit('concatInfo',c, s , obj, '0') 
        }
    },
    mounted(){
        this.scoreObj = JSON.parse(JSON.stringify(this.sfcObj))
        this.oddSelectNum = this.scoreObj.selectNum
        // console.log(this.sfcObj)
    }
}