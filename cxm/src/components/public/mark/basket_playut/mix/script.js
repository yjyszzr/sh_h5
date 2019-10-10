import {
    Toast
} from 'mint-ui'
export default {
    name: 'mix',
    data() {
        return {
            mixObj: {
                
            },
            oddSelectNum: 0
        }
    },
    props:[
        'moreObj'
    ],
    methods: {
        cancel() {
            this.$emit('closeMark')
        },
        confirm() {
            this.$emit('closeMark')
            this.moreObj.selectNum = this.mixObj.selectNum
            this.moreObj.selectList = this.mixObj.selectList
            this.mixObj.matchPlays.forEach((item,i) => {
                if(i>=3){
                    this.moreObj.matchPlays.forEach(data=>{
                        if(this.mixObj.matchPlays[i].homeCell){
                            this.moreObj.matchPlays[i].homeCell.cellSons = this.mixObj.matchPlays[i].homeCell.cellSons
                        }
                        if(this.mixObj.matchPlays[i].visitingCell){
                            this.moreObj.matchPlays[i].visitingCell.cellSons = this.mixObj.matchPlays[i].visitingCell.cellSons
                        }
                    })
                }else{
                    this.moreObj.matchPlays.forEach(data=>{
                        if(this.mixObj.matchPlays[i].homeCell){
                            this.moreObj.matchPlays[i].homeCell.isSelected = this.mixObj.matchPlays[i].homeCell.isSelected
                        }
                        if(this.mixObj.matchPlays[i].visitingCell){
                            this.moreObj.matchPlays[i].visitingCell.isSelected = this.mixObj.matchPlays[i].visitingCell.isSelected
                        }
                    })
                }
            });
            this.$emit('isSelectedTy',this.mixObj,this.oddSelectNum)
        },
        kClick(c,s){ //客队点击
            this.$emit('concatInfo',c.visitingCell, s , c, '0')  
        },
        zClick(c,s){ //主队点击
            this.$emit('concatInfo',c.homeCell, s , c, '0')  
        },
        sfcClick(c,s,type){ //胜分差点击
            let obj = {
                playType: s.matchPlays[3].playType,
                single: s.matchPlays[3].single,
                fixedOdds: s.matchPlays[3].fixedOdds,
                kz: type=='k'?'客胜':'主胜'
            }
            this.$emit('concatInfo',c, s , obj, '0')  
        }
    },
    mounted() {
        this.mixObj = JSON.parse(JSON.stringify(this.moreObj))
        this.oddSelectNum = this.mixObj.selectNum
        //console.log(this.mixObj)
    }
}