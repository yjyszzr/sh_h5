<style lang='scss' scoped src='./style.scss'>
</style>

<template>
    <div class="incomedetail">
        <div class="bassand">
            <ul class="box_list_1">
                <li>时间</li>
                <li>用户ID</li>
                <li>收入类型</li>
                <li>收入(元)</li>
            </ul>
            <div class="box_list">
                <ul class="box_list_2" v-for='(item,i) in incomedetail' :key='i'>
                    <li>{{item.addTime.split('  ')[1]}}</li>
                    <li>{{item.mobile}}</li>
                    <li>{{item.incomeType}}</li>
                    <li style="color: #e95504;">{{item.income }}</li>
                </ul>
            </div>
            <div class="nullstatus" v-if="incomedetail.length==0">
                <img src="../../../../assets/img/juan.png" alt="">
                <span>暂无数据</span>
            </div>
        </div>
        <div class="box_div fixBottom" @click="goInclude()">如何计算收益</div>
    </div>
</template>

<script src="./script.js">

</script>