import api from '../fetch/api'
import {
    Toast
} from 'mint-ui'
const actions = {
    getSmsCode({
                   commit
               }, value) {
        commit("GETSMSCODE", value);
    },
    reset({
              commit
          }) {
        commit("RESET");
    },
    getMatchList({
                     commit
                 }, value) {
        api.getMatchList(value)
            .then(res => {
                if (res.code == 0) {
                    let obj = {}
                    if(res.data.hotPlayList.length>0){
                        obj.playList = [].concat(res.data.hotPlayList)
                        res.data.playList.unshift(obj) 
                    }
                    commit("MATCHLIST", res.data);
                }
            })
    },
    getResultList({//赛事
                      commit
                  }, value) {
        api.queryMatchResult(value)
            .then(res => {
                if (res.code == 0) {
                    commit("RESULT", res.data);
                }
            })
    },
    changeFindphone({
                        commit
                    }, value) {
        commit("FINDPHONE", value);
    },
    changeUserInfo({
                       commit
                   }, value) {
        commit("USERINFO", value);
    },
    changeRecordTab({
                        commit
                    }, value) {
        commit("RECORDTAB", value);
    },
    changeTimeType({
            commit
        }, value) {
    commit("USERACCOUNT", value);
    },
    getMarkDateVal({
                       commit
                   }, value) {
        commit("MARKDATEVAL", value);
    },
    getMarkShow({
                    commit
                }, value) {
        commit("MARKSHOW", value);
    },
    getMarkReset({
                     commit
                 }, value) {
        commit("MARKRESET", value);
    },
    getMarkShowType({
                        commit
                    }, value) {
        commit("MARKSHOWTYPE", value);
    },
    getLeagueIds({
                     commit
                 }, value) {
        commit("LEAGUEIDS", value);
    },
    getmatchobj({
                    commit
                }, value) {
        commit("MATCHOBJ", value);
    },
    getmatchSelectedList({
                             commit
                         }, value) {
        commit("MATCHSELECTEDLIST", value);
    },
    getMarkplayBox({
                       commit
                   }, value) {
        commit("MARKPLAYBOX", value);
    },
    getMarkplay({
                    commit
                }, value) {
        commit("MARKPLAY", value);
    },
    getPlayList({
                    commit
                }, value) {
        commit("PLAYLIST", value);
    },
    getPlayuText({
                     commit
                 }, value) {
        commit("PLAYUTTEXT", value);
    },
    changeMupNum({
                     commit
                 }, value) {
        commit("MUPNUM", value);
    },
    changeYhList({
                     commit
                 }, value) {
        commit("YHLIST", value);
    },
    getMyBounsId({
                     commit
                 }, value) {
        commit("MYBOUNSID", value);
    },
    getBfMatchId({
                     commit
                 }, value) {
        commit("BFMATCHID", value);
    },
    getBfIdSaveMap({
                       commit
                   }, value) {
        commit("BFIDSAVEMAP", value);
    },
    getBfIdSaveMapFlag({
                           commit
                       }, value) {
        commit("BFIDSAVEMAPFLAG", value);
    },
    getMatchDetailFlag({
                           commit
                       }, value) {
        commit("MATCHDETAILFLAG", value);
    },
    deleteMyFlag({
                     commit
                 }, value) {
        commit("DELETEFLAG", value);
    },
    getCollectionFlag({
                          commit
                      }, value) {
        commit("ZXCOLLEXCTIONFLAG", value)
    },
    getDetailObj({
                     commit
                 }, value) {
        api.articleDetail(value)
            .then(res => {
                if (res.code == 0) {
                    commit("ZXDETAILOBJ", res.data)
                }
            })
    },
    getArrTime({commit},value){
        commit("ARRTIME", value)
    },
    changeFinTab({commit},value){
        commit("FINDTAB", value)
    },
    changeFinActive({commit},value){
        commit("FINACTIVE", value)
    },
    //走势图
    getRunchart({
        commit
    }, value) {
        return new Promise((resolve, reject) => {
            api.getChartData(value)
            .then(res => {
                if (res.code == 0) {
                    commit("RUNCHARTDATA", res.data);
                    resolve()
                }else{
                    reject()
                }
            })
        })
    }
}

export default actions