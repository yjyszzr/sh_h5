import api from '../../../../../fetch/api'
import {
    Toast
} from 'mint-ui'
export default {
    name: 'mix',
    data() {
        return {
            scoreObj: {
                flag: 1
            },
            //mixObj: {}
        }
    },
    methods: {
        cancel() {
            this.$emit('closeMarkCz')
        },
        confirm() {
            this.$emit('closeMarkCz')
            //this.$store.state.matchObj = this.mixObj
            this.$store.state.matchObj.playList.forEach(item => {
                for (let i = 0; i < item.playList.length; i++) {
                    if (item.playList[i].matchId == this.$store.state.mark_playObj.bfmatchId) {
                        item.playList[i] = this.scoreObj
                    }
                }
            });
            this.$store.state.mark_playObj.bfIdSaveMapFlag++
        },
        unSelectedClickspf(c, s, status,sig,fixodds) {
            //console.log(c)
            let arr = new Set(this.scoreObj.selectedList),
                obj2 = {}
            let obj = {},
                betCells = new Set()
            this.scoreObj.selectedList.forEach(item => {
                if (item.playType == status) {
                    item.betCells.forEach(data => {
                        betCells.add(JSON.stringify(data))
                    })
                }
            })
            obj.cellCode = s.cellCode
            obj.cellName = s.cellName
            obj.cellOdds = s.cellOdds
            obj.cellSons = s.cellSons
            if (c.target.parentElement.className == '') {
                c.target.parentElement.className = 'bfSelected'
                s.isSelected = 'sld'
                this.scoreObj.selectedNum++
                    betCells.add(JSON.stringify(obj))
            } else {
                c.target.parentElement.className = ''
                s.isSelected = false
                this.scoreObj.selectedNum--
                    betCells.delete(JSON.stringify(obj))
            }
            obj2.betCells = []
            betCells.forEach(item => {
                obj2.betCells.push(JSON.parse(item))
            })
            obj2.playType = status
            obj2.single = sig
            obj2.fixedodds = fixodds
            if (this.scoreObj.selectedList.length <= 0) {
                arr.add(obj2)
            } else {
                let arrTj = []
                arr.forEach(item => {
                    arrTj.push(item.playType)
                })
                arr.forEach(item => {
                    if (arrTj.indexOf(obj2.playType) == -1) {
                        arr.add(obj2)
                    } else {
                        if (item.playType == obj2.playType) {
                            if(obj2.betCells.length>0){
                                item.betCells = obj2.betCells
                            }else{
                                arr.delete(item)
                            }
                        }
                    }
                })
            }
            this.scoreObj.selectedList = Array.from(arr)
           // console.log(this.scoreObj)
        }
    },
    mounted() {
        this.$store.state.matchObj.playList.forEach(item => {
            for (let i = 0; i < item.playList.length; i++) {
                if (item.playList[i].matchId == this.$store.state.mark_playObj.bfmatchId) {
                    this.scoreObj = JSON.parse(JSON.stringify(item.playList[i]))
                }
            }
        });
    }
}