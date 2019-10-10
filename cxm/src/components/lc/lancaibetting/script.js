import axios from "../../../fetch/api";
import {
  Toast,
  Indicator
} from 'mint-ui'
import datefilter from '@/util/datefilter'
import basket_mark from '@/components/public/mark/basket_playut/mix'
import basketsfc_mark from '@/components/public/mark/basket_playut/sfc'
import {
  mapState
} from 'vuex'
export default {
  name: 'lancaibetting',
  data() {
    return {
      matchSelectedList: [], //投注数据转成列表
      arrTime: [], //比赛截止时间处理
      playType: this.$route.query.pty,
      basketmarkShow: false, //展开更多
      sfcmarkShow: false,
      sfcObj: '',
      disable: false,
      betObj: {},
      isAllSingle: [], //是否全为单关
      playTypeList: [], //是否含有sfc
      danNUm: 0, //统计胆数量
      matchSave: {}, //投注信息保存
      num: 0 //串关数
    }
  },
  components: {
    'v-basket-mark': basket_mark,
    'v-basketsfc': basketsfc_mark
  },
  mounted() {
    Indicator.open()
    _.forIn(this.matchSelectObj, (value, key) => {
      this.matchSelectedList.push(value)
    });
    this.nonTouDate()
    this.cascade()
  },
  methods: {
    closeMark() { //收起弹窗
      this.basketmarkShow = false
      this.sfcmarkShow = false
    },
    betObjFun() { //初始化数据
      this.betObj.betNum = 0
      this.betObj.times = 0
      this.betObj.money = 0.0
      this.betObj.minBonus = 0.00
      this.betObj.maxBonus = 0.00
      this.disable = true
    },
    xySelectedClick() { //投注协议
      if (this.$refs.xySelected.className == 'icon-icon-29 iconfont xySelected') {
        this.$refs.xySelected.className = 'icon-icon-29 iconfont'
      } else {
        this.$refs.xySelected.className = 'icon-icon-29 iconfont xySelected'
      }
    },
    datePd(c) { //截止时间格式化
      return datefilter(Number(c * 1000), 3)
    },
    datePdone(c) { //单场时间格式化
      return datefilter(Number(c * 1000), 1)
    },
    nonTouDate() { //截止时间最小
      this.arrTime = []
      this.matchSelectedList.forEach(item => {
        this.arrTime.push(item.betEndTime)
      })
      this.arrTime.sort((a, b) => {
        return a - b;
      })
    },
    cascade() { //串关种类
      this.isAllSingle = [] //是否全为单关
      this.playTypeList = [] //玩法集合
      this.num = 0 //串关数
      this.$store.state.mark_playObj.playtList = []
      this.$store.state.mark_playObj.playutText = []
      this.matchSelectedList.forEach(item => {
        item.selectList.forEach(data => {
          this.isAllSingle.push(data.single)
          this.playTypeList.push(data.playType)
        })
        if (item.selectNum > 0) {
          this.num++
        }
      })
      if (this.isAllSingle.indexOf('0') == -1) { //比赛全为单关
        if (this.playTypeList.indexOf('3') != -1) { //比赛中含有sfc
          for (let i = 1; i <= this.num; i++) {
            if (i <= 4) {
              this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
            }
          }
        } else {
          for (let i = 1; i <= this.num; i++) {
            if (i <= 8) {
              this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
            }
          }
        }
      } else { //比赛不全为单关
        if (this.playTypeList.indexOf('3') != -1) { //比赛中含有sfc
          for (let i = 2; i <= this.num; i++) {
            if (i <= 4) {
              this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
            }
          }
        } else {
          for (let i = 2; i <= this.num; i++) {
            if (i <= 8) {
              this.$store.state.mark_playObj.playtList.push(i + '&' + 1)
            }
          }
        }
      }
      if (this.$store.state.mark_playObj.playtList.length <= 0) {
        this.betObjFun()
      } else {
        this.disable = false
        this.$store.state.mark_playObj.playutText.push(this.$store.state.mark_playObj.playtList[this.$store.state.mark_playObj.playtList.length - 1])
      }
    },
    cgClick() { //串关选择
      this.$store.state.mark_playObj.mark_playBox = true
      this.$store.state.mark_playObj.mark_play = '1'
    },
    kClick(c, s) { //客队点击
      this.concatInfo(c.visitingCell, s, c)
    },
    zClick(c, s) { //主队点击
      this.concatInfo(c.homeCell, s, c)
    },
    sfcBtn(c, s) { //shengfencha展开
      this.sfcmarkShow = true
      this.sfcObj = s
    },
    bfBtn(c, s) { //点击展开更多
      this.basketmarkShow = true
      let arr1 = ['1', '2', '4', '3'],
        arr2 = []
      arr1.forEach(item => {
        c.forEach(data => {
          if (item == data.playType) {
            arr2.push(data)
          }
        })
      })
      s.matchPlays = arr2
      this.moreObj = s
    },
    concatInfo(s, c, t, kg) { //拼装下单需要数据格式
      let arr = new Set(c.selectList),
        obj2 = {},
        status = t.playType,
        sig = t.single,
        fixodds = t.fixedOdds == '' ? '0' : t.fixedOdds,
        oddSelectNum = c.selectNum
      let obj = {},
        betCells = new Set()
      c.selectList.forEach(item => {
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
      obj.kz = t.kz
      if (s.isSelected == '1') {
        this.$set(s, 'isSelected', '0')
        c.selectNum--
        betCells.delete(JSON.stringify(obj))
      } else {
        this.$set(s, 'isSelected', '1')
        c.selectNum++
        betCells.add(JSON.stringify(obj))
      }
      obj2.betCells = []
      betCells.forEach(item => {
        obj2.betCells.push(JSON.parse(item))
      })
      obj2.playType = status
      obj2.single = sig
      obj2.fixedodds = fixodds
      if (c.selectList.length <= 0) {
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
              if (obj2.betCells.length > 0) {
                item.betCells = obj2.betCells
              } else {
                arr.delete(item)
              }
            }
          }
        })
      }
      c.selectList = Array.from(arr)
      if (kg != '0') {
        this.isSelectedTy(c, oddSelectNum)
      }
    },
    isSelectedTy(c, s) {
      let num = 0,
        arr = [],
        arr1 = []
      this.matchSelectedList.forEach(item => {
        item.selectList.forEach(data => {
          arr.push(data.single)
          arr1.push(data.playType)
        })
        if (item.selectNum > 0) {
          num++
        }
      })
      if (c.selectNum <= 0 || s == 0 || num == 1 || (num > 1 && arr.indexOf('0') == -1 && this.isAllSingle.indexOf('0') != -1) || (num > 1 && arr.indexOf('0') != -1 && this.isAllSingle.indexOf('0') == -1)|| (num > 1 && arr1.indexOf('3') != -1 && this.playTypeList.indexOf('3') == -1) || (num > 1 && arr1.indexOf('3') == -1 && this.playTypeList.indexOf('3') != -1)) { //当该场次所有取消选中，或者之前没有选中，或者只剩一场选中
        this.cascade()
      } else {
        if (!this.disable) {
          Indicator.open()
          this.fetchData()
        }
      }
    },
    deleteList(s, i) { //单项删除
      _.unset(this.matchSelectObj, s.changciId)
      this.matchSelectedList.splice(i, 1)
      this.nonTouDate() //重置时间
      this.cascade()
    },
    danClick(c, s) { //胆点击
      //console.log(c)
      Indicator.open()
      if (s.target.id == 'isDan') {
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
    async fetchData(c) { //请求数据
      let matchBetPlays = []
      this.matchSelectedList.forEach(item => {
        if (c == 'dan') { //处理胆操作
          if (this.danNUm >= Number(this.status[0].split('&')[0] - 1)) {
            if (item.selectedDan == false) {
              item.isDan = true
            }
          } else {
            item.isDan = false
          }
        }
        if (c == 'watch') { //更换玩法
          if (this.status.indexOf('1&1') != -1 || this.num == Number(this.status[this.status.length - 1].split('&')[0]) || item.selectNum <= 0) {
            item.isDan = true
          } else {
            item.isDan = false
          }
          item.selectedDan = false
        }
        if (item.selectNum > 0) {
          let obj = {}
          obj.isDan = 0
          if (!item.selectedDan) {
            obj.isDan = 0
          } else {
            obj.isDan = 1
          }
          //拼接接口数据
          obj.changci = item.changci
          obj.matchId = item.matchId ? item.matchId : '0'
          obj.matchTime = item.matchTime
          obj.playCode = item.playCode
          obj.matchTeam = item.homeTeamName + 'VS' + item.visitingTeamName
          obj.lotteryClassifyId = this.$route.query.lottoyId
          obj.lotteryPlayClassifyId = this.$route.query.classlootoyId
          obj.changciId = item.changciId
          obj.matchBetCells = item.selectList
          matchBetPlays.push(obj)
        }
      })
      let pam = {
        'betType': this.status.join(',').replace(/&/g, ''),
        'bonusId': '',
        'lotteryClassifyId': this.$route.query.lottoyId,
        'lotteryPlayClassifyId': this.$route.query.classlootoyId,
        'times': this.mupStatus,
        'playType': this.$route.query.pty,
        'matchBetPlays': matchBetPlays
      };
      this.matchSave = pam
      let {
        data
      } = await axios.getBasketBallBetInfo(pam);
      if (data.code == 0) {
        this.betObj = data.data
      }
    },
    mupClick() { //选择倍数
      this.$store.commit('MARKPLAY', '2')
      this.$store.commit('MARKPLAYBOX', true)
    },
    async saveGo() {
      if (this.$refs.xySelected.className == 'icon-icon-29 iconfont') {
        Toast('尊敬的用户,购彩需同意并接受《彩小秘投注服务协议》')
        return
      } else if (this.disable == true) {
        Toast('请至少选择2场比赛')
        return
      }
      Indicator.open()
      let {
        data
      } = await axios.saveBasketBallBetInfo(this.matchSave)
      if (data.code == 0) {
        this.$router.push({
          path: '/freebuy/payment',
          query: {
            ptk: data.data,
            ballName: 'basketBall',
          }
        })
      }
    },
  },
  computed: {
    ...mapState({
      matchSelectObj: state => state.lancaiData.selectedSaveInfo,
      mupStatus: state => state.mark_playObj.mupNum,
      status: state => state.mark_playObj.playutText
    })
  },
  watch: {
    status(a, b) {
      if (!this.disable) {
        Indicator.open()
        this.fetchData('watch')
      }
      this.$nextTick(() => {
        for (let i = 0; i < this.$refs.isdan.length; i++) {
          this.$refs.isdan[i].id = ''
        }
        this.danNUm = 0
      })
    },
    //倍数变化监听
    mupStatus(a, b) {
      Indicator.open()
      this.fetchData()
    }
  },
  destroyed() {
    this.$store.commit('MARKPLAYBOX', false)
    this.$store.commit('MARKPLAY', '')
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (to.path == '/touzhu/lctz') {
      localStorage.setItem('lfrm', 'lantz')
    }
  }
}
