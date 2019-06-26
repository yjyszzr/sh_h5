<style lang='scss' src='./style.scss'>

</style>
<template>
    <div class="wrap mix">
        <section>
            <div class="mixTitle">
                <p>{{scoreObj.homeTeamAbbr}}</p>
                <p>VS</p>
                <p>{{scoreObj.visitingTeamAbbr}}</p>
            </div>
            <div style="height: 11.2rem;overflow: auto;-webkit-overflow-scrolling: touch;">
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table tablespf">
                <th rowspan="3" class="title0">胜平负</th>
                <tr class="titleNull" v-if="!scoreObj.flag&&scoreObj.matchPlays[1].isShow=='0'">
                    暂未开售
                </tr>
                <tr class="title" v-if="!scoreObj.flag&&scoreObj.matchPlays[1].isShow!='0'">
                    <th :class="!scoreObj.flag&&scoreObj.matchPlays[1].homeCell.isSelected?'bfSelected':''">
                        <b @click="unSelectedClickspf($event,scoreObj.matchPlays[1].homeCell,'2',scoreObj.matchPlays[1].single,scoreObj.matchPlays[1].fixedOdds)"></b>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[1].homeCell.cellName:''}}</span>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[1].homeCell.cellOdds:''}}</span>
                    </th>
                    <th :class="!scoreObj.flag&&scoreObj.matchPlays[1].flatCell.isSelected?'bfSelected':''">
                        <b @click="unSelectedClickspf($event,scoreObj.matchPlays[1].flatCell,'2',scoreObj.matchPlays[1].single,scoreObj.matchPlays[1].fixedOdds)"></b>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[1].flatCell.cellName:''}}</span>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[1].flatCell.cellOdds:''}}</span>
                    </th>
                    <th :class="!scoreObj.flag&&scoreObj.matchPlays[1].visitingCell.isSelected?'bfSelected':''">
                        <b @click="unSelectedClickspf($event,scoreObj.matchPlays[1].visitingCell,'2',scoreObj.matchPlays[1].single,scoreObj.matchPlays[1].fixedOdds)"></b>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[1].visitingCell.cellName:''}}</span>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[1].visitingCell.cellOdds:''}}</span>
                    </th>
                </tr>
            </table>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table tablerqspf">
                <th rowspan="3" class="title0">让球<br/>{{!scoreObj.flag?scoreObj.matchPlays[0].fixedOdds:''}}</th>
                <tr class="title">
                    <th :class="!scoreObj.flag&&scoreObj.matchPlays[0].homeCell.isSelected?'bfSelected':''">
                        <b @click="unSelectedClickspf($event,scoreObj.matchPlays[0].homeCell,'1',scoreObj.matchPlays[0].single,scoreObj.matchPlays[0].fixedOdds)"></b>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[0].homeCell.cellName:''}}</span>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[0].homeCell.cellOdds:''}}</span>
                    </th>
                    <th :class="!scoreObj.flag&&scoreObj.matchPlays[0].flatCell.isSelected?'bfSelected':''">
                        <b @click="unSelectedClickspf($event,scoreObj.matchPlays[0].flatCell,'1',scoreObj.matchPlays[0].single,scoreObj.matchPlays[0].fixedOdds)"></b>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[0].flatCell.cellName:''}}</span>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[0].flatCell.cellOdds:''}}</span>
                    </th>
                    <th :class="!scoreObj.flag&&scoreObj.matchPlays[0].visitingCell.isSelected?'bfSelected':''">
                        <b @click="unSelectedClickspf($event,scoreObj.matchPlays[0].visitingCell,'1',scoreObj.matchPlays[0].single,scoreObj.matchPlays[0].fixedOdds)"></b>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[0].visitingCell.cellName:''}}</span>
                        <span>{{!scoreObj.flag?scoreObj.matchPlays[0].visitingCell.cellOdds:''}}</span>
                    </th>
                </tr>
            </table>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table tableBf">
                <th rowspan="3" class="title0">比分</th>
                <tr class="title">
                    <th :class="item.isSelected?'bfSelected':''" v-for="(item,i) in scoreObj.matchPlays?scoreObj.matchPlays[2].homeCell.cellSons:[]" :key='i'><b @click="unSelectedClickspf($event,item,'3',scoreObj.matchPlays[2].single,scoreObj.matchPlays[2].fixedOdds)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
                <tr class="title">
                    <th :class="item.isSelected?'bfSelected':''" v-for="(item,i) in scoreObj.matchPlays?scoreObj.matchPlays[2].flatCell.cellSons:[]" :key='i'><b @click="unSelectedClickspf($event,item,'3',scoreObj.matchPlays[2].single,scoreObj.matchPlays[2].fixedOdds)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
                <tr class="title">
                    <th :class="item.isSelected?'bfSelected':''" v-for="(item,i) in scoreObj.matchPlays?scoreObj.matchPlays[2].visitingCell.cellSons:[]" :key='i'><b @click="unSelectedClickspf($event,item,'3',scoreObj.matchPlays[2].single,scoreObj.matchPlays[2].fixedOdds)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
            </table>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table tablezjq">
                <th rowspan="3" class="title0">总进球</th>
                <tr class="title">
                    <th :class="item.isSelected?'bfSelected':''" v-for="(item,i) in !scoreObj.flag?scoreObj.matchPlays[3].matchCells:[]" :key='i'><b @click="unSelectedClickspf($event,item,'4',scoreObj.matchPlays[3].single,scoreObj.matchPlays[3].fixedOdds)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
            </table>
            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"  class="table tableBqc">
                <th rowspan="3" class="title0">半全场</th>
                <tr class="title">
                    <th :class="item.isSelected?'bfSelected':''" v-for="(item,i) in !scoreObj.flag?scoreObj.matchPlays[4].matchCells:[]" :key='i'><b @click="unSelectedClickspf($event,item,'5',scoreObj.matchPlays[4].single,scoreObj.matchPlays[4].fixedOdds)"></b><span>{{item.cellName}}</span> <span>{{item.cellOdds}}</span></th>
                </tr>
            </table>
            </div>
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