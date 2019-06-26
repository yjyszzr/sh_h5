<style lang='scss' src='./style.scss'></style>
<template>
    <div class="wrap result">
        <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange">
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus === 'pull'">下拉刷新</span>
                <span v-show="topStatus === 'drop'">释放更新</span>
                <span v-show="topStatus === 'loading'" class="loading-down">
                    <v-loading></v-loading>
                </span>
            </div>
            <section v-if="listd.lotteryMatchDTOList">
                <p class="title" v-if="listd.lotteryMatchDTOList.length>0">
                    <span class="spfList">{{weekDate}}共有<span>{{listd.lotteryMatchDTOList.length}}</span>场比赛</span>
                </p>
                <ul class="hotMatchList">
                    <li v-for="(list,i) in listd.lotteryMatchDTOList" :key='i'>
                        <small><i>{{list.changci}}</i><i>{{list.leagueAddr}}</i><i>{{list.matchTime}}</i></small>
                        <div class="pink">
                            <span :class="list.isCollect=='0'?'icon-icon-34':'icon-icon-32'" class="icon-collection iconfont" @click="collection(list)"></span>
                            <div @click='goDetail(list.matchId)'>
                                <i><img :src="list.homeTeamLogo"></i>
                                <div class="vs-name">
                                    <p><em>{{list.homeTeamAbbr}}</em><span>VS</span><em style="text-align: left">{{list.visitingTeamAbbr}}</em></p>
                                    <!--0未开赛-->
                                    <div v-if="list.matchFinish =='0'">
                                        <b>未开赛<span>{{list.matchTime.substr(6,12)}}</span></b>
                                    </div>
                                    <!--1已结束-->
                                    <div v-if="list.matchFinish =='1'">
                                        <b><span class="col-red">比分{{list.whole}}</span><span class="col-red">半场{{list.firstHalf}}</span></b>
                                    </div>
                                    <!--6比赛进行中-->
                                    <div v-if="list.matchFinish =='6'">
                                        <b><span class="col-red">{{list.minute}}'</span><span class="col-red">{{list.whole}}</span></b>
                                    </div>
                                    <div v-else>
                                        <span style="color:#505050;font-size:0.32rem;">{{matchfinsh(list.matchFinish)}}</span>
                                    </div>
                                </div>
                                <s><img :src="list.visitingTeamLogo"></s>
                                <span class="arrow_right"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </mt-loadmore>
        <div class="nullstatus" v-if="!listd.lotteryMatchDTOList||listd.lotteryMatchDTOList.length<=0">
                <img src="../../../assets/img/juan.png" alt="">
                <span>暂无数据</span>
        </div>
    </div>
</template>
<script src='./script.js'>
// import http from '../api/http'
</script>