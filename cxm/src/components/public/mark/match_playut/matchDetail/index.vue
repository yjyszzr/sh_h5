<style lang='scss' src='./style.scss'>

</style>
<template>
    <div class="wrap matchDetail" @touchmove.prevent>
        <section>
            <div class="nullStatus" v-show="!matchDetailObj.matchInfo">
                <mt-spinner type="snake" color="#ea5504"></mt-spinner>
            </div>
            <div class="matchDetail_box" v-if="matchDetailObj.matchInfo">
                <div class="matchDetail_top">
                    {{matchDetailObj.matchInfo.changci}}&nbsp;&nbsp;{{matchDetailObj.matchInfo.leagueAddr}}&nbsp;&nbsp;{{matchTimeDate(matchDetailObj.matchInfo.matchTime)}}
                </div>
                <div class="matchDetail_content">
                    <div class="md_left">
                        <img :src="matchDetailObj.matchInfo.homeTeamPic" alt="">
                        <p><span v-show="matchDetailObj.matchInfo.homeTeamRank!==''">[{{matchDetailObj.matchInfo.homeTeamRank}}]</span>{{matchDetailObj.matchInfo.homeTeamAbbr}}</p>
                        <p>主胜{{matchDetailObj.matchInfo.hOdds}}</p>
                    </div>
                    <div class="md_middle">
                        <p>VS</p>
                        <p>平{{matchDetailObj.matchInfo.dOdds}}</p>
                    </div>
                    <div class="md_right">
                        <img :src="matchDetailObj.matchInfo.visitingTeamPic" alt="">
                        <p><span v-show="matchDetailObj.matchInfo.visitingTeamRank!==''">[{{matchDetailObj.matchInfo.visitingTeamRank}}]</span>{{matchDetailObj.matchInfo.visitingTeamAbbr}}</p>
                        <p>客胜{{matchDetailObj.matchInfo.aOdds}}</p>
                    </div>
                </div>
            </div>
            <ul class="matchDetailList" v-if="matchDetailObj.hvMatchTeamInfo">
                <li>
                    <p>近期状态</p>
                    <p>主队{{matchDetailObj.hMatchTeamInfo.win}}胜{{matchDetailObj.hMatchTeamInfo.draw}}平{{matchDetailObj.hMatchTeamInfo.lose}}负 
                    客队{{matchDetailObj.vMatchTeamInfo.win}}胜{{matchDetailObj.vMatchTeamInfo.draw}}平{{matchDetailObj.vMatchTeamInfo.lose}}负</p>
                </li>
                <li>
                    <p>主队主场</p>
                    <p>主队{{matchDetailObj.hhMatchTeamInfo.win}}胜{{matchDetailObj.hhMatchTeamInfo.draw}}平{{matchDetailObj.hhMatchTeamInfo.lose}}负</p>
                </li>
                <li>
                    <p>客队客场</p>
                    <p>主队{{matchDetailObj.vvMatchTeamInfo.win}}胜{{matchDetailObj.vvMatchTeamInfo.draw}}平{{matchDetailObj.vvMatchTeamInfo.lose}}负</p>
                </li>
                <li>
                    <p>相对交锋</p>
                    <p>共{{matchDetailObj.hvMatchTeamInfo.total}}次交锋 主队 
                        <span style="color: #ea5504;">{{matchDetailObj.hvMatchTeamInfo.win}}胜</span>
                        <span style="color: #0099d9;">{{matchDetailObj.hvMatchTeamInfo.draw}}平</span>
                        <span style="color: #44ae35;">{{matchDetailObj.hvMatchTeamInfo.lose}}负</span>
                    </p>
                </li>
                <li>
                    <p>投注比例</p>
                    <p>
                        <span>
                            <b>0</b>
                            <b>{{matchDetailObj.hadTeamSupport.hSupport}}</b>
                            <b>{{matchDetailObj.hadTeamSupport.dSupport}}</b>
                            <b>{{matchDetailObj.hadTeamSupport.aSupport}}</b>
                        </span>
                        <i class="d_line"></i>
                        <span>
                            <b :style="{'background':matchDetailObj.hhadTeamSupport.fixedOdds.substr(0,1)=='+'?'#f5ac41':'#85c36b'}">{{matchDetailObj.hhadTeamSupport.fixedOdds}}</b>
                            <b>{{matchDetailObj.hhadTeamSupport.hSupport}}</b>
                            <b>{{matchDetailObj.hhadTeamSupport.dSupport}}</b>
                            <b>{{matchDetailObj.hhadTeamSupport.aSupport}}</b>
                        </span>
                    </p>
                </li>
            </ul>
            <div class="confim_btn fixBottom">
                <p @click="confirm()">查看详情</p>
                <p @click="cancel()">取消</p>
            </div>
        </section>
    </div>
</template>
<script src='./script.js'>
    // import http from '../api/http'

</script>