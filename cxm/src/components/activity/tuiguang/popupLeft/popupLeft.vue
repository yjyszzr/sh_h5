<template>
    <div class="popupLeft">
        <mt-search v-model="value" placeholder="保利拉菲公馆店/北二环店/安东街店">
            
        </mt-search>
        <!-- <ul v-for="(item,i) in list" :key='i'> 
                <li>{{item}}</li>
        </ul> -->
        <!-- <p v-for="(entry,i) in filteredData" :key="i" class="item" @click='popClick(entry)'>  
            {{entry.name}}
        </p>   -->
        <div class="dzList">
            <p v-for="(entry,i) in list" :key="i" class="item" @click='popClick(entry)'>  
                {{entry.name}}
            </p>  
        </div>
        <div class="nullstatus" v-if="list.length==0">
            <img src="../../../../assets/img/juan.png" alt="">
            <span>暂无数据</span>
        </div>
    </div>
</template>
<style lang='scss' src='./style.scss'>

</style>
<script src='./script.js'>

</script>


