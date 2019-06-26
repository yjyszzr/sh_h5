<style lang='scss' src='./style.scss'></style>
<template>
    <div class="wrap teamDetail">
        <section v-if="ckxqObj.matchInfo">
            <div class="team">
                <p class="p1">
                    {{ckxqObj.matchInfo.changci}} {{ckxqObj.matchInfo.leagueAddr}} {{matchTimeDate(ckxqObj.matchInfo.matchTime)}}
                </p>
                <ul :class="res.matchStatus=='0'?'start-time':''">
                    <li>
                         <img :src="ckxqObj.matchInfo.homeTeamPic" alt="">
                        <span><b v-show="ckxqObj.matchInfo.homeTeamRank!==''">[{{ckxqObj.matchInfo.homeTeamRank}}]</b>{{ckxqObj.matchInfo.homeTeamAbbr}}</span>
                    </li>
                    <p><span><i v-if="res.matchStatus==1||res.matchStatus==6">{{res.fsH}}</i>&nbsp;&nbsp;{{res.matchStatus=='1'?'已结束':res.matchStatus=='0'?'未开赛':res.matchStatus=='2'||res.matchStatus=='4'||res.matchStatus=='5'?matchfinsh(res.matchStatus):res.minute+'‘'}}&nbsp;&nbsp;<i v-if="res.matchStatus==1||res.matchStatus==6">{{res.fsA}}</i></span><b v-if="res.matchStatus==1||res.matchStatus==6">半场 {{res.htsH}}:{{res.htsA}}</b><b v-else>{{dtfilter(res.matchTime)}}</b></p>
                    <li>
                        <img :src="ckxqObj.matchInfo.visitingTeamPic" alt="">
                        <span><b v-show="ckxqObj.matchInfo.visitingTeamRank!==''">[{{ckxqObj.matchInfo.visitingTeamRank}}]</b>{{ckxqObj.matchInfo.visitingTeamAbbr}}</span>
                    </li>
                </ul>
            </div>
            <ul class="analytical">
                <li><p @click="fxTab($event,'0')"></p><span>赛况</span></li>
                <li class="currer"><p @click="fxTab($event,'1')"></p><span>分析</span></li>
                <li><p @click="fxTab($event,'2')"></p><span>赔率</span></li>
                <li><p @click="fxTab($event,'3')"></p><span>阵容</span></li>
            </ul>
            <!--赛况-->
            <v-outs :res='res' :eventList='eventList' :matchLiveStatisticsDTO='matchLiveStatisticsDTO' v-if="flag=='0'" :matchInfo='ckxqObj.matchInfo'></v-outs>
            <!--分析-->
            <div class="analysis" v-if="flag=='1'">
                <div class="detail_list">
                    <p>历史交锋<span>近{{ckxqObj.hvMatchTeamInfo.total}}场比赛</span><span>主队</span><span>{{ckxqObj.hvMatchTeamInfo.win}}胜</span><span>{{ckxqObj.hvMatchTeamInfo.draw}}平</span><span>{{ckxqObj.hvMatchTeamInfo.lose}}负</span></p>
                </div>
                <div class="progress">
                    <div class="h_progress">
                        <span>主胜</span>
                        <el-progress :percentage="ckxqObj.hvMatchTeamInfo.total==0?0:(ckxqObj.hvMatchTeamInfo.win/ckxqObj.hvMatchTeamInfo.total)*100" status="exception"></el-progress>
                    </div>
                    <div class="p_progress">
                        <span>平</span>
                        <el-progress :percentage="ckxqObj.hvMatchTeamInfo.total==0?0:(ckxqObj.hvMatchTeamInfo.draw/ckxqObj.hvMatchTeamInfo.total)*100" :show-text='false'></el-progress>
                    </div>
                    <div class="f_progress">
                        <span>客胜</span>
                        <el-progress :percentage="ckxqObj.hvMatchTeamInfo.total==0?0:(ckxqObj.hvMatchTeamInfo.lose/ckxqObj.hvMatchTeamInfo.total)*100" status="success"></el-progress>
                    </div>
                </div>
                <div class="cen_list">
                    <ul class="box_list_1">
                        <li>赛事</li>
                        <li>日期</li>
                        <li>比分</li>
                        <li>胜负</li>
                    </ul>
                    <div class="box_list_2">
                        <ul v-for="(item,i) in ckxqObj.hvMatchTeamInfo.matchInfos" :key='i'>
                            <li class="list_cur">{{item.leagueAddr}}</li>
                            <li>{{item.matchDay}}</li>
                            <li>
                                <span :style="{'color':ckxqObj.matchInfo.homeTeamAbbr==item.homeTeamAbbr?colorMatchRs(item.matchRs):'#9f9f9f'}">{{item.homeTeamAbbr}}</span>
                                <span :style="{'color':colorMatchRs(item.matchRs)}">{{item.whole}}</span>
                                <span :style="{'color':ckxqObj.matchInfo.homeTeamAbbr==item.visitingTeamAbbr?colorMatchRs(item.matchRs):'#9f9f9f'}">{{item.visitingTeamAbbr}}</span>
                            </li>
                            <li :style="{'color':colorMatchRs(item.matchRs)}">{{item.matchRs}}</li>
                        </ul>
                    </div>
                    <div class="nullws" v-if="ckxqObj.hvMatchTeamInfo.matchInfos&&ckxqObj.hvMatchTeamInfo.matchInfos.length<=0">
                        暂无数据
                    </div>
                </div>
                <div class="cen_list">
                    <div class="detail_list" style="border-bottom:1px solid #f0f0f0;">
                        <p>最近战绩<span>近{{ckxqObj.hMatchTeamInfo.total}}场比赛</span><span style="color: #505050;">{{ckxqObj.matchInfo.homeTeamAbbr}} (主队)</span><span>{{ckxqObj.hMatchTeamInfo.win}}胜</span><span>{{ckxqObj.hMatchTeamInfo.draw}}平</span><span>{{ckxqObj.hMatchTeamInfo.lose}}负</span></p>
                    </div>
                    <ul class="box_list_1">
                        <li>赛事</li>
                        <li>日期</li>
                        <li>比分</li>
                        <li>胜负</li>
                    </ul>
                    <div class="box_list_2">
                        <ul v-for="(item,i) in ckxqObj.hMatchTeamInfo.matchInfos" :key='i'>
                            <li class="list_cur">{{item.leagueAddr}}</li>
                            <li>{{item.matchDay}}</li>
                            <li>
                                <span :style="{'color':ckxqObj.matchInfo.homeTeamAbbr==item.homeTeamAbbr?colorMatchRs(item.matchRs):'#9f9f9f'}">{{item.homeTeamAbbr}}</span>
                                <span :style="{'color':colorMatchRs(item.matchRs)}">{{item.whole}}</span>
                                <span :style="{'color':ckxqObj.matchInfo.homeTeamAbbr==item.visitingTeamAbbr?colorMatchRs(item.matchRs):'#9f9f9f'}">{{item.visitingTeamAbbr}}</span>
                            </li>
                            <li :style="{'color':colorMatchRs(item.matchRs)}">{{item.matchRs}}</li>
                        </ul>
                    </div>
                </div>
                <div class="cen_list">
                    <div class="detail_list" style="border-bottom:1px solid #f0f0f0;">
                        <p>最近战绩<span>近{{ckxqObj.vMatchTeamInfo.total}}场比赛</span><span style="color: #505050;">{{ckxqObj.matchInfo.visitingTeamAbbr}} (客队)</span><span>{{ckxqObj.vMatchTeamInfo.win}}胜</span><span>{{ckxqObj.vMatchTeamInfo.draw}}平</span><span>{{ckxqObj.vMatchTeamInfo.lose}}负</span></p>
                    </div>
                    <ul class="box_list_1">
                        <li>赛事</li>
                        <li>日期</li>
                        <li>比分</li>
                        <li>胜负</li>
                    </ul>
                    <div class="box_list_2">
                        <ul v-for="(item,i) in ckxqObj.vMatchTeamInfo.matchInfos" :key='i'>
                            <li class="list_cur">{{item.leagueAddr}}</li>
                            <li>{{item.matchDay}}</li>
                            <li><span :style="{'color':ckxqObj.matchInfo.visitingTeamAbbr==item.homeTeamAbbr?colorMatchRs(item.matchRs):'#9f9f9f'}">{{item.homeTeamAbbr}}</span>
                            <span :style="{'color':colorMatchRs(item.matchRs)}">{{item.whole}}</span>
                            <span :style="{'color':ckxqObj.matchInfo.visitingTeamAbbr==item.visitingTeamAbbr?colorMatchRs(item.matchRs):'#9f9f9f'}">{{item.visitingTeamAbbr}}</span></li>
                            <li :style="{'color':colorMatchRs(item.matchRs)}">{{item.matchRs}}</li>
                        </ul>
                    </div>
                </div>
                <div class="ranking">
                    <p>积分排名</p>
                    <div class="zcScore">
						<div class="zcTitle">
							{{ckxqObj.homeTeamScoreInfo.teamName}}
						</div>
						<div class="tbLIst">
							<ul class="tbListNav">
								<li></li>
								<li>场</li>
								<li>胜</li>
								<li>平</li>
								<li>负</li>
								<li>进/失/净</li>
								<li>积分</li>
								<li>名次</li>
							</ul>
							<div class="tbListBottom">
								<div class="tabListLeft">
									<span>总</span>
									<span>主</span>
									<span>客</span>
								</div>
								<div class="tabListRight">
									<ul>
										<li v-for="(item,i) in zObj.zlist" :key='i'>
                                            {{item}}
                                        </li>
									</ul>
									<ul>
										<li v-for="(item,i) in zObj.hlist" :key='i'>
                                            {{item}}
                                        </li>
									</ul>
									<ul>
										<li v-for="(item,i) in zObj.klist" :key='i'>
                                            {{item}}
                                        </li>
									</ul>
								</div>
							</div>
						</div>
                    </div>
                    <div class="kcScore">
						<div class="zcTitle">
							{{ckxqObj.visitingTeamScoreInfo.teamName}}
						</div>
						<div class="tbLIst">
                            <ul class="tbListNav">
								<li></li>
								<li>场</li>
								<li>胜</li>
								<li>平</li>
								<li>负</li>
								<li>进/失/净</li>
								<li>积分</li>
								<li>名次</li>
							</ul>
							<div class="tbListBottom">
								<div class="tabListLeft">
									<span>总</span>
									<span>主</span>
									<span>客</span>
								</div>
								<div class="tabListRight">
									<ul>
										<li v-for="(item,i) in kobj.zlist" :key='i'>
                                            {{item}}
                                        </li>
									</ul>
									<ul>
										<li v-for="(item,i) in kobj.hlist" :key='i'>
                                            {{item}}
                                        </li>
									</ul>
									<ul>
										<li v-for="(item,i) in kobj.klist" :key='i'>
                                            {{item}}
                                        </li>
									</ul>
                                </div>
							</div>
						</div>
                    </div>
                </div>
                <div class="future-events">
                        <div class="title">
                            未来赛事<span>{{ckxqObj.matchInfo.homeTeamAbbr}}</span>
                        </div>
                        <table>
                            <tr>
                                <td>赛事</td>
                                <td>日期</td>
                                <td>主队</td>
                                <td>客队</td>
                            </tr>
                            <tr v-for="(item,i) in ckxqObj.hFutureMatchInfos" :key='i'>
                                <td>{{item.leagueAbbr}}</td>
                                <td>{{item.matchDate}}</td>
                                <td :style="{'color':item.homeTeamAbbr==ckxqObj.matchInfo.homeTeamAbbr?'#505050':'#9f9f9f'}">{{item.homeTeamAbbr}}</td>
                                <td :style="{'color':item.visitorTeamAbbr==ckxqObj.matchInfo.homeTeamAbbr?'#505050':'#9f9f9f'}">{{item.visitorTeamAbbr}}</td>
                            </tr>
                            <div class="nullws" v-if="ckxqObj.hFutureMatchInfos&&ckxqObj.hFutureMatchInfos.length<=0">
                                暂无数据
                            </div>
                        </table>
                    </div>
                    <div class="future-events">
                        <div class="title">
                            未来赛事<span>{{ckxqObj.matchInfo.visitingTeamAbbr}}</span>
                        </div>
                        <table>
                            <tr>
                                <td>赛事</td>
                                <td>日期</td>
                                <td>主队</td>
                                <td>客队</td>
                            </tr>
                            <tr v-for="(item,i) in ckxqObj.vFutureMatchInfos" :key='i'>
                                <td>{{item.leagueAbbr}}</td>
                                <td>{{item.matchDate}}</td>
                                <td :style="{'color':item.homeTeamAbbr==ckxqObj.matchInfo.visitingTeamAbbr?'#505050':'#9f9f9f'}">{{item.homeTeamAbbr}}</td>
                                <td :style="{'color':item.visitorTeamAbbr==ckxqObj.matchInfo.visitingTeamAbbr?'#505050':'#9f9f9f'}">{{item.visitorTeamAbbr}}</td>
                            </tr>
                            <div class="nullws" v-if="ckxqObj.vFutureMatchInfos&&ckxqObj.vFutureMatchInfos.length<=0">
                                暂无数据
                            </div>
                        </table>
                </div>
            </div>
            <!--赔率-->
            <v-detail v-if="flag=='2'" :leagueMatchAsias='ckxqObj.leagueMatchAsias' :leagueMatchEuropes='ckxqObj.leagueMatchEuropes' :leagueMatchDaoxiaos='ckxqObj.leagueMatchDaoxiaos'></v-detail>
            <!-- 阵容 -->
            <v-lineup v-if="flag=='3'"></v-lineup>
        </section>
    </div>
</template>
<script src='./script.js'>

</script>