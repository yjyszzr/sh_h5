<style lang='scss' src='./style.scss'>
</style>
<template>
    <div class="sfc" @touchmove.prevent>
        <div class="sfc-top">
            <p><span>[客]</span>{{sfcObj.visitingTeamAbbr}}</p>
            <p>VS</p>
            <p><span>[主]</span>{{sfcObj.homeTeamAbbr}}</p>
        </div>
        <table class="sfc-ktable" v-if="scoreObj.matchPlays">
                <tbody>
                    <tr>
                        <td rowspan="2" style="background:#8bc53f;">客胜</td>
                        <td class="wks" v-if="!scoreObj.matchPlays[0].visitingCell">未开售</td>
                        <td v-else :class="k.isSelected&&k.isSelected=='1'?'selected':''" @click="sfcClick(k,scoreObj,'k')" v-for="(k,index) in scoreObj.matchPlays[0].visitingCell.cellSons.slice(0,3)" :key='index'>
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="wks" v-if="!scoreObj.matchPlays[0].visitingCell">未开售</td>
                        <td v-else :class="k.isSelected&&k.isSelected=='1'?'selected':''" @click="sfcClick(k,scoreObj,'k')" v-for="(k,index) in scoreObj.matchPlays[0].visitingCell.cellSons.slice(3,6)" :key='index'>
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                </tbody>
        </table>
        <table class="sfc-ztable" v-if="scoreObj.matchPlays">
            <tbody>
                <tr>
                        <td rowspan="2"  style="background:#eb6d8e;">主胜</td>
                        <td class="wks" v-if="!scoreObj.matchPlays[0].homeCell">未开售</td>
                        <td v-else :class="k.isSelected&&k.isSelected=='1'?'selected':''" @click="sfcClick(k,scoreObj,'z')" v-for="(k,index) in scoreObj.matchPlays[0].homeCell.cellSons.slice(0,3)" :key='index'>
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="wks" v-if="!scoreObj.matchPlays[0].homeCell">未开售</td>
                        <td v-else :class="k.isSelected&&k.isSelected=='1'?'selected':''" @click="sfcClick(k,scoreObj,'z')" v-for="(k,index) in scoreObj.matchPlays[0].homeCell.cellSons.slice(3,6)" :key='index'>
                            <span>{{k.cellName}}</span>
                            <span>{{k.cellOdds}}</span>
                        </td>
                    </tr>
            </tbody>
        </table>
        <div class="confim_btn fixBottom">
            <p @click="confirm()">确定</p>
            <p @click="cancel()">取消</p>
        </div>
    </div>
</template>
<script src='./script.js'>
// import http from '../api/http'
</script>