import api from '../../../fetch/api'
import {
	Toast
} from 'mint-ui'
import {
	Indicator
} from 'mint-ui'
import datefilter from '../../../util/datefilter'
import deleteArray from '../../../util/deleteArray'
export default {
	name: 'cathectic',
	data() {
		return {
			arrTime: [],
			matchSelectObj: new Map(),
			id: '',
			arr: new Set(),
			betObj: {},
			matchBetPlays: [],
			disable: false,
			danNUm: 0, //统计胆数量
			matchSave: {}, //接口数据保存
			maxButNum: false,  //最大注数及单注最大限额
			maxButNumMsg: '', //最大注数信息
		}
	},
	beforeCreate() {
        Indicator.open()
    },
	created() {

	},
	methods: {
		datePd(c) {
			return datefilter(Number(c * 1000), 1)
		},
		betObjFun() {
			this.betObj.betNum = 0
			this.betObj.times = 0
			this.betObj.money = 0.0
			this.betObj.minBonus = 0.00
			this.betObj.maxBonus = 0.00
			this.disable = true
		},
		xySelectedClick(){
		  if(this.$refs.xySelected.className=='icon-icon-29 iconfont xySelected'){
			this.$refs.xySelected.className = 'icon-icon-29 iconfont'
		  }else{
			this.$refs.xySelected.className = 'icon-icon-29 iconfont xySelected'
		  }
		},
		deleteList(c, s) {
			this.$store.state.matchSelectedList.forEach(item => {
				if(item.matchId == c) {
					this.$store.state.matchSelectedList.splice(s, 1)
				}
			});
			this.$store.state.matchObj.playList.forEach(data => {
				for(let i = 0; i < data.playList.length; i++) {
					if(data.playList[i].matchId == c) {
						if(this.$route.query.playType == '6') {
							this.$store.state.chushihuaObj.playList.forEach(kk => {
								for(let j = 0; j < kk.playList.length; j++) {
									if(kk.playList[j].matchId == c) {
										let obj = JSON.parse(JSON.stringify(kk.playList[j]))
										data.playList[i] = obj
									}
								}
							})
						} else {
							delete data.playList[i].myspf
						}
					}
				}
			});
			if(this.$route.query.playType == '6') {
				this.nonTouDate()
				if(this.$store.state.matchSelectedList.length > 1) {
					this.playt()
				} else if(this.$store.state.matchSelectedList.length == 1) {
					let cnum = 0,znum=0
					this.$store.state.matchSelectedList[0].selectedList.forEach((kk)=>{
						if(kk.playType=='0'){
							cnum++
						}else if(kk.playType=='1'){
							znum++
						}
					})
					if(cnum>0) {
						this.betObjFun()
					} else {
						if(znum>0){
							if(this.$store.state.matchSelectedList[0].matchPlays[1].single=='1'){
								this.playt()
							}else{
								this.betObjFun()
							}
						}else{
							this.playt()
						}
					}
				} else {
					this.betObjFun()
				}
			} else {
				for(let [key, value] of this.matchSelectObj) {
					if(key == c) {
						this.matchSelectObj.delete(key)
					}
				}
				_.forIn(this.$store.state.mark_playObj.bfIdSaveMap, (value, key) => {
					if(key == c) {
						_.unset(this.$store.state.mark_playObj.bfIdSaveMap,key)
					}
				});
				// for(let [key, value] of this.$store.state.mark_playObj.bfIdSaveMap) {
				// 	if(key == c) {
				// 		this.$store.state.mark_playObj.bfIdSaveMap.delete(key)
				// 	}
				// }
				this.nonTouDate()
				if(this.$store.state.matchSelectedList.length > 1) {
					this.playt()
				} else if(this.$store.state.matchSelectedList.length == 1) {
					if(this.$store.state.matchSelectedList[0].matchPlays[0].single != '1') {
						this.betObjFun()
					} else {
						this.playt()
					}
				} else {
					this.betObjFun()
				}
			}
		},
		datep(c) {
			return datefilter(Number(c * 1000), 3)
		},
		nonTouDate() {
			this.arrTime = []
			this.$store.state.matchSelectedList.forEach(item => {
				this.arrTime.push(item.betEndTime)
			})
			this.arrTime.sort((a, b) => {
				return a - b;
			})
			this.$store.dispatch("getArrTime",this.arrTime)
		},
		cshCz(n) {
			this.$store.state.matchSelectedList = []
			this.$store.state.matchObj.playList.forEach(item => {
				for(let i = 0; i < item.playList.length; i++) {
					delete item.playList[i].myspf
					for(let [key, value] of this.matchSelectObj) {
						if(key == item.playList[i].matchId) {
							item.playList[i].myspf = Array.from(value)
							this.$store.state.matchSelectedList.push(item.playList[i])
						}
					}
				}
			});
			this.nonTouDate()
			if(this.$store.state.matchSelectedList.length > 1) {
				Indicator.open()
				if(n.length > this.$store.state.matchSelectedList.length) {
					this.playt()
				} else {
					this.fetchData()
				}
			} else if(this.$store.state.matchSelectedList.length == 1) {
				if(this.$store.state.matchSelectedList[0].matchPlays[0].single != '1') {
					this.betObjFun()
				} else {
					this.playt()
				}
			} else {
				this.betObjFun()
			}
		},
		playt() {
			let arr = [],arr1 = [],arr2 = []
			this.$store.state.mark_playObj.playtList = []
			this.$store.state.mark_playObj.playutText = []
			this.$store.state.matchSelectedList.forEach(item => {
				arr.push(item.matchPlays[0].single)
				if(this.$route.query.playType != '6') {
					if(this.$route.query.playType == '3'||this.$route.query.playType == '5'){
						this.matchSelectObj.set(item.matchId, item.myspf)
					}else{
						this.matchSelectObj.set(item.matchId, new Set(item.myspf))
					}
				} else {
					item.selectedList.forEach((data)=>{
						arr1.push(data.single)
						arr2.push(data.playType)
					})
				}
			})
			//console.log(arr2)
			if(arr.length >= 1) {
				if(this.$route.query.playType == '6') {
					if(arr1.indexOf('0')==-1){
						for(let i = 1; i <= arr.length; i++) {
							if(arr2.indexOf('5')!=-1||arr2.indexOf('3')!=-1){
								if(i <= 4) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else if(arr2.indexOf('4')!=-1){
								if(i <= 6) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else{
								if(i <= 8) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}
						}
					}else{
						for(let i = 2; i <= arr.length; i++) {
							if(arr2.indexOf('5')!=-1||arr2.indexOf('3')!=-1){
								if(i <= 4) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else if(arr2.indexOf('4')!=-1){
								if(i <= 6) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else{
								if(i <= 8) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}
						}
					}
				} else {
					if(arr.indexOf('0') == -1) {
						for(let i = 1; i <= arr.length; i++) {
							if(this.$route.query.playType == '4'){
								if(i <= 6) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else if(this.$route.query.playType == '5'||this.$route.query.playType == '3'){
								if(i <= 4) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else{
								if(i <= 8) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}
						}
					} else {
						for(let i = 2; i <= arr.length; i++) {
							if(this.$route.query.playType == '4'){
								if(i <= 6) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else if(this.$route.query.playType == '5'||this.$route.query.playType == '3'){
								if(i <= 4) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else{
								if(i <= 8) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}
						}
					}
				}
			}
			this.$store.state.mark_playObj.playutText.push(this.$store.state.mark_playObj.playtList[this.$store.state.mark_playObj.playtList.length - 1])
		},
		idConfig(c) {
			if(c.target.parentElement.parentElement.parentElement.id != this.id) {
				this.arr = new Set()
				for(let [key, value] of this.matchSelectObj) {
					if(c.target.parentElement.parentElement.parentElement.id == key) {
						this.arr = value
					}
				}
				this.id = c.target.parentElement.parentElement.parentElement.id
			}
		},
		selectedClick(c, s) {
			let n = this.$store.state.matchSelectedList //初始化比赛条目
			this.idConfig(c)
			if(c.target.parentElement.className == 'cont_cur') {
				if(c.target.parentElement.children[2].innerText.indexOf('主') != -1) {
					this.arr.delete(3)
				} else if(c.target.parentElement.children[2].innerText.indexOf('平') != -1) {
					this.arr.delete(1)
				} else if(c.target.parentElement.children[2].innerText.indexOf('客') != -1) {
					this.arr.delete(0)
				} else {
					this.arr.delete('jqs:' + s.cellCode)
				}
				if(this.arr.size <= 0) {
					this.matchSelectObj.delete(c.target.parentElement.parentElement.parentElement.id)
				} else {
					this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.id, this.arr)
				}
			} else {
				if(c.target.parentElement.children[2].innerText.indexOf('主') != -1) {
					this.arr.add(3)
				} else if(c.target.parentElement.children[2].innerText.indexOf('平') != -1) {
					this.arr.add(1)
				} else if(c.target.parentElement.children[2].innerText.indexOf('客') != -1) {
					this.arr.add(0)
				} else {
					this.arr.add('jqs:' + s.cellCode)
				}
				this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.id, this.arr)
			}
			this.cshCz(n)
		},
		selectedTwoClick(c, s) {
			let n = this.$store.state.matchSelectedList //初始化比赛条目
			this.idConfig(c)
			if(c.target.parentElement.className == 'cont_cur') {
				c.target.parentElement.className = ''
				this.arr.delete(s)
				if(this.arr.size <= 0) {
					this.matchSelectObj.delete(c.target.parentElement.parentElement.parentElement.id)
				} else {
					this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.id, this.arr)
				}
			} else {
				c.target.parentElement.className = 'cont_cur'
				this.arr.add(s)
				this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.id, this.arr)
			}
			//console.log(this.matchSelectObj)
			this.cshCz(n)
		},
		cgClick() {
			this.$store.state.mark_playObj.mark_playBox = true
			this.$store.state.mark_playObj.mark_play = '1'
		},
		mupClick() {
			this.$store.state.mark_playObj.mark_playBox = true
			this.$store.state.mark_playObj.mark_play = '2'
		},
		fetchData(c) {
			this.matchBetPlays = []
			if(this.$store.state.mark_playObj.playtList.length<=0){
				this.betObjFun()
				setTimeout(()=>{
					Indicator.close()
				},100)
				return false;
			}
			this.$store.state.matchSelectedList.forEach(item => {
				let obj = {}
				obj.isDan = 0
				if(c == 'dan') {
					if(this.danNUm >= Number(this.$store.state.mark_playObj.playutText[0].split('&')[0] - 1)) {
						if(item.selectedDan == false) {
							item.isDan = true
						}
					} else {
						item.isDan = false
					}
				}
				if(c == 'watch') {
					if(this.$store.state.mark_playObj.playutText.indexOf('1&1')!=-1||this.$store.state.matchSelectedList.length == Number(this.$store.state.mark_playObj.playutText[this.$store.state.mark_playObj.playutText.length - 1].split('&')[0])) {
						item.isDan = true
					} else {
						item.isDan = false
					}
					item.selectedDan = false
				}
				if(!item.selectedDan) {
					obj.isDan = 0
				} else {
					obj.isDan = 1
				}
				obj.changci = item.changci
				obj.matchId = item.matchId
				obj.matchTime = item.matchTime
				obj.playCode = item.playCode
				obj.matchTeam = item.homeTeamName + 'VS' + item.visitingTeamName
				obj.lotteryClassifyId = this.$route.query.lottoyId
				obj.lotteryPlayClassifyId = this.$route.query.classlootoyId
				obj.changciId = item.changciId
				let matchBetCells = [],
					matchBetCellsObj = {}
				if(item.myspf) {
					let arr1 = [],arrTwo = []
					for(let i = 0; i < item.myspf.length; i++) {
						let obj1 = {},objtwo={}
						if(item.myspf[i] == 3) {
							obj1.cellName = item.matchPlays[0].homeCell.cellName
							obj1.cellCode = item.matchPlays[0].homeCell.cellCode
							obj1.cellOdds = item.matchPlays[0].homeCell.cellOdds
							obj1.cellSons = item.matchPlays[0].homeCell.cellSons
						} else if(item.myspf[i] == 1) {
							obj1.cellName = item.matchPlays[0].flatCell.cellName
							obj1.cellCode = item.matchPlays[0].flatCell.cellCode
							obj1.cellOdds = item.matchPlays[0].flatCell.cellOdds
							obj1.cellSons = item.matchPlays[0].flatCell.cellSons
						} else if(item.myspf[i] == 0) {
							obj1.cellName = item.matchPlays[0].visitingCell.cellName
							obj1.cellCode = item.matchPlays[0].visitingCell.cellCode
							obj1.cellOdds = item.matchPlays[0].visitingCell.cellOdds
							obj1.cellSons = item.matchPlays[0].visitingCell.cellSons
						} else {
							if(item.playType == '3') {
								let arrBf = [].concat(item.matchPlays[0].flatCell.cellSons, item.matchPlays[0].homeCell.cellSons, item.matchPlays[0].visitingCell.cellSons)
								arrBf.forEach(c => {
									if(c.cellName == item.myspf[i]) {
										obj1.cellName = c.cellName
										obj1.cellCode = c.cellCode
										obj1.cellOdds = c.cellOdds
										obj1.cellSons = c.cellSons
									}
								})
							}
							if(item.playType == '5') {
								for(let j = 0; j < item.matchPlays[0].matchCells.length; j++) {
									if(item.myspf[i] == item.matchPlays[0].matchCells[j].cellName) {
										obj1.cellName = item.matchPlays[0].matchCells[j].cellName
										obj1.cellCode = item.matchPlays[0].matchCells[j].cellCode
										obj1.cellOdds = item.matchPlays[0].matchCells[j].cellOdds
										obj1.cellSons = item.matchPlays[0].matchCells[j].cellSons
									}
								}
							} else if(item.playType == '4') {
								for(let j = 0; j < item.matchPlays[0].matchCells.length; j++) {
									if(item.myspf[i].split(':')[1] == item.matchPlays[0].matchCells[j].cellCode) {
										obj1.cellName = item.matchPlays[0].matchCells[j].cellName
										obj1.cellCode = item.matchPlays[0].matchCells[j].cellCode
										obj1.cellOdds = item.matchPlays[0].matchCells[j].cellOdds
										obj1.cellSons = item.matchPlays[0].matchCells[j].cellSons
									}
								}
							} else if(item.playType == '7') {
								if(item.myspf[i] == item.matchPlays[0].homeCell.cellName) {
									if(item.matchPlays[0].homeCell.cellCode=='30'){
										objtwo.playType = '2'
										obj1.cellCode = '0'
										obj1.cellName = '客胜'
									}
									else if(item.matchPlays[0].homeCell.cellCode=='31'){
										objtwo.playType = '2'
										obj1.cellCode = '3'
										obj1.cellName = '主胜'
									}
									else if(item.matchPlays[0].homeCell.cellCode=='32'){
										objtwo.playType = '1'
										obj1.cellCode = '3'
										obj1.cellName = '让球主胜'
									}
									else if(item.matchPlays[0].homeCell.cellCode=='33'){
										objtwo.playType = '1'
										obj1.cellCode = '0'
										obj1.cellName = '让球客胜'
									}
									// obj1.cellName = item.matchPlays[0].homeCell.cellName
									// obj1.cellCode = item.matchPlays[0].homeCell.cellCode
									obj1.cellOdds = item.matchPlays[0].homeCell.cellOdds
									obj1.cellSons = item.matchPlays[0].homeCell.cellSons
									// obj1.single = '0'
									// obj1.betCells = obj2
								} else if(item.myspf[i] == item.matchPlays[0].visitingCell.cellName) {
									if(item.matchPlays[0].visitingCell.cellCode=='30'){
										objtwo.playType = '2'
										obj1.cellCode = '0'
										obj1.cellName = '客胜'
									}else if(item.matchPlays[0].visitingCell.cellCode=='31'){
										objtwo.playType = '2'
										obj1.cellCode = '3'
										obj1.cellName = '主胜'
									}else if(item.matchPlays[0].visitingCell.cellCode=='32'){
										objtwo.playType = '1'
										obj1.cellCode = '3'
										obj1.cellName = '让球主胜'
									}else if(item.matchPlays[0].visitingCell.cellCode=='33'){
										objtwo.playType = '1'
										obj1.cellCode = '0'
										obj1.cellName = '让球客胜'
									}
									obj1.cellOdds = item.matchPlays[0].visitingCell.cellOdds
									obj1.cellSons = item.matchPlays[0].visitingCell.cellSons
									// obj1.single = '0'
									// obj1.betCells = obj2
								}
								objtwo.betCells = obj1
								objtwo.single = '0'
								objtwo.fixedOdds = item.matchPlays[0].fixedOdds
							}
						}
						arr1.push(obj1)
						arrTwo.push(objtwo)
					}
					if(this.$route.query.playType=='7'){
						matchBetCells = arrTwo
					}else{
						matchBetCellsObj.betCells = arr1
						matchBetCellsObj.playType = item.matchPlays[0].playType
						matchBetCellsObj.single = item.matchPlays[0].single
						matchBetCellsObj.fixedOdds = item.matchPlays[0].fixedOdds
						matchBetCells.push(matchBetCellsObj)
					}
				} else {
					//console.log(item.selectedList)
					matchBetCells = item.selectedList
				}
				obj.matchBetCells = matchBetCells
				this.matchBetPlays.push(obj)
			})
			
			let data = {
				'betType': this.$store.state.mark_playObj.playutText.join(',').replace(/&/g, ''),
				'bonusId': '',
				'lotteryClassifyId': this.$route.query.lottoyId,
				'lotteryPlayClassifyId': this.$route.query.classlootoyId,
				'times': this.$store.state.mark_playObj.mupNum,
				'playType': this.$route.query.playType=='7'?'6':this.$route.query.playType,
				'matchBetPlays': this.matchBetPlays
			};
			this.matchSave = data
			// console.log(JSON.stringify(data))
			api
				.getBetInfo(data)
				.then(res => {
					if(res.code == 0) {
						if(res.msg===''){
							if(res.data.maxLotteryMoney>20000||res.data.betNum>10000||res.data.betNum<0){
								this.maxButNum = true
								this.maxButNumMsg = res.msg
								Toast(res.msg)
							}else{
								this.maxButNum = false
							}
						}else{
							this.maxButNum = true
							this.maxButNumMsg = res.msg
							Toast(res.msg)
						}
						this.betObj = res.data
					}else{
						this.maxButNum = true
						this.maxButNumMsg = res.msg
					}
				})
		},
		danClick(c, s) {
			//console.log(c)
			if(s.target.id == 'isDan') {
				s.target.id = ''
				c.selectedDan = false
				this.danNUm--
			} else {
				s.target.id = 'isDan'
				c.selectedDan = true
				this.danNUm++
			}
			this.fetchData('dan')
		},
		saveGo() {
			if(this.$refs.xySelected.className == 'icon-icon-29 iconfont'){
				Toast('尊敬的用户,购彩需同意并接受《彩小秘投注服务协议》')
				return
			}else if(this.disable==true){
				Toast('请至少选择2场比赛')
				return
			}
			// else if(this.betObj.money<100){
			// 	Toast('最低投注100元!')
			// 	return
			// }
			else if(this.arrTime[0]*1000<new Date().getTime()){
				Toast('部分比赛投注截止')
				return
			}else if(this.maxButNum == true){
				Toast(this.maxButNumMsg)
				return
			}
			Indicator.open()
            api.nSaveBetInfo(this.matchSave)
                .then(res => {
                        // console.log(res)
                    if (res.code == 0) {
                        this.$router.push({
							path: '/freebuy/payment',
							query:{
								ptk: res.data
							}
						})
                    }
                })
		},
		bfClick(c) {
			this.$store.state.mark_playObj.mark_playBox = true
			if(this.$route.query.playType == '3') {
				this.$store.state.mark_playObj.mark_play = '4'
			} else if(this.$route.query.playType == '6') {
				this.$store.state.mark_playObj.mark_play = '6'
			} else {
				this.$store.state.mark_playObj.mark_play = '5'
			}
			this.$store.state.mark_playObj.bfmatchId = c
		},
		heSingle(c) {
			if(c>this.$store.state.matchSelectedList.length){
				this.nonTouDate()
				if(this.$store.state.matchSelectedList.length > 1) {
					this.playt()
				} else if(this.$store.state.matchSelectedList.length == 1) {
					let cnum = 0,znum=0
					this.$store.state.matchSelectedList[0].selectedList.forEach((kk)=>{
						if(kk.playType=='0'){
							cnum++
						}else if(kk.playType=='1'){
							znum++
						}
					})
					if(cnum>0) {
						this.betObjFun()
					} else {
						if(znum>0){
							if(this.$store.state.matchSelectedList[0].matchPlays[1].single=='1'){
								this.playt()
							}else{
								this.betObjFun()
							}
						}else{
							this.playt()
						}
					}
				} else {
					this.betObjFun()
				}
			}else{
				let arr1 = [],arr2 = []
					this.$store.state.matchSelectedList.forEach(item => {
						item.selectedList.forEach((data)=>{
							arr1.push(data.single)
							arr2.push(data.playType)
						})
				})
				if(this.$store.state.matchSelectedList.length > 1) {
					this.$store.state.mark_playObj.playtList = []
					if(arr1.indexOf('0')==-1){
						for(let i = 1; i <= this.$store.state.matchSelectedList.length; i++) {
							if(arr2.indexOf('5')!=-1||arr2.indexOf('3')!=-1){
								if(i <= 4) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else if(arr2.indexOf('4')!=-1){
								if(i <= 6) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else{
								if(i <= 8) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}
						}
						if(this.$store.state.mark_playObj.playtList.indexOf('1&1')==-1){
							this.$store.state.mark_playObj.playtList.unshift('1&1')
						}
						this.playt()
					}else{
						for(let i = 2; i <= this.$store.state.matchSelectedList.length; i++) {
							if(arr2.indexOf('5')!=-1||arr2.indexOf('3')!=-1){
								if(i <= 4) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else if(arr2.indexOf('4')!=-1){
								if(i <= 6) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}else{
								if(i <= 8) {
									this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
								}
							}
						}
						if(this.$store.state.mark_playObj.playtList.indexOf('1&1')!=-1){
							 deleteArray()
							 this.$store.state.mark_playObj.playtList.remove('1&1')
						}
						if(this.$store.state.mark_playObj.playutText.indexOf('1&1')==-1){
							if(arr2.indexOf('4')!=-1||arr2.indexOf('3')!=-1||arr2.indexOf('5')!=-1){
								this.playt()
							}else{
								this.fetchData()
							}
						}else{
							this.playt()
						}
					}
				} else if(this.$store.state.matchSelectedList.length == 1) {
					//console.log(this.$store.state.mark_playObj.playtList)
					if(arr1.indexOf('0')==-1){
						this.disable = false
						if(this.$store.state.mark_playObj.playtList.indexOf('1&1')==-1){
							this.$store.state.mark_playObj.playtList.push('1&1')
						}
						this.playt()
					}else{
						this.betObjFun()
					}
				}
			}
		}
	},
	mounted() {
		//console.log(this.$store.state.matchSelectedList)
		this.nonTouDate()
		this.playt()
	},
	computed: {
		status() {
			return this.$store.state.mark_playObj.playutText;
		},
		mupStatus() {
			return this.$store.state.mark_playObj.mupNum;
		},
		bfMap() {
			return this.$store.state.mark_playObj.bfIdSaveMapFlag;
		}
	},
	watch: {
		status(a, b) {
			this.fetchData('watch')
			for(let i = 0; i < this.$refs.isdan.length; i++) {
				this.$refs.isdan[i].id = ''
			}
			this.danNUm = 0
		},
		mupStatus(a, b) {
			this.fetchData()
		},
		bfMap(a, b) {
			if(this.$route.query.playType == '6') {
				let n = this.$store.state.matchSelectedList.length
				this.$store.state.matchSelectedList = []
				this.$store.state.matchObj.playList.forEach(item => {
					for(let i = 0; i < item.playList.length; i++) {
						if(item.playList[i].selectedNum > 0) {
							this.$store.state.matchSelectedList.push(item.playList[i])
						}
					}
				});
				this.heSingle(n)
			} else {
				let n = this.$store.state.matchSelectedList //初始化比赛条目
				this.matchSelectObj = new Map()
				_.forIn(this.$store.state.mark_playObj.bfIdSaveMap, (value, key) => {
					this.matchSelectObj.set(key,value)
				});
				// this.matchSelectObj = this.$store.state.mark_playObj.bfIdSaveMap
				// for (let [key, value] of this.matchSelectObj) {
				// 	this.matchSelectObj.set(key,Array.from(value))
				// }
				this.cshCz(n)
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		next()
		this.$store.state.mark_playObj.mark_playBox = false
		this.$store.state.mark_playObj.mark_play = ''
		localStorage.setItem('tab', true)
	}
}