<style lang='scss' scoped src='./style.scss'>

</style>

<template>
    <!-- <h2>活动首页</h2> -->
    <div class="twoActive">
        <div class="box1">
            <p>推广总收入（元）</p>
            <p>{{explain.channelDistributor?explain.channelDistributor.totalAmount:'0.0'}}<i>元</i></p>
            <p>今日+{{explain.channelDistributor?explain.channelDistributor.todayAmount:'0.0'}}</p>
            <b @click="goExplain()">活动说明</b>
        </div>
        <ul class="list">
            <a @click="detail(explain.channelDistributor.userId)"><img src="../tuiguang/img.png">收入明细</a>
            <a @click="goCode()"><img src="../tuiguang/img2.png">我的二维码</a>
        </ul>
        <div class="statistics">
            <p><i></i>推广数据统计</p>
            <ul>
                <li><span>{{explain.inviteNum}}名</span>邀请用户数量</li>
                <li><span>{{explain.bettingTotalAmount}}元</span>邀请用户的投注金额</li>
                <li v-if="explain.channelDistributor"><span>第{{explain.channelDistributor.ranking}}名</span>我的收入排名</li>
            </ul>
        </div>
        <div class="ranking">
            <p><img src="../tuiguang/img1.png">收入排行榜</p>
            <ul class="box_ul1">
                <li>名次</li>
                <li>推广员</li>
                <li>额外奖励<i @click="go_tost()">?</i></li>
                <li>总收入（元）</li>
            </ul>
            <ul v-bind:class="{'listed':item.ranking == 1 || item.ranking == 2 || item.ranking == 3}" class="box_ul2" v-for='(item,i) in explain.channelDistributorList' :key='i'>
                <li v-bind:class="{'list_img': item.ranking == 1, 'list_img1':item.ranking == 2,'list_img2':item.ranking == 3,}">{{item.ranking}}</li>
                <li>{{item.distributorMobile}}</li>
                <li>{{item.totalAmount*1>0?item.extraReward:0.0}}元</li>
                <li>{{item.totalAmount}}</li>
            </ul>
        </div>
    </div>
</template>
<script src='./script.js'>

</script>
