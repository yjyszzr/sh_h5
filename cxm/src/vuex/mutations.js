import api from '../fetch/api'
import {
    Toast
} from 'mint-ui'
import router from '../router/index'
const mutations = {
    COSULTINIT(state, data){
        state.skeletion.consultInit = data
    },
    GETSMSCODE(state, data) {
        //获取验证码  
        api.SendSmsCode(data)
            .then(res => {
                //console.log(res)
                if (res.code == '0') {
                    state.smsCode.disabled = true
                    state.smsCode.timer = setInterval(() => {
                        state.smsCode.changeNumber--;
                        if (state.smsCode.changeNumber <= 0) {
                            state.smsCode.changeText = '重新获取验证码'
                            clearInterval(state.smsCode.timer)
                            state.smsCode.changeNumber = 60
                            state.smsCode.disabled = false
                        } else {
                            state.smsCode.changeText = '<b style="color: #ea5504;font-weight:400;">'+state.smsCode.changeNumber + 's</b>后重新获取'
                        }
                    }, 1000)
                    Toast(res.msg)
                }else if(res.code=='301010'){
                    router.push({
                        path: '/user/pwd'
                    })
                }
            })
    },
    RESET(state) {
        clearInterval(state.smsCode.timer)
        state.smsCode.disabled = false
        state.smsCode.changeNumber = 60
        state.smsCode.changeText = '获取短信验证码'
    },
    MATCHLIST(state, data) {
        data.hotPlayList.forEach(item => {
            item.selectedNum = 0
            item.selectedList = []
        });
        data.playList.forEach(item => {
            for (let i = 0; i < item.playList.length; i++) {
                item.playList[i].selectedNum = 0
                item.playList[i].selectedList = []
            }
        });
        state.chushihuaObj = JSON.parse(JSON.stringify(data))
        state.matchObj = data
    },
    RESULT(state, data) {
        state.resultList = data
    },
    FINDPHONE(state, data) {
        state.findphone = data
    },
    USERINFO(state, data) {
        state.userInfo = data
    },
    RECORDTAB(state, data) {
        state.recordTab = data
    },
    MARKDATEVAL(state, data) {
        state.mark_showObj.mark_dateVal = data
    },
    MARKSHOW(state, data) {
        state.mark_show = data
    },
    MARKRESET(state, data) {
        if (data == 0) {
            state.mark_Reset = data
        } else {
            state.mark_Reset++
        }
    },
    MARKSHOWTYPE(state, data) {
        state.mark_showObj.mark_show_type = data
    },
    LEAGUEIDS(state, data) {
        state.mark_showObj.leagueIds = data
    },
    LOTTERYRESULTTABLEINDEX(state, data) {
        state.mark_showObj.lotteryResultTableIndex = data
    },
    MATCHOBJ(state, data) {
        state.matchObj = data
    },
    MATCHSELECTEDLIST(state, data) {
        if (data == []) {
            state.matchSelectedList = []
        } else {
            state.matchSelectedList.push(data)
        }
    },
    FREEBUYID(state, data){
        state.freebuyId = data
    },
    MARKPLAYBOX(state, data) {
        state.mark_playObj.mark_playBox = data
    },
    MARKPLAY(state, data) {
        state.mark_playObj.mark_play = data
    },
    PLAYLIST(state, data) {
        state.mark_playObj.playtList = data
    },
    PLAYUTTEXT(state, data) {
        state.mark_playObj.playutText = data
    },
    MUPNUM(state, data) {
        state.mark_playObj.mupNum = data
    },
    YHLIST(state, data) {
        state.mark_playObj.yhList = data
    },
    MYBOUNSID(state, data) {
        state.mark_playObj.mybounsId = data
    },
    BFMATCHID(state, data) {
        state.mark_playObj.bfmatchId = data
    },
    BFIDSAVEMAP(state, data) {
        state.mark_playObj.bfIdSaveMap = data
    },
    BFIDSAVEMAPFLAG(state, data) {
        if (data == 0) {
            state.mark_playObj.bfIdSaveMapFlag = data
        } else {
            state.mark_playObj.bfIdSaveMapFlag++
        }
    },
    MATCHDETAILFLAG(state, data) {
        state.mark_playObj.matchDetailFlag = data
    },
    DELETEFLAG(state, data) {
        state.deleteFlag = data
    },
    ZXCOLLEXCTIONFLAG(state, data) {
        state.zxCollectionFlag = data
    },
    ZXDETAILOBJ(state, data) {
        state.zxDetailObj = data
        state.skeletion.consultInit = true
    },
    ARRTIME(state, data){
        state.arrTime = data
    },
    changeRecruitScrollY(state,recruitScrollY) {
        state.recruitScrollY = recruitScrollY
    },
    FINDTAB(state, data){
        state.findObj.findTab = data
    },
    FINACTIVE(state, data){
        state.findObj.findActive = data
    },
    XFBANKLIST(state, data){
        state.xfbanklist = data
    },
    XFBANKSELCTED(state, data){
        state.xfbankSelected = data
    },
    TIMESHOW(state, data){
        state.user_account.timeShow = data
    },
    //大乐透tab切换
    DALETOUACTIVE(state, data){
        state.daletouActive = data
    },
    RUNCHARTFILTER(state, data){
        switch(data.type){
            case '1': state.runchartfilter.compute = data.value;break;
            case '2': state.runchartfilter.count = data.value;break;
            case '3': state.runchartfilter.drop = data.value;break;
            case '4': state.runchartfilter.sort = data.value;break;
        }
    },
    USERACCOUNT(state, data){
        state.user_account.timeType = data
    },
    MARKSHORTCUT(state, data){
        state.mark_shortcut = data
    },
    RUNCHARTDATA(state, data){
        state.runchartData = data
    },
    CHANNELOBJ(state, data){
        state.channelObj = data
    }
}

export default mutations