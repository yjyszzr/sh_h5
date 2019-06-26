<template>
    <div class="mark_playutBox">
        <div class="mark_playut" @click='closeMarkCzZz()' @touchmove.prevent>

        </div>
        <transition name="translate"> 
            <!-- 串关 -->
            <div @touchmove.prevent class="mark_footer" v-if="markStatus=='1'">
                <p>可选串关方式</p>
                <ul>
                    <li @click="changeColor($event,item)" :class="$store.state.mark_playObj.playutText.indexOf(item)==-1?'':'current'" v-for="(item,i) in $store.state.mark_playObj.playtList" :key='i'>
                        {{item=='1&1'?'单关':item.replace('&','串')}}
                    </li>
                </ul>
                <button>
                    <a class="pop_cur" @click="confirm()">确定</a>
                    <a @click="closeMarkCz()">取消</a>
                </button>
            </div>
            <!-- 优惠券 -->
            <div class="yhMark" v-if="markStatus=='3'">
                <div class="yh_title">
                    可用优惠券
                </div>
                <ul class="yhList">
                    <li v-for="(item,i) in $store.state.mark_playObj.yhList" :key='i' @click="bounsSelected(item,i)">
                        <p>
                            <span>¥</span>
                            <span>{{item.bonusPrice}}</span>
                        </p>
                        <p>
                            <span>{{item.minGoodsAmount}}</span>
                            <span>{{item.useRange}}</span>
                        </p>
                        <p ref="userBonusIdS" :class="item.userBonusId == $store.state.mark_playObj.bounsId?'bounsId':''">
                            
                        </p>
                    </li>
                </ul>
                <div class="yhBtn" @click="yhBtn()">
                    确定
                </div>
            </div>
            <v-banklist @closeMarkCz="closeMarkCz()" v-if="markStatus=='banklist'"></v-banklist>
            <v-popup @closeMarkCz="closeMarkCz()" v-if="markStatus=='2'"></v-popup>
            <!-- 比分，版全场，混合 -->
            <v-score @closeMarkCz="closeMarkCz()" v-if="markStatus=='4'"></v-score>
            <v-bqc @closeMarkCz="closeMarkCz()" v-if="markStatus=='5'"></v-bqc>
            <v-mix @closeMarkCz="closeMarkCz()" v-if="markStatus=='6'"></v-mix>
            <!-- 赛事详情 -->
            <v-matchdetail @closeMarkCz="closeMarkCz()" v-if="markStatus=='7'"></v-matchdetail>
        </transition>
    </div>
</template>

<script src='./script.js'>

</script>


<style lang='scss' src='./style.scss'>

</style>

