<template>
    <div class="lancai">
        <!--头部开始-->
        <div class="head">
            <span class="back-img" @click="goBack()"><img src="../../../assets/img/ret.png" alt=""></span>
            <div class="head-text" @click="openOrclose()">
                <span>{{sntTitle(playType)}}</span>
                <span class="header-down"><img id="downImg" src="../../../assets/img/freebuy_img/Collapse@3x.png"
                                               alt=""></span>
            </div>
            <div class="snt-filter">
                <span @click='filter()' class="iconfont icon-icon-21"></span>
                <span @click="goInToplay()">帮助</span>
            </div>
        </div>
        <!-- 底部 -->
        <div class="match_footer fixBottom">
            <div class="match_footer_left">
                <div class="match_delete" @click="clear_matchClick()">
                    <i class="iconfont icon-icon-26"></i>
                    <!--<img src="../../../assets/img/freebuy_img/trashbin@2x.png" alt="">-->
                </div>
                <div class="match_test_status" v-html="text">
                    
                </div>
            </div>
            <button class="confirm" :disabled='flag' @click="confirm()" :class="classFlag?'noConfirm':''">
                确定
            </button>
        </div>
        <!-- 混合投注弹窗组件 -->
        <transition name="translate"> 
            <v-basket-mark @concatInfo='concatInfo' @isSelectedTy='isSelectedTy' :moreObj='moreObj' @closeMark='closeMark()' v-if="basketmarkShow"></v-basket-mark>
            <v-basketsfc @concatInfo='concatInfo' @isSelectedTy='isSelectedTy' :sfcObj='sfcObj' @closeMark='closeMark()' v-if="sfcmarkShow"></v-basketsfc>
        </transition>
        <transition name="page">
            <div @touchmove.prevent @click="closeMark()" class="basket-mark" v-show="basketmarkShow||sfcmarkShow"></div>
        </transition>
        <!--选玩法-->
        <div class="collspce">
            <transition name="mybox">
                <div class="title-collspce" v-if="collapseShow">
                    <p @click="stntab(item)" :class="item.id==playType?'cur':''" class="btn-box" v-for="(item,i) in playList" :key='i'>
                        {{item.name}} 
                        <span
                            class="img-box" v-show="item.id==playType">
                            <img src="../../daletou/images/Check@3x.png" alt="">
                        </span>
                    </p>
                </div>
            </transition>
            <transition name="ceng">
                <div class="meng-cheng" @click="openOrclose()" v-if="collapseShow"></div>
            </transition>
        </div>
        <div class="matchTitle">
            共有{{backetObj.allMatchCount || 0}}场比赛可投
        </div>
        <!-- 投注列表 -->
        <el-collapse v-model="activeName">
            <el-collapse-item  :name="activeNameNum(i)" v-for="(data,i) in backetObj.playList" :key='i'>
                <template slot="title" v-if="!data.matchDay">
                    <span class="iconfont icon-icon-23" style="margin-right:0.1rem;"></span>
                    <span class="hotMatch">热门比赛</span>
                </template>
                <template slot="title" v-else>
                    <span class="spfList">{{data.matchDay}}&nbsp;&nbsp;共有<b style="font-weight:400;color:#505050;">{{data.playList.length}}场</b>比赛可投</span>
                </template>
                <ul class="lancai-list">
                    <li v-for="(item,index) in data.playList" :key='index' :id='item.matchId'>
                        <!-- 单关图标 -->
                        <img src="../../..//assets/img/freebuy_img/Singlefield@2x.png" alt="" class="dan_icon" v-if="item.matchPlays.length==4&&(item.matchPlays[0].single=='1'||item.matchPlays[1].single=='1'||(item.matchPlays[3].playType!=3&&item.matchPlays[3].single=='1')||(item.matchPlays[2].playType!=3&&item.matchPlays[2].single=='1'))">
                        <img src="../../..//assets/img/freebuy_img/Singlefield@2x.png" alt="" class="dan_icon" v-if="item.matchPlays.length<=1&&item.matchPlays[0].single=='1'">
                        <!-- 列表左侧数据 -->
                        <div class="matchLeft">
                            <!-- <p @click="matchDetail(item.matchId,$event)"></p> -->
                            <span>{{item.leagueAddr}}</span>
                            <span>{{item.changci}}</span>
                            <span>截止{{datePd(item.betEndTime)}}</span>
                        </div>
                        <!-- 列表右侧数据 -->
                        <div class="matchRightbf">
                            <div class="bf_title">
                                <span><span>[客]</span>{{item.visitingTeamAbbr}}</span>
                                <span>VS</span>
                                <span><span>[主]</span>{{item.homeTeamAbbr}}</span>
                            </div>
                            <!-- <div class="haltBoxth">
                                <i class="halt_p">本场停售</i>
                                <i @click="halt()" class="halt_p">详情>></i>
                            </div> -->
                            <!-- <div class="matchRighthhBox"> -->
                                
                                <!-- <div class="team_right" @click="bfBtn(item)">
                                    <span>更多</span>
                                    <span>玩法</span>
                                </div> -->
                                <!-- <div class="team_right" @click="bfBtn(item)">
                                    <span>已选</span>
                                    <span><b style="color: #dc3c32;font-wight: 400;">{{item.selectedNum}}</b>项</span>
                                </div> -->
                            <!-- </div> -->
                            <!-- 混合投注 -->
                            <table v-if="playType=='6'" class="mix-table">
                                <tbody>
                                    <tr v-for="(k,j) in item.matchPlays.filter(o=>{return o.playType!='3'})" :key='j' :class="k.single=='1'?'signleSected':''">
                                        <td>{{k.playType=='1'?'胜负':k.playType=='2'?'让分':'大小分'}}</td>
                                        <td>
                                            <p v-show="!k.visitingCell||k.isShow==0"></p>
                                            <div @click="kClick(k,item)" :class="k.visitingCell&&k.visitingCell.isSelected&&k.visitingCell.isSelected=='1'?'selected':''">
                                                <span>{{k.visitingCell||k.isShow!=0?k.visitingCell.cellName:'停售'}}</span>
                                                <span>{{k.visitingCell||k.isShow!=0?k.visitingCell.cellOdds:''}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <p v-show="!k.homeCell||k.isShow==0"></p>
                                            <div @click="zClick(k,item)" :class="k.homeCell&&k.homeCell.isSelected&&k.homeCell.isSelected=='1'?'selected':''">
                                                <span>{{k.homeCell||k.isShow!=0?k.homeCell.cellName:'停售'}}<b v-show="(k.homeCell||k.isShow!=0)&&k.playType=='2'" :style="{'color':k.fixedOdds.substr(0,1)=='-'?'#44ae35':'#dc3c32'}">({{k.fixedOdds}})</b></span>
                                                <span>{{k.homeCell||k.isShow!=0?k.homeCell.cellOdds:''}}</span>
                                            </div>
                                        </td>
                                        <td rowspan="3" v-if="j==0&&item.selectNum<=0" @click="bfBtn(item.matchPlays,item)">
                                            <span>更多</span>
                                            <span>玩法</span>
                                        </td>
                                        <td rowspan="3" v-if="j==0&&item.selectNum>0" @click="bfBtn(item.matchPlays,item)">
                                            <span>已选</span>
                                            <span><b style="color: #dc3c32;font-wight: 400;">{{item.selectNum}}</b>项</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table v-if="playType=='1'||playType=='2'||playType=='4'" class="sf-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p v-show="!item.matchPlays[0].visitingCell||item.matchPlays[0].isShow==0"></p>
                                            <div @click="kClick(item.matchPlays[0],item)" :class="item.matchPlays[0].visitingCell&&item.matchPlays[0].visitingCell.isSelected&&item.matchPlays[0].visitingCell.isSelected=='1'?'selected':''">
                                                <span>{{item.matchPlays[0].visitingCell||item.matchPlays[0].isShow!=0?item.matchPlays[0].visitingCell.cellName:'停售'}}</span>
                                                <span>{{item.matchPlays[0].visitingCell||item.matchPlays[0].isShow!=0?item.matchPlays[0].visitingCell.cellOdds:'停售'}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <p v-show="!item.matchPlays[0].homeCell||item.matchPlays[0].isShow==0"></p>
                                            <div  @click="zClick(item.matchPlays[0],item)" :class="item.matchPlays[0].homeCell&&item.matchPlays[0].homeCell.isSelected&&item.matchPlays[0].homeCell.isSelected=='1'?'selected':''">
                                                <span>{{item.matchPlays[0].homeCell||item.matchPlays[0].isShow!=0?item.matchPlays[0].homeCell.cellName:'停售'}}<b v-show="(item.matchPlays[0].homeCell||item.matchPlays[0].isShow!=0)&&item.matchPlays[0].playType=='2'" :style="{'color':item.matchPlays[0].fixedOdds.substr(0,1)=='-'?'#44ae35':'#dc3c32'}">{{item.matchPlays[0].fixedOdds}}</b></span>
                                                <span>{{item.matchPlays[0].homeCell||item.matchPlays[0].isShow!=0?item.matchPlays[0].homeCell.cellOdds:'停售'}}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="spc-table" v-if="playType=='3'">
                                <tbody>
                                    <tr>
                                        <td v-if="item.selectNum<=0" @click="sfcBtn(item.matchPlays[0],item)">点击选择投注内容</td>
                                        <td class="sfcSelected" v-if="item.selectNum>0" @click="sfcBtn(item.matchPlays[0],item)">
                                            <span v-for="(s,l) in item.selectList" :key='l'>
                                                <span v-for="(m,n) in s.betCells" :key='n'>
                                                    {{m.kz}}{{m.cellName}}<span v-show="n!=s.betCells.length-1">,</span>
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script src='./script.js'>

</script>
<style lang='scss' scoped src='./style.scss'>

</style>


