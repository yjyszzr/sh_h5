import api from '../../../fetch/api'
import datefilter from '../../../util/datefilter'
import {
  MessageBox
} from 'mint-ui';
import {
  Toast
} from 'mint-ui'
import {
  Indicator
} from 'mint-ui'
export default {
  name: 'singleNote',
  data() {
    return {
      activeName: ['1', '2', '3', '4', '5', '6'],
      matchObj: {},
      flag: true,
      classFlag: true,
      matchSelectObj: new Map(),
      text: '<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>',
      id: '',
      arr: new Set(),
      mapKey: [],
      arrNum: 0,
      collapseShow: false,
      playList:[
        {
          name: '混合投注',
          id: '6'
        },
        {
          name: '胜平负',
          id: '2'
        },
        {
          name: '让球胜平负',
          id: '1'
        },
        {
          name: '总进球',
          id: '4'
        },
        {
          name: '半全场',
          id: '5'
        },
        {
          name: '比分',
          id: '3'
        },
        {
          name: '2选1',
          id: '7'
        }
      ]
    }
  },
  beforeCreate() {
    if (!localStorage.getItem('tab')) {
      Indicator.open()
    }
  },
  components: {

  },
  methods: {
      sntTitle(c){
        switch(Number(c)){
          case 2: return "胜平负";
          case 1: return "让球胜平负";
          case 4: return "总进球";
          case 5: return "半全场";
          case 3: return "比分";
          case 7: return "2选1";
          case 6: return "混合投注";
        }
      },
      // 头部返回
      goBack() {
        this.$store.dispatch("getmatchSelectedList", []);
        this.$router.go(-1);
      },
      //是否展开
      openOrclose(event) {
        if ($('#downImg').hasClass('rotate')) {
            $('#downImg').removeClass('rotate')
        } else {
            $('#downImg').addClass('rotate')
        }
        this.collapseShow = !this.collapseShow
      },
      filter() {
          this.$store.dispatch("getMarkShow", true);
          this.$store.dispatch("getMarkShowType", "2");
      },
      goInToplay() {
          this.$router.push({
              path: "/freebuy/inToplay",
              replace: false
          });
      },
      stntab(c){
        Indicator.open()
        this.$store.state.matchObj = {};
        this.$store.state.mark_playObj.bfIdSaveMapFlag = 0;
        this.$store.state.mark_playObj.bfIdSaveMap = {};
        this.clear_match()
        this.$store.commit('FREEBUYID',c.id)
        this.fetchData()
        this.openOrclose()
      },
      halt(){
          MessageBox.alert('', {
              message: '因出票限制，暂停销售',
              title: '停售原因',
              confirmButtonText: '我知道了',
              closeOnClickModal: false
          }).then(action => {

          });
      },
    fetchData() {
      let data = {
        'leagueId': this.leagueId,
        'playType': this.playType
      }
      this.$store.dispatch("getMatchList", data)
    },
    datePd(c) {
      return datefilter(Number(c * 1000), 1)
    },
    activeNameNum(c) {
      return Number(c + 1) + ''
    },
    bfBtn(c) {
      if (this.playType == '6') {
        if (c.selectedList.length > 0) {
          if (this.arrNum > 15) {
            Toast('最多选择15场比赛')
            return false;
          }
        } else {
          if (this.arrNum >= 15) {
            Toast('最多选择15场比赛')
            return false;
          }
        }
      } else {
        if (this.matchSelectObj.has(c.matchId)) {
          if (this.matchSelectObj.size > 15) {
            Toast('最多选择15场比赛')
            return false;
          }
        } else {
          if (this.matchSelectObj.size >= 15) {
            Toast('最多选择15场比赛')
            return false;
          }
        }
      }
      this.$store.state.mark_playObj.mark_playBox = true
      if (this.playType == '3') {
        this.$store.state.mark_playObj.mark_play = '4'
      } else if (this.playType == '5') {
        this.$store.state.mark_playObj.mark_play = '5'
      } else if (this.playType == '6') {
        this.$store.state.mark_playObj.mark_play = '6'
      }
      this.$store.state.mark_playObj.bfmatchId = c.matchId
    },
    confirm_disable() {
      if (this.matchSelectObj.size == 1) {
        let classDom = document.getElementsByClassName('selected')
        if (classDom[0].parentElement.parentElement.parentElement.className == 'single') {
          this.text = `<p>已选<span style='color:#ea5504;'>1场</span>单关比赛</p><p>可投注</p>`
          this.flag = false
          this.classFlag = false
        } else {
          this.text = `<p>已选择<span style='color:#ea5504;'>1场</span>非单关比赛</p><p>还差<span style='color:#ea5504;'>1场</span>比赛</p>`
          this.flag = true
          this.classFlag = true
        }
      } else if (this.matchSelectObj.size == 0) {
        this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
        this.flag = true
        this.classFlag = true
      } else {
        this.text = `<p>已选<span style='color:#ea5504;'>${this.matchSelectObj.size}场</span>比赛</p><p>可投注</p>`
        this.flag = false
        this.classFlag = false
      }
    },
    confirm_bf() {
      if (this.matchSelectObj.size >= 1) {
        this.text = `<p>已选<span style='color:#ea5504;'>${this.matchSelectObj.size}场</span>比赛</p><p>可投注</p>`
        this.flag = false
        this.classFlag = false
      } else {
        this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
        this.flag = true
        this.classFlag = true
      }
    },
    confirm_mix() {
      this.arrNum = 0;
      let obj = {};
      this.$store.state.matchObj.playList.forEach(item => {
        for (let i = 0; i < item.playList.length; i++) {
          if (item.playList[i].selectedNum && item.playList[i].selectedNum > 0) {
            this.arrNum++
              obj = item.playList[i]
          }
        }
      });
      if (this.arrNum > 1) {
        this.text = `<p>已选<span style='color:#ea5504;'>${this.arrNum}场</span>比赛</p><p>可投注</p>`
        this.flag = false
        this.classFlag = false
      } else if (this.arrNum == 1) {
        if (obj.matchPlays[1].single == '1') {
          if (obj.matchPlays[0].homeCell.isSelected || obj.matchPlays[0].flatCell.isSelected || obj.matchPlays[0].visitingCell.isSelected) {
            this.text = `<p>已选择<span style='color:#ea5504;'>1场</span>非单关比赛</p><p>还差<span style='color:#ea5504;'>1场</span>比赛</p>`
            this.flag = true
            this.classFlag = true
          } else {
            this.text = `<p>已选<span style='color:#ea5504;'>1场</span>单关比赛</p><p>可投注</p>`
            this.flag = false
            this.classFlag = false
          }
        }else if (obj.matchPlays[0].single == '1') {
          if (obj.matchPlays[1].homeCell.isSelected || obj.matchPlays[1].flatCell.isSelected || obj.matchPlays[1].visitingCell.isSelected) {
            this.text = `<p>已选择<span style='color:#ea5504;'>1场</span>非单关比赛</p><p>还差<span style='color:#ea5504;'>1场</span>比赛</p>`
            this.flag = true
            this.classFlag = true
          } else {
            this.text = `<p>已选<span style='color:#ea5504;'>1场</span>单关比赛</p><p>可投注</p>`
            this.flag = false
            this.classFlag = false
          }
        }else {
          this.text = `<p>已选择<span style='color:#ea5504;'>1场</span>非单关比赛</p><p>还差<span style='color:#ea5504;'>1场</span>比赛</p>`
          this.flag = true
          this.classFlag = true
        }
      } else {
        this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
        this.flag = true
        this.classFlag = true
      }
    },
    idConfig(c) {
      if (c.target.parentElement.parentElement.parentElement.parentElement.id != this.id) {
        this.arr = new Set()
        for (let [key, value] of this.matchSelectObj) {
          if (c.target.parentElement.parentElement.parentElement.parentElement.id == key) {
            this.arr = value
          }
        }
        this.id = c.target.parentElement.parentElement.parentElement.parentElement.id
      }
    },
    selectedClick(c, s) {
      this.idConfig(c)
      if (this.matchSelectObj.has(this.id)) {
        if (this.matchSelectObj.size > 15) {
          Toast('最多选择15场比赛')
          return false;
        }
      } else {
        if (this.matchSelectObj.size >= 15) {
          Toast('最多选择15场比赛')
          return false;
        }
      }
      // console.log(this.matchSelectObj.size)
      if (c.target.parentElement.className == 'selected') {
        c.target.parentElement.className = ''
        if (c.target.parentElement.children[2].innerText.indexOf('主') != -1) {
          this.arr.delete(3)
        } else if (c.target.parentElement.children[2].innerText.indexOf('平') != -1) {
          this.arr.delete(1)
        } else if (c.target.parentElement.children[2].innerText.indexOf('客') != -1) {
          this.arr.delete(0)
        } else {
          this.arr.delete('jqs:' + s.cellCode)
        }
        if (this.arr.size <= 0) {
          this.matchSelectObj.delete(c.target.parentElement.parentElement.parentElement.parentElement.id)
        } else {
          this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.parentElement.id, this.arr)
        }
      } else {
        c.target.parentElement.className = 'selected'
        if (c.target.parentElement.children[2].innerText.indexOf('主') != -1) {
          this.arr.add(3)
        } else if (c.target.parentElement.children[2].innerText.indexOf('平') != -1) {
          this.arr.add(1)
        } else if (c.target.parentElement.children[2].innerText.indexOf('客') != -1) {
          this.arr.add(0)
        } else {
          this.arr.add('jqs:' + s.cellCode)
        }
        this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.parentElement.id, this.arr)
      }
      this.confirm_disable()
    },
    selectedTwoClick(c, s) {
      this.idConfig(c)
      if (this.matchSelectObj.has(this.id)) {
        if (this.matchSelectObj.size > 15) {
          Toast('最多选择15场比赛')
          return false;
        }
      } else {
        if (this.matchSelectObj.size >= 15) {
          Toast('最多选择15场比赛')
          return false;
        }
      }
      if (c.target.parentElement.className == 'selected') {
        c.target.parentElement.className = ''
        this.arr.delete(s)
        if (this.arr.size <= 0) {
          this.matchSelectObj.delete(c.target.parentElement.parentElement.parentElement.parentElement.id)
        } else {
          this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.parentElement.id, this.arr)
        }
      } else {
        c.target.parentElement.className = 'selected'
        this.arr.add(s)
        this.matchSelectObj.set(c.target.parentElement.parentElement.parentElement.parentElement.id, this.arr)
      }
      //console.log(this.matchSelectObj)
      this.confirm_disable()
    },
    //混合过关逻辑
    isSelectedTy(s, c, status,sig,fixodds) {
      let arr = new Set(c.selectedList),
        obj2 = {}
      let obj = {},
        betCells = new Set()
      c.selectedList.forEach(item => {
        if (item.playType == status) {
          item.betCells.forEach(data => {
            betCells.add(JSON.stringify(data))
          })
        }
      })
      if (c.selectedList.length > 0) {
        if (this.arrNum > 15) {
          Toast('最多选择15场比赛')
          return false;
        }
      } else {
        if (this.arrNum >= 15) {
          Toast('最多选择15场比赛')
          return false;
        }
      }
      obj.cellCode = s.cellCode
      obj.cellName = s.cellName
      obj.cellOdds = s.cellOdds
      obj.cellSons = s.cellSons
      // console.log(c)
      this.$store.state.mark_playObj.bfIdSaveMapFlag++
        if (s.isSelected == 'sld') {
          s.isSelected = false
          c.selectedNum--
            betCells.delete(JSON.stringify(obj))
        } else {
          s.isSelected = 'sld'
          c.selectedNum++
            betCells.add(JSON.stringify(obj))
          //betCells.delete(obj)
        }
      obj2.betCells = []
      betCells.forEach(item => {
        obj2.betCells.push(JSON.parse(item))
      })
      obj2.playType = status
      obj2.single = sig
      obj2.fixedodds = fixodds
      if (status == '2') {
        obj2.single = c.matchPlays[1].single
      } else if (status == '1') {
        obj2.single = c.matchPlays[0].single
      }
      if (c.selectedList.length <= 0) {
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
      c.selectedList = Array.from(arr)
    },
    unSelectedClickspf(c, s) {
      if (c.target.innerText.split(' ')[0] == s.matchPlays[1].homeCell.cellName) {
        this.isSelectedTy(s.matchPlays[1].homeCell, s, '2',s.matchPlays[1].single,s.matchPlays[1].fixedOdds)
      } else if (c.target.innerText.split(' ')[0] == s.matchPlays[1].flatCell.cellName) {
        this.isSelectedTy(s.matchPlays[1].flatCell, s, '2',s.matchPlays[1].single,s.matchPlays[1].fixedOdds)
      } else if (c.target.innerText.split(' ')[0] == s.matchPlays[1].visitingCell.cellName) {
        this.isSelectedTy(s.matchPlays[1].visitingCell, s, '2',s.matchPlays[1].single,s.matchPlays[1].fixedOdds)
      }
    },
    unSelectedClickrq(c, s) {
      if (c.target.innerText.split(' ')[0] == s.matchPlays[0].homeCell.cellName) {
        this.isSelectedTy(s.matchPlays[0].homeCell, s, '1',s.matchPlays[0].single,s.matchPlays[0].fixedOdds)
      } else if (c.target.innerText.split(' ')[0] == s.matchPlays[0].flatCell.cellName) {
        this.isSelectedTy(s.matchPlays[0].flatCell, s, '1',s.matchPlays[0].single,s.matchPlays[0].fixedOdds)
      } else if (c.target.innerText.split(' ')[0] == s.matchPlays[0].visitingCell.cellName) {
        this.isSelectedTy(s.matchPlays[0].visitingCell, s, '1',s.matchPlays[0].single,s.matchPlays[0].fixedOdds)
      }
    },
    clear_matchClick() {
      MessageBox.confirm('确定执行此操作?').then(action => {
        this.clear_match()
      }, cancel => {});
    },
    //清除
    clear_match() {

      if (this.playType == '6') {
        this.$store.state.matchObj = JSON.parse(JSON.stringify(this.$store.state.chushihuaObj))
      } else {
        this.matchSelectObj.clear()
        this.id = ''
        this.$store.state.mark_playObj.bfIdSaveMap = {}
        this.mapKey = []
      }
      this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
      this.flag = true
      this.classFlag = true
      this.arrNum = 0
      $('.selected').removeClass('selected')

      //console.log(this.$store.state.chushihuaObj)

    },
    confirm() {
      if (this.playType == '6') {
        this.$store.state.matchSelectedList = []
        this.$store.state.matchObj.playList.forEach(item => {
          for (let i = 0; i < item.playList.length; i++) {
            if (item.playList[i].selectedNum > 0) {
              this.$store.state.matchSelectedList.push(item.playList[i])
            }
          }
        });
      } else {
        this.$store.state.matchSelectedList = []
        this.$store.state.matchObj.playList.forEach(item => {
          for (let i = 0; i < item.playList.length; i++) {
            delete item.playList[i].myspf
            for (let [key, value] of this.matchSelectObj) {
              if (key == item.playList[i].matchId) {
                item.playList[i].myspf = Array.from(value)
                this.$store.state.matchSelectedList.push(item.playList[i])
              }
            }
          }
        });
      }
      //alert(this.$store.state.matchSelectedList)
      //console.log(this.$store.state.matchObj)
      this.$router.push({
        path: '/freebuy/cathectic',
        query: {
          playType: this.playType,
          lottoyId: this.$store.state.matchObj.lotteryClassifyId,
          classlootoyId: this.$store.state.matchObj.lotteryPlayClassifyId
        },
        replace: false
      })
    },
    matchDetail(c, s) {
      if (s.target.parentElement.children[4].lastChild.className == '') {
        s.target.parentElement.children[4].lastChild.className = 'rotate'
      } else {
        s.target.parentElement.children[4].lastChild.className = ''
      }
      this.$store.state.mark_playObj.mark_playBox = true
      this.$store.state.mark_playObj.mark_play = '7'
      this.$store.dispatch("getBfMatchId", c)
    }
  },
  computed: {
    status() {
      return this.$store.state.mark_playObj.bfIdSaveMapFlag;
    },
    mark_obj() {
      return this.$store.state.mark_Reset;
    },
    matchDetailMark() {
      return this.$store.state.mark_playObj.matchDetailFlag;
    },
    playType(){
      return this.$store.state.freebuyId;
    },
    leagueId(){
      return this.$store.state.mark_showObj.leagueIds;
    },
  },
  watch: {
    status(a, b) {
      //console.log(this.$store.state.mark_playObj.bfIdSaveMap)
      if (this.playType == '6') {
        this.confirm_mix()
      } else {
        this.mapKey = []
        this.matchSelectObj = new Map()
        _.forIn(this.$store.state.mark_playObj.bfIdSaveMap, (value, key) => {
          this.mapKey.push(key)
          this.matchSelectObj.set(key, value)
        });
        // for (let [key, value] of this.matchSelectObj) {
        //   this.mapKey.push(key)
        //   this.matchSelectObj.set(key, Array.from(value))
        // }
        //console.log(this.matchSelectObj)
        this.confirm_bf()
      }
      //console.log(this.$store.state.mark_playObj.bfIdSaveMap)
      // this.confirm_disable()
    },
    mark_obj(a, b) {
      if (a > 0) {
        this.clear_match()
      }
    },
    matchDetailMark(a, b) {
      $('.rotate').removeClass('rotate')
    }
  },
  mounted() {
    if (!localStorage.getItem('tab')) {
      this.fetchData()
    } else {
      if (this.playType == '3' || this.playType == '5') {
        this.matchSelectObj = new Map()
        _.forIn(this.$store.state.mark_playObj.bfIdSaveMap, (value, key) => {
          this.mapKey.push(key)
          this.matchSelectObj.set(key,value)
        });
        // for (let [key, value] of this.matchSelectObj) {
        //   this.mapKey.push(key)
        // }
        this.confirm_bf()
      } else if (this.playType == '6') {
        this.$store.state.mark_playObj.bfIdSaveMapFlag++
          this.confirm_mix()
      } else {
        this.$store.state.matchSelectedList.forEach(item => {
          this.matchSelectObj.set(item.matchId, new Set(item.myspf))
        })
        if (this.$store.state.matchSelectedList.length == 0) {
          this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
          this.flag = true
          this.classFlag = true
        } else if (this.$store.state.matchSelectedList.length == 1) {
          let classDom = document.getElementsByClassName('selected')
          if (classDom[0].parentElement.parentElement.parentElement.className == 'single') {
            this.text = `<p>已选<span style='color:#ea5504;'>1场</span>单关比赛</p><p>可投注</p>`
            this.flag = false
            this.classFlag = false
          } else {
            this.text = `<p>已选择<span style='color:#ea5504;'>1场</span>非单关比赛</p><p>还差<span style='color:#ea5504;'>1场</span>比赛</p>`
            this.flag = true
            this.classFlag = true
          }
        } else if (this.$store.state.matchSelectedList.length > 1) {
          this.text = `<p>已选<span style='color:#ea5504;'>${this.$store.state.matchSelectedList.length}场</span>比赛</p><p>可投注</p>`
          this.flag = false
          this.classFlag = false
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == '/user/order') {
      next(vm => {
        vm.$store.state.mark_Reset++
      })
    } else {
      next()
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
    this.$store.state.mark_playObj.mark_playBox = false
    this.$store.state.mark_Reset = 0
    this.$store.state.mark_playObj.mark_play = ''
    this.$store.state.mark_show = false
    this.$store.state.mark_playObj.bfIdSaveMapFlag = 0
    this.$store.state.mark_showObj.mark_show_type = ''
    this.$store.state.mark_playObj.mupNum = '5'
    if(to.path!='/freebuy/cathectic'){
      this.$store.dispatch("getLeagueIds",'')
    }
    localStorage.removeItem('tab')
  }
}