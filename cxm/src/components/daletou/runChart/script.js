import api from '../../../fetch/api'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import {Indicator,Toast,MessageBox} from 'mint-ui'
import {getCombinationCount,saveDtInfo} from '../../../util/common'
export default {
    name: 'runchart',
    beforeCreate() {
        Indicator.open()
    },
    data(){
        return {
            runchartTab:[
                '开奖号码','红球走势','蓝球走势','红球冷热','蓝球冷热'
            ],
            h_nums:[],  //保存已选红球号码
            l_nums:[],  //保存已选蓝球号码
            h_scroll: '',  //红球滚动
            s_scroll: '',  //已选滚动
            posx: 0, //滚动横向距离
            posy: 0, //滚动纵向距离
            disabled: true,
            text: `请至少选择<span>5</span>个红球&nbsp;<span>2</span>个蓝球`,
            zhushu: '', //注数
            qsValue: '',
            ylValue: '',
            tjValue: '',
            pxValue: '',
            runsetflag: false,
            confirmObj:{
                count: '',
                compute: '',
                drop: '',
                sort: ''
            }
        }
    },
    created(){
        
    },
    methods:{
        // 头部返回
        goBack() {
            this.$router.go(-1);
        },
        fetchData(){
            let data={
                compute: this.runchartfilter.compute,
                count: this.runchartfilter.count,
                drop: this.runchartfilter.drop,
                sort: this.runchartfilter.sort
            }
            this.$store.dispatch("getRunchart",data).then(()=>{
                $('.box-content').scrollTop($('.box-content')[0].scrollHeight)
            })
        },
        tabClick(i){
            this.$store.commit('DALETOUACTIVE',i+1)
        },
        smjs(c){
            return c<10?'0'+c:c
        },
        hScroll(){
            this.$refs.tabcontent.style.width='30.45rem'
            this.$nextTick(()=>{
                this.h_scroll=new BScroll(this.$refs.tab, {
                    startX:0,
                    click:true,
                    scrollX:true,
                    scrollY:false,
                    eventPassthrough:'vertical'
                })
            })
        },
        sScroll(){
            this.$refs.stabcontent.style.width='10.44rem'
            this.$nextTick(()=>{
                this.s_scroll=new BScroll(this.$refs.stab, {
                    startX:0,
                    click:true,
                    scrollX:true,
                    scrollY:false,
                    eventPassthrough:'vertical'
                })
            })
        },
        fScroll(){
            this.$nextTick(()=>{
                // if(this.daletouActive==2){
                //     this.$refs.hqrctcontent.style.width='31.95rem'
                // }else if(this.daletouActive==3){
                //     this.$refs.hqrctcontent.style.width='11.95rem'
                // }
                document.querySelector('.hqr-content').onscroll=(pos)=>{
                    this.posx = Math.abs(pos.target.scrollLeft)
                    this.posy = Math.abs(pos.target.scrollTop)
                }
            })
        },
        tabsClick(c,s){
            if(c.target.className=='tab_item'){
                c.target.className='tab_item tab-active'
                if(s=='h'){
                    this.h_nums.push(c.target.innerText)
                }else{
                    this.l_nums.push(c.target.innerText)
                }
            }else{
                c.target.className='tab_item'
                if(s=='h'){
                    this.h_nums = _.difference(this.h_nums,[c.target.innerText]);
                }else{
                    this.l_nums = _.difference(this.l_nums,[c.target.innerText]);
                }
            }
            if(this.l_nums.length>=2&&this.h_nums.length>=5){
                this.disabled = false
                this.zhushu =  getCombinationCount(this.h_nums.length, 5) * getCombinationCount(this.l_nums.length, 2)
                this.text = `共计<span>${this.zhushu}</span>注&nbsp;合计<span style='color:#eb1c25;'>${this.zhushu*2}</span>元`
            }else{
                this.disabled = true
                this.text = `请至少选择<span>5</span>个红球&nbsp;<span>2</span>个蓝球`
            }
        },
        clearNums(){
            if(this.h_nums.length>0||this.l_nums.length>0){
                MessageBox.confirm('确定清空所选号码吗?', '温馨提示').then(action => {
                    $('.tab-active').removeClass('tab-active')
                    this.h_nums = []
                    this.l_nums = []
                    this.disabled = true
                    this.text = `请至少选择<span>5</span>个红球&nbsp;<span>2</span>个蓝球`
                }).catch(function () {
                   
                });
            }
        },
        confirmClick(){
            this.$store.commit('RUNCHARTFILTER',{type: '2',value: this.confirmObj.count})
            this.$store.commit('RUNCHARTFILTER',{type: '1',value: this.confirmObj.compute})
            this.$store.commit('RUNCHARTFILTER',{type: '3',value: this.confirmObj.drop})
            this.$store.commit('RUNCHARTFILTER',{type: '4',value: this.confirmObj.sort})
            this.runsetflag = false
            Indicator.open()
            this.fetchData()
        },
        goTouzhu(){
            if(this.h_nums.length>18){
                Toast('最多只能选择18个红球')
                return false;
            }
            if(this.zhushu*2>20000){
                Toast('单次投注最多2万元')
                return false;
            }
            Indicator.open()
            let obj={},list=[],msg={}
            this.h_nums.forEach(item => {
                let obj1={}
                obj1.num = item
                obj1.type = 'redBall'
                list.push(obj1)
            });
            this.l_nums.forEach(item => {
                let obj2={}
                obj2.num = item
                obj2.type = 'blueBall'
                list.push(obj2)
            });
            let danfn = '单式'
            if(this.l_nums.length+this.h_nums.length>7){
                danfn = '复式'
            }
            msg.danFn=danfn
            msg.bei=1
            msg.zhuNum=this.zhushu
            msg.money=this.zhushu*2
            msg.baseMoney=this.zhushu*2
            obj.msg = msg
            obj.ballType = 'biaozhun' 
            obj.ballList = list
            let saveobj = {
                betNum: this.zhushu,
                bonusId: '',
                isAppend: 0,
                times: 1,
                orderMoney: this.zhushu*2,
                betInfos: saveDtInfo(new Array(obj))
            }
            api.saveBetInfoDlt(saveobj)
            .then(res => {
                    if (res.code == 0) {
                        this.$router.push({
                            path: '/freebuy/payment',
                            query:{
                                ptk: res.data
                            }
                        })
                    }
            })
        }
    },
    computed: {
      ...mapState({
           daletouActive: state => state.daletouActive,
           runchartfilter: state => state.runchartfilter,
           runchartData: state => state.runchartData
      })
    },
    mounted(){
        this.fetchData()
        
    },
    watch:{
        posx(a,b){
            this.$refs.hqrtop.style.transform = 'translateX(-'+a+'px)'
        },
        posy(a,b){
            if(this.$refs.hqlist){
                this.$refs.hqlist.style.transform = 'translateY(-'+a+'px)'
            }
        },
        daletouActive(a,b){
            if(this.$refs.hqlist){
                this.$refs.hqrtop.style.transform = 'translateX(0px)'
                this.$refs.hqlist.style.transform = 'translateY(0px)'
                document.querySelector('.hqr-content').scrollTop = 0
                document.querySelector('.hqr-content').scrollLeft = 0
            }
        },
        qsValue(a,b){
            this.confirmObj.count = parseInt(_.trim(a,'期'))
        },
        ylValue(a,b){
            if(a=='显示遗漏'){
                this.confirmObj.drop = 1
            }else{
                this.confirmObj.drop = 0
            }
        },
        tjValue(a,b){
            if(a=='显示统计'){
                this.confirmObj.compute = 1
            }else{
                this.confirmObj.compute = 0
            }
        },
        pxValue(a,b){
            if(a=='倒序排列'){
                this.confirmObj.sort = 1
            }else{
                this.confirmObj.sort = 0
            }
        },
        runsetflag(a,b){
            this.qsValue = this.runchartfilter.count+'期'
            if(this.runchartfilter.compute=='1'){
                this.tjValue = '显示统计'
            }else{
                this.tjValue = '隐藏统计'
            }
            if(this.runchartfilter.drop=='1'){
                this.ylValue = '显示遗漏'
            }else{
                this.ylValue = '隐藏遗漏'
            }
            if(this.runchartfilter.sort=='1'){
                this.pxValue = '倒序排列'
            }else{
                this.pxValue = '正序排列'
            }
        }
    },
    beforeUpdate(){ 
        if(this.daletouActive!=1){
            if(this.h_scroll===''){
                this.hScroll()
            }
            if(this.s_scroll===''){
                this.sScroll() 
            }
        }
        if(this.daletouActive==2||this.daletouActive==3){
            this.fScroll()
        }
    }
}