<style lang='scss' src='./style.scss'>

</style>
<template>
    <div class="mix" @touchmove.prevent>
        <div class="mix-top">
            <p><span>[客]</span>{{moreObj.visitingTeamAbbr}}</p>
            <p>VS</p>
            <p><span>[主]</span>{{moreObj.homeTeamAbbr}}</p>
        </div>
        <!-- table -->
        <div class="mix-table" v-for="(item,i) in mixObj.matchPlays" :key='i'>
            <p v-show="item.playType!=1">{{item.playType=='2'?'主队让分':item.playType=='4'?'总分':'胜分差'}}<b :style="{'color':item.fixedOdds.substr(0,1)=='-'?'#44ae35':'#ea5504'}">{{item.fixedOdds}}</b></p>
            <table v-if="item.playType!=3">
                <tbody>
                    <tr>
                        <td>{{item.playType=='1'?'胜负':item.playType=='2'?'让分':'大小分'}}</td>
                        <td>
                            <p v-show="!item.visitingCell||item.isShow==0"></p>
                            <div @click="kClick(item,mixObj)" :class="item.visitingCell&&item.visitingCell.isSelected&&item.visitingCell.isSelected=='1'?'selected':''">
                                <span>{{item.visitingCell||item.isShow!=0?item.visitingCell.cellName:'停售'}}</span>
                                <span>{{item.visitingCell||item.isShow!=0?item.visitingCell.cellOdds:''}}</span>
                            </div>
                        </td>
                        <td>
                            <p v-show="!item.homeCell||item.isShow==0"></p>
                                <div @click="zClick(item,mixObj)" :class="item.homeCell&&item.homeCell.isSelected&&item.homeCell.isSelected=='1'?'selected':''">
                                <span>{{item.homeCell||item.isShow!=0?item.homeCell.cellName:'停售'}}</span>
                                <span>{{item.homeCell||item.isShow!=0?item.visitingCell.cellOdds:''}}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-else class="sfc_mix">
                <tbody>
                    <tr>
                        <td rowspan="2" style="background:#8bc53f;">客胜</td>
                        <td class="wks" v-if="!item.visitingCell">未开售</td>
                        <td v-else @click="sfcClick(k,mixObj,'k')" v-for="(k,index) in item.visitingCell.cellSons.slice(0,3)" :key='index' :class="k.isSelected&&k.isSelected=='1'?'selected':''">
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="wks" v-if="!item.visitingCell">未开售</td>
                        <td v-else @click="sfcClick(k,mixObj,'k')" v-for="(k,index) in item.visitingCell.cellSons.slice(3,6)" :key='index' :class="k.isSelected&&k.isSelected=='1'?'selected':''">
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2"  style="background:#eb6d8e;">主胜</td>
                        <td class="wks" v-if="!item.homeCell">未开售</td>
                        <td v-else @click="sfcClick(k,mixObj,'z')" v-for="(k,index) in item.homeCell.cellSons.slice(0,3)" :key='index' :class="k.isSelected&&k.isSelected=='1'?'selected':''">
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="wks" v-if="!item.homeCell">未开售</td>
                        <td v-else @click="sfcClick(k,mixObj,'z')" v-for="(k,index) in item.homeCell.cellSons.slice(3,6)" :key='index' :class="k.isSelected&&k.isSelected=='1'?'selected':''">
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="confim_btn fixBottom">
            <p @click="confirm()">确定</p>
            <p @click="cancel()">取消</p>
        </div>
    </div>
</template>
<script src='./script.js'>
    // import http from '../api/http'

</script>