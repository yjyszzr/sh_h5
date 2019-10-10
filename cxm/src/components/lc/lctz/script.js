import datefilter from '../../../util/datefilter'
import {
  MessageBox,
  Toast,
  Indicator
} from 'mint-ui';
import axios from '../../../fetch/api'
import {
  mapState
} from 'vuex'
import basket_mark from '../../public/mark/basket_playut/mix'
import basketsfc_mark from '../../public/mark/basket_playut/sfc'
export default {
  name: 'lancai',
  // //获取详情请求
  // async asyncData({store}){
  //   let pam = {
  //     leagueId: '',
  //     playType: store.state.lancaiData.playType
  //   }
  //   store.dispatch("getlancaiList", pam)
  // },
  data() {
    return {
      activeName: ['1', '2', '3', '4', '5', '6'], //默认展开前6个折叠
      leagueId: '', //赛事筛选默认全部
      flag: true, //控制确定按钮可不可以点击
      classFlag: true, //控制确定按钮颜色
      matchSelectObj: {}, //比赛选择信息保存
      text: '<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>', //初始化底部提示文本
      mapKey: [], //场次保存
      collapseShow: false, //头部默认不展开
      basketmarkShow: false, //展开更多
      sfcmarkShow: false,
      moreObj: {},//更多玩法展开数据保存
      sfcObj: {},  //胜分差展开数据保存
      playList: [ //头部展开信息
        {
          name: '胜负',
          id: '2'
        },
        {
          name: '让分胜负',
          id: '1'
        },
        {
          name: '胜分差',
          id: '3'
        },
        {
          name: '大小分',
          id: '4'
        },
        {
          name: '混合投注',
          id: '6'
        }
      ]
    }
  },
  components: {
    'v-basket-mark': basket_mark,
    'v-basketsfc': basketsfc_mark
  },
  methods: {
    sntTitle(c) {
      switch (Number(c)) { //头部title展示信息
        case 2:
          return "胜负";
        case 1:
          return "让分胜负";
        case 3:
          return "胜分差";
        case 4:
          return "大小分";
        case 6:
          return "混合投注";
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
    filter() { //筛选弹窗
      this.$store.dispatch("getMarkShow", true);
      this.$store.dispatch("getMarkShowType", "2");
    },
    goInToplay() { //跳转玩法帮助
      this.$router.push({
        path: "/touzhu/lcbz",
        replace: false
      });
    },
    stntab(c) { //切换玩法
      Indicator.open()
      this.$store.commit("MATCHLANCAILIST", {});
      this.clear_match()
      this.$store.dispatch("getLeagueIds", '')
      this.$store.commit('LANCAIDATA', {type:'play',value:c.id})
      this.fetchData()
      this.openOrclose()
    },
    //条件请求数据
    async fetchData(){
      let pam = {
        leagueId: this.leagueId,
        playType: this.playType
      }
      this.$store.dispatch("getlancaiList", pam)
    },
    activeNameNum(c) { //折叠控制展开第几个
      return Number(c + 1) + ''
    },
    datePd(c) {  //日期格式化
      return datefilter(Number(c * 1000), 1)
    },
    bfBtn(c,s){ //点击展开更多
      if(this.mapKey.length>=15&&s.selectNum<=0){
        Toast('最多选择15场比赛')
        return false;
      }
      this.basketmarkShow = true
      let arr1 = ['1','2','4','3'],arr2 = []
      arr1.forEach(item=>{
        c.forEach(data=>{
          if(item==data.playType){
            arr2.push(data)
          }
        })
      })
      s.matchPlays = arr2
      this.moreObj = s
    },
    sfcBtn(c,s){ //shengfencha展开
      if(this.mapKey.length>=15&&s.selectNum<=0){
        Toast('最多选择15场比赛')
        return false;
      }
      this.sfcmarkShow = true
      this.sfcObj = s
    },
    closeMark(){ //收起弹窗
      this.basketmarkShow = false
      this.sfcmarkShow = false
    },
    kClick(c,s){ //客队点击
      this.concatInfo(c.visitingCell, s ,c)
    },
    zClick(c,s){ //主队点击
      this.concatInfo(c.homeCell, s, c)
    },
    concatInfo(s, c ,t,kg){   //拼装下单需要数据格式
      let arr = new Set(c.selectList),
        obj2 = {},
        status = t.playType,
        sig = t.single,
        fixodds = t.fixedOdds==''?'0':t.fixedOdds
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
          this.$set(s,'isSelected','0')
          c.selectNum--
          betCells.delete(JSON.stringify(obj))
      } else {
          if(this.mapKey.length>=15&&c.selectNum<=0){
            Toast('最多选择15场比赛')
            return false;
          }
          this.$set(s,'isSelected','1')
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
      if(kg!='0'){
        this.isSelectedTy(c)
      }
    },
    isSelectedTy(s){ //投注选取数据处理
      if(s.selectNum>0){   
        if(this.mapKey.indexOf(s.changciId)==-1){
          this.mapKey.push(s.changciId)  //保存选取场次
        }
        _.set(this.matchSelectObj,s.changciId,s)
      }else{
        this.mapKey = _.difference(this.mapKey,[s.changciId])  //删除场次
        _.unset(this.matchSelectObj,s.changciId)
      }
      this.xiadanText(this.mapKey)
    },
    xiadanText(arr){  //底部文本处理
      if(_.size(this.matchSelectObj)==0){
        this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
        this.flag = true
        this.classFlag = true
      }else if(_.size(this.matchSelectObj)==1){
        let kg = false  //是否选一场单关开关
        _.forEachRight(this.matchSelectObj[arr[0]].matchPlays,item=>{  //从右往左循环
          if(item.playType==3){  //sfc
            item.visitingCell.cellSons.forEach(data=>{
              if(data.isSelected&&data.isSelected==1){
                kg = true
              }
            })
            item.homeCell.cellSons.forEach(data=>{
              if(data.isSelected&&data.isSelected==1){
                kg = true
              }
            })
          }else{  //其他玩法
            if(item.single==1){
              if((item.visitingCell&&item.visitingCell.isSelected&&item.visitingCell.isSelected==1)||(item.homeCell&&item.homeCell.isSelected&&item.homeCell.isSelected==1)){
                kg = true
              }
            }else{
              if((item.visitingCell&&item.visitingCell.isSelected&&item.visitingCell.isSelected==1)||(item.homeCell&&item.homeCell.isSelected&&item.homeCell.isSelected==1)){
                kg = false
              }
            }
          }
        })
        if(kg){
          this.text = `<p>已选<span style='color:#dc3c32;'>1场</span>单关比赛</p><p>可投注</p>`
          this.flag = false
          this.classFlag = false
        }else{
          this.text = `<p>已选择<span style='color:#dc3c32;'>1场</span>非单关比赛</p><p>还差<span style='color:#dc3c32;'>1场</span>比赛</p>`
          this.flag = true
          this.classFlag = true
        }
      }else{
        this.text = `<p>已选<span style='color:#dc3c32;'>${_.size(this.matchSelectObj)}场</span>比赛</p><p>可投注</p>`
        this.flag = false
        this.classFlag = false
      }
    },
    clear_matchClick(){  //清除按钮
      if(this.mapKey.length>0){
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.$store.commit('MATCHLANCAILIST',JSON.parse(JSON.stringify(this.chushihuaObj)))
          this.clear_match()
        }, cancel => {});
      }
    },
    clear_match(){
      this.matchSelectObj = {}
      this.mapKey = []
      this.text = `<p>请至少选择1场单关比赛</p><p>或者2场比赛</p>`
      this.flag = true
      this.classFlag = true
    },
    confirm(){ //确定按钮
      this.$store.commit('SELECTEDSAVEINFO',this.matchSelectObj)
      this.$router.push({
        path: '/touzhu/lancaibetting',
        query:{
          pty: this.playType,
          lottoyId: this.backetObj.lotteryClassifyId,
          classlootoyId: this.backetObj.lotteryPlayClassifyId
        }
      })
    }
  },
  computed: {
    ...mapState({
      playType: state => state.lancaiData.playType,
      backetObj: state => state.lancaiData.lancaiObj,
      chushihuaObj: state => state.lancaiData.chushihuaObj,
      mark_obj: state => state.mark_Reset,
      saveInfo: state => state.lancaiData.selectedSaveInfo
    })
  },
  watch: {
    mark_obj(a, b) {
      if (a > 0) {
        this.clear_match()
      }
    }
  },
  mounted(){
    if(localStorage.getItem('lfrm')!='lantz'){
      Indicator.open()
      this.fetchData()
    }else{
      _.forIn(this.saveInfo, (value, key) => {
        if(value.selectNum>0){
          this.matchSelectObj[key]=value
        }
      });
      this.$store.commit('MATCHLANCAILIST',JSON.parse(JSON.stringify(this.chushihuaObj)))
      this.backetObj.playList.forEach(item=>{
          for(let i = 0;i < item.playList.length;i ++){
            _.forIn(this.matchSelectObj, (value, key)=> {
              if(key==item.playList[i].changciId){
                this.$set(item.playList[i],'matchPlays',value.matchPlays)
                this.$set(item.playList[i],'selectList',value.selectList)
                this.$set(item.playList[i],'selectNum',value.selectNum)
                this.mapKey.push(item.playList[i].changciId)
              }
            });
          }
      })
      this.xiadanText(this.mapKey)
    }
  },
  destroyed() {
    //关闭筛选弹窗
    this.$store.commit('MARKSHOW',false)
    this.$store.commit('MARKSHOWTYPE','')
    this.$store.commit('MUPNUM','5') //重置倍数
    this.$store.commit('MARKPLAYBOX',false)
    this.$store.commit('MARKPLAY','')
    this.$store.commit('MARKRESET',0)
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (to.path != '/touzhu/lancaibetting') {
      //恢复筛选全部默认
      this.$store.dispatch("getLeagueIds", '')
    }
    localStorage.removeItem('lfrm')
  }
}
