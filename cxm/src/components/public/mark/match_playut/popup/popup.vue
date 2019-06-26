<style lang='scss' scoped src='./style.scss'>

</style>

<template>
  <!-- 数字键盘 -->
            <div @touchmove.prevent class="popup">
                <div class="box">
                    <img src="../../../../../assets/img/freebuy_img/Collapse@3x.png" @click="closeMark()">
                    <div>
                        倍数<p>{{mup}}</p>
                    </div>
                </div>
                <ul class="list clearfix">
                   <li v-for="(item,i) in mapArr" :key='i' @click="mupNumber(item,$event)">{{item}}倍</li>
                </ul>
                <div class="box1 clearfix">
                    <ul class="clearfix">
                        <li v-for="(item,i) in numList" :key='i' @click="numClick(item,$event)">{{item}}</li>
                    </ul>
                    <div class="select fixBottom">
                        <p @click="deleteNum($event)">删除</p>
                        <p class="cur" @click="confirm_num()">确定</p>
                    </div>
                </div>
            </div>
</template>
<script src='./script.js'>

</script>
