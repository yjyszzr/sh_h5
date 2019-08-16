<template>
  <div id="mygrossincome">
    <!-- 头部 -->
    <div class="mgin-head">
      <div class="mh-top">
        <div class="mh-t-l">
          <p>历史总收益(元)</p>
          <p>{{mgriData.history_total_withdrawable_reward}}</p>
        </div>
        <div class="mh-t-r" @click="hd_alert()">
          <p>可提现收益(元)<img src='../img/wenh.png' /></p>
          <p>{{mgriData.withdrawable_reward}}</p>
        </div>
      </div>
      <div class="mh-btm" @click="switchTo()">转入可提现账户</div>
    </div>
    <!-- 主体 -->
    <div class="mgin-body">
      <div class="mb-top">
        <p>收益明细</p>
        <mt-switch v-model="value" @change="turnOn"></mt-switch>
      </div>
      <div class="blx">
        <span v-for="(item,i) of 28" :key="i"></span>
      </div>
      <transition name="downMove">
        <div v-show="turn">
          <div class="mb-list-box">
            <div class="mb-list">
              <div class="mb-item" v-for="(item,i) of mgriData.accountList" :key='i'>
                <p>{{item.title}}</p>
                <p>
                  <span>
                    {{item.remark}}
                    <b :style="{'color':item.type=='7'?'#31b0df':'#DF313F'}">{{item.type=='7'?'-'+item.reward_money:'+'+item.reward_money}}元</b>
                  </span>
                  <span>{{dateGsh(item.add_time)}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="blx2" v-show="turn">
            <span v-for="(item,i) of 28" :key="i"></span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script src='./script.js'>
</script>

<style src='./style.scss' lang='scss'>
</style>
