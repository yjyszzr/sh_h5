<style lang='scss' scoped src='./style.scss'>
</style>

<template>
    <div class="income">
        <ul class="box_list_1">
            <li>时间</li>
            <li>注册人数</li>
            <li>购彩消费(元)</li>
            <li>收入(元)</li>
            <li></li>
        </ul>
        <ul @click="golist(item.time)" class="box_list_2" v-for='(item,i) in income' :key='i'>
            <li>{{item.time}}</li>
            <li>{{item.registerNum }}</li>
            <li>{{item.lotteryAmount}}</li>
            <li style="color: #e95504;">{{item.income }}</li>
            <li class="arrow_right float_right"></li>
        </ul>
        <div class="nullstatus" v-if="income.length==0">
            <img src="../../../../assets/img/juan.png" alt="">
            <span>暂无数据</span>
        </div>
    </div>
</template>
<script src='./script.js'>

</script>
