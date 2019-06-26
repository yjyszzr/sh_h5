import Vue from 'vue'
import Vuex from 'vuex'
import {
    Toast
} from 'mint-ui'
import mutations from './mutations'
import actions from './action'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    skeletion: {
        consultInit: true,  //初始化骨架屏
    },
    freebuyId: '6',
    //验证码初始化
    smsCode: {
        changeNumber: 60,
        changeText: '获取短信验证码',
        disabled: false,
        timer: ''
    },
    findphone: '', //找回密码手机号
    userInfo: {}, //个人信息
    mark_show: false, //控制遮罩
    mark_Reset: 0, //重制赛事数据
    resultList: {}, //赛果列表
    arrTime: [], //赛事截止时间
    mark_showObj: { //赛果遮罩
        mark_show_type: 1, //遮罩显示类型
        mark_dateVal: '', //选中日期值
        leagueIds: '', //更多条件
        lotteryResultTableIndex:'0', //tableIndex
    },
    matchObj: {}, //赛事列表
    matchSelectedList: [], //选中赛事处理
    mark_playObj: { //控制上啦遮罩
        mark_playBox: false,
        mark_play: '',
        playtList: [], //玩法列表控制
        playutText: [], //串数
        mupNum: '5', //倍数
        yhList: [], //优惠券列表
        mybounsId: '', //默认优惠券id
        bfmatchId: '', //选中比分的id
        bfIdSaveMap: {}, //选取比分id，结果保存
        bfIdSaveMapFlag: 0,
        matchDetailFlag: true
    },
    recordTab: '', //个人中心子页导航
    chushihuaObj: {}, //初始化数据保存
    deleteFlag: false, //收藏删除开关
    zxCollectionFlag: '', //收藏按钮是否选中
    zxDetailObj: '', //资讯详情数据
    findObj:{
        findTab: [],   //发现顶部列表
        findActive: '1' //发现选中参数
    },
    xfbanklist: '',   //先锋银行卡列表
    xfbankSelected: {},   //选中的银行卡信息
    user_account: {
        timeType: 2,  //账户明细日期
        timeShow: false  //控制actionSheet开关
    },
    mark_shortcut: false, //首页引导弹窗
    pop: '',
    daletouActive: '1',  //大乐透tab
    runchartfilter: {    //走势图筛选条件
        compute: 1,   //是否计算统计
        count: 100,  //期数
        drop: 1,  //是否显示遗漏
        sort: 0    //排序方式
    },
    runchartData: {},  //走势图数据
    channelObj: {
        color: '#ea5504',
        channelNmae: '彩小秘'
    }
}
let storageArr = []
if (typeof localStorage === 'object') {
    try{
        storageArr = [createPersistedState({'key':'issue','paths':['userInfo','matchObj','matchSelectedList','freebuyId','mark_playObj.playtList','mark_playObj.playutText','mark_playObj.yhList','mark_playObj.mybounsId','mark_playObj.bfmatchId','mark_playObj.bfIdSaveMap','mark_playObj.bfIdSaveMapFlag','mark_playObj.matchDetailFlag','chushihuaObj','findObj','daletouActive'],storage: window.sessionStorage})]
    }catch(e){
        
    };
}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    plugins: storageArr
    //strict: true
})