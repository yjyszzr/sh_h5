<style lang='scss' src='./style.scss'>
</style>
<template>
    <div class="bankList">
        <div class="bk_title">
            选择支付方式
        </div>
        <ul class="bkList">
            <li v-for="(item,i) in xfbklist" :key='i'>
                <span @click="bkClick(item)">{{item.message}}</span>
                <span @click="deletelist(item)">删除</span>
            </li>
            <div class="tjxk" @click="tjxkClick()">
                <span>使用新卡支付</span>
                <img src="../../../../../assets/img/add.png" alt="">
            </div>
        </ul>
    </div>
</template>
<script src='./script.js'>
// import http from '../api/http'
</script>