<style lang='scss' src='./style.scss'>

</style>

<template>
    <div class="wrap cathectic">
        <div class="bx">
            <section class="section" :class="$route.query.playType=='6'?'hhTz':''" v-for="(item,i) in $store.state.matchSelectedList" :key='i'>
                <img src="../../../assets/img/freebuy_img/Singlefield@2x.png" alt="" class="dan_icon" v-show="item.matchPlays[0].single=='1'||(item.matchPlays[1]&&item.matchPlays[1].single=='1')">
                <div class="cont">
                    <p class="cont_p" v-if="$route.query.playType=='1'||$route.query.playType=='2'">{{item.leagueAddr}} {{item.changci}} 截止{{datePd(item.betEndTime)}}</p>
                    <p class="cont_pt" v-if="$route.query.playType=='3'||$route.query.playType=='5'||$route.query.playType=='7'">
                        <span><span v-if="item.homeTeamRank!==''">[{{item.homeTeamRank}}]</span>{{item.homeTeamAbbr}}</span>
                            <span>VS</span>
                            <span><span v-if="item.visitingTeamRank!==''">[{{item.visitingTeamRank}}]</span>{{item.visitingTeamAbbr}}</span>
                    </p>
                    <p class="cont_ptZjq" v-if="$route.query.playType=='4'">
                        <span><span v-if="item.homeTeamRank!==''">[{{item.homeTeamRank}}]</span>{{item.homeTeamAbbr}}</span>
                            <span>VS</span>
                            <span><span v-if="item.visitingTeamRank!==''">[{{item.visitingTeamRank}}]</span>{{item.visitingTeamAbbr}}</span>
                    </p>
                    <p class="cont_pthh" v-if="$route.query.playType=='6'">
                        <span><span v-if="item.homeTeamRank!==''">[{{item.homeTeamRank}}]</span>{{item.homeTeamAbbr}}</span>
                            <span>VS</span>
                            <span><span v-if="item.visitingTeamRank!==''">[{{item.visitingTeamRank}}]</span>{{item.visitingTeamAbbr}}</span>
                    </p>
                    <div class="mat_cen" :id='item.matchId' :class="$route.query.playType=='3'||$route.query.playType=='5'||$route.query.playType=='7'?'lang':'short'">
                        <div @click="deleteList(item.matchId,i)">
                            <img src="../../../assets/img/sut.png">
                        </div>
                        <ul class="spf_list" v-if="$route.query.playType=='1'||$route.query.playType=='2'">
                            <li :class="item.myspf.indexOf(3)!=-1?'cont_cur':''"><p @click="selectedClick($event)"></p><span><em v-if="item.homeTeamRank!==''">[{{item.homeTeamRank}}]</em>{{item.homeTeamAbbr}}</span><span>主胜{{item.matchPlays[0].homeCell.cellOdds}}</span></li>
                            <li :class="item.myspf.indexOf(1)!=-1?'cont_cur':''"><p @click="selectedClick($event)"></p><span>vs <i :style="{'color':item.matchPlays[0].fixedOdds.substr(0,1)=='+'?'#e85504':'#44ae35'}">{{item.matchPlays[0].fixedOdds}}</i></span><span>平{{item.matchPlays[0].flatCell.cellOdds}}</span></li>
                            <li :class="item.myspf.indexOf(0)!=-1?'cont_cur':''"><p @click="selectedClick($event)"></p><span><em v-if="item.visitingTeamRank!==''">[{{item.visitingTeamRank}}]</em>{{item.visitingTeamAbbr}}</span><span>客胜{{item.matchPlays[0].visitingCell.cellOdds}}</span></li>
                        </ul>
                        <ul v-if="$route.query.playType=='4'" class="zjq">
                            <li v-for='(data,index) in item.matchPlays[0].matchCells' :key='index' :class="item.myspf.indexOf('jqs:'+data.cellCode)!=-1?'cont_cur':''"><p @click="selectedClick($event,data)"></p><span>{{data.cellName}}</span>&nbsp;<span>{{data.cellOdds}}</span></li>
                        </ul>
                        <ul v-if="$route.query.playType=='3'||$route.query.playType=='5'" class="bf">
                            <li @click="bfClick(item.matchId)">
                                <span  v-for="(data,index) in matchSelectObj.get(item.matchId)?matchSelectObj.get(item.matchId):[]" :key='index'>{{data}}&nbsp;</span>
                            </li>
                        </ul>
                        <ul v-if="$route.query.playType=='7'" class="two">
                            <li :class="item.myspf.indexOf(item.matchPlays[0].homeCell.cellName)!=-1?'cont_cur':''"><p @click="selectedTwoClick($event,item.matchPlays[0].homeCell.cellName)"></p>
                                <span>{{item.matchPlays[0].homeCell.cellName}}</span>
                                <span>{{item.matchPlays[0].homeCell.cellOdds}}</span>
                            </li>
                            <li :class="item.myspf.indexOf(item.matchPlays[0].visitingCell.cellName)!=-1?'cont_cur':''"><p @click="selectedTwoClick($event,item.matchPlays[0].visitingCell.cellName)"></p>
                                <span>{{item.matchPlays[0].visitingCell.cellName}}</span>
                                <span>{{item.matchPlays[0].visitingCell.cellOdds}}</span>
                            </li>
                        </ul>
                        <ul v-if="$route.query.playType=='6'" class="mixTz">
                            <li @click="bfClick(item.matchId)">
                                <span v-for="(data,index) in item.selectedList" :key='index'>
                                    <b v-for="(a,index1) in data.betCells" :key='index1'>{{data.playType=='1'?'让球'+a.cellName:a.cellName}}&nbsp;</b>
                                </span>
                            </li>
                        </ul>
                        <button :disabled='item.isDan' :class="item.isDan?'isdan':''" ref='isdan' @click="danClick(item,$event)">胆</button>
                    </div>
                </div>
            </section>
            <div class="ment"><i class="iconfont icon-icon-29 xySelected" ref='xySelected' @click="xySelectedClick()"></i><p>我已阅读并同意<router-link to="/freebuy/protocol">《彩小秘投注服务协议》</router-link></p></div>
        </div>
        <!--底部-->
        <section class="fixed fixBottom">
            <small>页面盘口，赔率仅供参考，请以出票盘口赔率为准</small>
            <ul>
                <li>
                    <button @click="cgClick()" v-if="disable==false">
                        <p v-show='!$store.state.matchSelectedList[0].matchPlays[1]&&($store.state.mark_playObj.playutText.length!=1||$store.state.mark_playObj.playutText.indexOf("1&1")=="-1")'>串关&nbsp;&nbsp;<span v-for="(item,i) in $store.state.mark_playObj.playutText" :key='i'>{{item.split('&')[0]==item.split('&')[1]?'单关 ':item.split('&')[0]+'串'+item.split('&')[1]}}<b style="font-weight:400;" v-show="i<$store.state.mark_playObj.playutText.length-1">,</b></span><i></i></p>
                        <p v-show='!$store.state.matchSelectedList[0].matchPlays[1]&&($store.state.mark_playObj.playutText.length==1&&$store.state.mark_playObj.playutText.indexOf("1&1")!="-1")'>单关<i></i></p>
                        <p v-show='$store.state.matchSelectedList[0].matchPlays[1]&&($store.state.mark_playObj.playutText.length!=1||$store.state.mark_playObj.playutText.indexOf("1&1")=="-1")'>串关&nbsp;&nbsp;<span v-for="(item,i) in $store.state.mark_playObj.playutText" :key='i'>{{item.split('&')[0]==item.split('&')[1]?'单关 ':item.split('&')[0]+'串'+item.split('&')[1]}}<b style="font-weight:400;" v-show="i<$store.state.mark_playObj.playutText.length-1">,</b></span><i></i></p>
                        <p v-show='$store.state.matchSelectedList[0].matchPlays[1]&&($store.state.mark_playObj.playutText.length==1&&$store.state.mark_playObj.playutText.indexOf("1&1")!="-1")'>单关<i></i></p>
                    </button>
                    <button disabled='true' v-if="disable==true">
                        请重新选择比赛
                    </button>
                </li>
                <li>
                    <button @click='mupClick()'>
                        倍数&nbsp;&nbsp;{{$store.state.mark_playObj.mupNum}}倍<i></i>
                    </button>
                </li>
            </ul>
            <div>
                <div class="left">
                    <p>{{betObj.betNum}}注{{betObj.times}}倍&nbsp;&nbsp;共需：<span>￥{{betObj.money}}</span></p><p>预测奖金：<span class="ycjj">￥{{betObj.minBonus}}-{{betObj.maxBonus}}</span></p>
                </div>
                <a class="right" @click="saveGo()">确定</a>
            </div>
        </section>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>