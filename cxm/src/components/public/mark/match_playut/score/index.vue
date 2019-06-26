<style lang='scss' src='./style.scss'>

</style>
<template>
    <div class="wrap score" @touchmove.prevent>
        <section>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table">
                <caption>
                    <p>{{scoreObj.homeTeamAbbr}}</p>
                    <p>VS</p>
                    <p>{{scoreObj.visitingTeamAbbr}}</p>
                </caption>
                <th rowspan="3" class="title0">胜</th>
                <tr class="title">
                    <th :class="scoreList.indexOf(item.cellName)!=-1?'bfSelected':''" v-for="(item,i) in !scoreObj.flag?scoreObj.matchPlays[0].homeCell.cellSons:[]" :key='i'><b @click="bfClick($event)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
            </table>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table">
                <th rowspan="3" class="title1">平</th>
                <tr class="title">
                    <th :class="scoreList.indexOf(item.cellName)!=-1?'bfSelected':''" v-for="(item,i) in !scoreObj.flag?scoreObj.matchPlays[0].flatCell.cellSons:[]" :key='i'><b @click="bfClick($event)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
            </table>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table">
                <th rowspan="3" class="title2">负</th>
                <tr class="title">
                    <th :class="scoreList.indexOf(item.cellName)!=-1?'bfSelected':''" v-for="(item,i) in !scoreObj.flag?scoreObj.matchPlays[0].visitingCell.cellSons:[]" :key='i'><b @click="bfClick($event)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
            </table>
            <div class="confim_btn fixBottom">
                <p @click="confirm()">确定</p>
                <p @click="cancel()">取消</p>
            </div>
        </section>
    </div>
</template>
<script src='./script.js'>
    // import http from '../api/http'

</script>