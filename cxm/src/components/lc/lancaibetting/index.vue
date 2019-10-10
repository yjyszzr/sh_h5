<template>
    <div class="lancaiBetting">
        <div class="matchHeader">
            已选{{matchSelectedList.length}}场比赛&nbsp;&nbsp;&nbsp;投注截止时间：<span>{{arrTime.length==0?'00-00 00:00':datePd(arrTime[0])}}</span>
        </div>
        <!-- 混合投注弹窗组件 -->
        <transition name="translate"> 
            <v-basket-mark @isSelectedTy='isSelectedTy' @concatInfo='concatInfo' :moreObj='moreObj' @closeMark='closeMark()' v-if="basketmarkShow"></v-basket-mark>
            <v-basketsfc @isSelectedTy='isSelectedTy' @concatInfo='concatInfo' :sfcObj='sfcObj' @closeMark='closeMark()' v-if="sfcmarkShow"></v-basketsfc>
        </transition>
        <transition name="page">
            <div @touchmove.prevent @click="closeMark()" class="basket-mark" v-show="basketmarkShow||sfcmarkShow"></div>
        </transition>
        <div class="betting-content">
            <ul class="no_colw" v-if="playType!=3&&playType!=6">
                <li v-for="(item,i) in matchSelectedList" :key='i'>
                    <img src="../../../assets/img/freebuy_img/Singlefield@2x.png" alt="" class="dan_icon" v-if="item.matchPlays[0].single=='1'">
                    <p class="bet-top">{{item.leagueAddr}} {{item.changci}} 截止{{datePdone(item.betEndTime)}}</p>
                    <div class="bf_title">
                        <span><span>[客]</span>{{item.visitingTeamAbbr}}</span>
                        <span>VS</span>
                        <span><span>[主]</span>{{item.homeTeamAbbr}}</span>
                    </div>
                    <div class="bet-bottom">
                        <div class="bet-left" @click="deleteList(item,i)">
                            <img src="../../../assets/img/sut.png">
                        </div>
                        <div class="bet-middle">
                            <table>
                                <tbody>
                                    <tr>
                                        <td @click="kClick(item.matchPlays[0],item)" :class="item.matchPlays[0].visitingCell&&item.matchPlays[0].visitingCell.isSelected&&item.matchPlays[0].visitingCell.isSelected=='1'?'selected':''">
                                            <span>{{item.matchPlays[0].visitingCell.cellName}}</span>
                                            <span>{{item.matchPlays[0].visitingCell.cellOdds}}</span>
                                        </td>
                                        <td  @click="zClick(item.matchPlays[0],item)" :class="item.matchPlays[0].homeCell&&item.matchPlays[0].homeCell.isSelected&&item.matchPlays[0].homeCell.isSelected=='1'?'selected':''">
                                            <span>{{item.matchPlays[0].homeCell.cellName}}<b v-show="playType=='1'" :style="{'color':item.matchPlays[0].fixedOdds.substr(0,1)=='-'?'#44ae35':'#ea5504'}">({{item.matchPlays[0].fixedOdds}})</b></span>
                                            <span>{{item.matchPlays[0].homeCell.cellOdds}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="bet-right">
                            <button :disabled='item.isDan' :class="item.isDan?'isdan':''" ref='isdan' @click="danClick(item,$event)">胆</button>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="no_colw" v-if="playType==3||playType==6">
                <li v-for="(item,i) in matchSelectedList" :key='i'>
                    <img src="../../../assets/img/freebuy_img/Singlefield@2x.png" alt="" class="dan_icon" v-if="item.matchPlays[0].single=='1'||item.matchPlays[1].single=='1'||(item.matchPlays[3].playType!=3&&item.matchPlays[3].single=='1')||(item.matchPlays[2].playType!=3&&item.matchPlays[2].single=='1')">
                    <p class="bet-top">{{item.leagueAddr}} {{item.changci}} 截止{{datePdone(item.betEndTime)}}</p>
                    <div class="bet-bottom">
                        <div class="bet-left" @click="deleteList(item,i)">
                            <img src="../../../assets/img/sut.png">
                        </div>
                        <div class="bet-middle-colw">
                            <div class="bf_title1">
                                <span><span>[客]</span>{{item.visitingTeamAbbr}}</span>
                                <span>VS</span>
                                <span><span>[主]</span>{{item.homeTeamAbbr}}</span>
                            </div>
                            <div class="colw-txt" style="background:none;color:#505050;border:1px solid #f0f0f0;" v-show="playType==3&&item.selectNum<=0" @click="sfcBtn(item.matchPlays[0],item)">点击选择投注内容</div>
                            <div class="colw-txt" v-show="playType==3&&item.selectNum>0" @click="sfcBtn(item.matchPlays[0],item)">
                                <span v-for="(s,l) in item.selectList" :key='l'>
                                    <span v-for="(m,n) in s.betCells" :key='n'>
                                        {{m.kz}}{{m.cellName}}<span v-show="n!=s.betCells.length-1">,</span>
                                    </span>
                                </span>
                            </div>
                            <div class="colw-txt" style="background:none;color:#505050;border:1px solid #f0f0f0;" v-show="playType==6&&item.selectNum<=0" @click="bfBtn(item.matchPlays,item)">点击选择投注内容</div>
                            <div class="colw-txt" v-show="playType==6&&item.selectNum>0" @click="bfBtn(item.matchPlays,item)">
                                <span v-for="(s,l) in item.selectList" :key='l'>
                                    <span v-for="(m,n) in s.betCells" :key='n'>
                                        {{m.kz}}{{m.cellName}}<span v-show="n!=s.betCells.length-1">,</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="bet-right">
                            <button :disabled='item.isDan' :class="item.isDan?'isdan':''" ref='isdan' @click="danClick(item,$event)">胆</button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="ment"><i class="iconfont icon-icon-29 xySelected" ref='xySelected' @click="xySelectedClick()"></i><p>我已阅读并同意<router-link to="/freebuy/protocol">《彩小秘投注服务协议》</router-link></p></div>
        </div>
        <!--底部-->
        <div class="fixed fixBottom">
            <small>页面盘口，赔率仅供参考，请以出票盘口赔率为准</small>
            <ul>
                <li>
                    <button @click="cgClick()" v-if="disable==false">
                        <div class="play-item" v-show='num>0&&($store.state.mark_playObj.playutText.length!=1||$store.state.mark_playObj.playutText.indexOf("1&1")=="-1")'>
                            <p>
                                串关&nbsp;&nbsp;
                            </p>
                            <div class="play-text">
                                <span v-for="(item,i) in $store.state.mark_playObj.playutText" :key='i'>
                                    {{item.split('&')[0]==item.split('&')[1]?'单关 ':item.split('&')[0]+'串'+item.split('&')[1]}}
                                    <b style="font-weight:400;" v-show="i<$store.state.mark_playObj.playutText.length-1">
                                        ,
                                    </b>
                                </span>
                            </div>
                            <i></i>
                        </div>
                        <div class="play-item" v-show='num>0&&($store.state.mark_playObj.playutText.length==1&&$store.state.mark_playObj.playutText.indexOf("1&1")!="-1")'>
                            单关
                            <i></i>
                        </div>
                    </button>
                    <button disabled='true' v-if="disable==true">
                        请重新选择比赛
                    </button>
                </li>
                <li>
                    <button @click='mupClick()'>
                        倍数&nbsp;&nbsp;{{mupStatus}}倍<i></i>
                    </button>
                </li>
            </ul>
            <div>
                <div class="left">
                    <p>{{betObj.betNum}}注{{betObj.times}}倍&nbsp;&nbsp;共需：<span>￥{{betObj.money}}</span></p><p>预测奖金：<span class="ycjj">￥{{betObj.minBonus}}-{{betObj.maxBonus}}</span></p>
                </div>
                <a class="right" @click="saveGo()">确定</a>
            </div>
        </div>
    </div>
</template>
<script src='./script.js'>

</script>
<style lang='scss' scoped src='./style.scss'>

</style>


