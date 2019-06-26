<template>
    <div class="data1" >
        <div class="dt_title">
            日期
        </div>
        <div class="data-box">
            <ul id="sroll-height">
                <li :class="$store.state.mark_showObj.mark_dateVal==list.strDate?'cur':''" v-for="(list,i) in dataList" :key='i' ref='match_name' @click="list_li(list,i)">{{list.strDate}}</li>
            </ul>
        </div>
        <div class="dt_btn">
            <p @click="cancel()">返回</p>
        </div>
    </div>
</template>

<script src='./script.js'>

</script>


<style lang='scss' src='./style.scss'>

</style>