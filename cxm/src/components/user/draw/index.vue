<style lang='scss' scoped src='./style.scss'>

</style>

<template>
    <div class="wrap draw">
        <p class="p1">方案编号：<span>{{drawObj.programmeSn}}</span></p>
        <ul>
            <div class="title">
                <p>投注内容</p>
                <p>过关方式</p>
                <p>倍数</p>
                <p>状态</p>
            </div>
            <li v-for='(item,i) in drawObj.ticketSchemeDetailDTOs' :key='i'>
                <!-- <div class="item"><span>周四001（负1.43）X</span><span>周四002（胜1.25）X</span><span>周四003（负1.32）</span></div> -->
                <div class="item">
                    <!-- <span v-for="(item,i) in item.tickeContent.split('X')">

                    </span> -->
                    {{item.tickeContent}}
                </div>
                <div class="item">{{item.passType}}</div>
                <div class="item">{{item.multiple}}倍</div>
                <div class="item" style="color: #ea5504;">{{statusZt(item.status)}}</div>
            </li>
        </ul>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

