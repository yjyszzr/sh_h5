<style lang='scss' src='./style.scss'>

</style>

<!--账户明细-->
<template>
    <div class="wrap">
        <section class="count">
            <div class="ov_account" >
                <mt-loadmore :bottom-method="loadBottom" :bottom-distance='60' :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleTopChange" @scroll='handleScroll($event)'>
                <div class="zhmxlist" v-for="(item,i) in mxList" :key='i' style="background: white;">
                        <p class="data" style='background: #f4f4f4;' v-if="i==0||(i>0&&item.addTime!=mxList[i-1].addTime)">{{item.addTime}}</p>
                        <ul class="list">
                            <li @click="goTxxq(item.processType,item.payId)">
                               <p class="gczt" :style="{'background':bg_Color(item.processType)}">{{item.processTypeChar}}</p>
                                <div>
                                    <p>{{item.processTypeName}}<i :style="{'color':item.processType=='1'?'#ea5504':'#505050'}">{{item.changeAmount}}<em v-if="item.processType==4" class="iconfont icon-icon-14"></em></i></p>
                                    <b v-html='item.note'></b>
                                    <span>{{item.shotTime}}<i v-if="item.processType==4">{{item.status}}</i></span>
                                </div>
                            </li>
                        </ul>
                </div>
                <div class="nullstatus" v-if="mxList.length==0">
                    <img src="../../../assets/img/juan.png" alt="">
                    <span>暂无明细数据</span>
                </div>
                <p class="loadingText" v-show="bottomStatus !== 'loading'&&mxList.length>0">{{loadText}}</p>
                <div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
					<mt-spinner :type="1" v-show="bottomStatus === 'loading'" color="#e82822"></mt-spinner>
				</div>
			</mt-loadmore>
            </div>
                <div class="section base fixBottom" style="display:none;">
                    <p>合计:<i></i></p>
                    <p>充值<span>{{totalNum.rechargeMoney}}元</span>，提现<span>{{totalNum.withDrawMoney}}元</span>，购彩<span>{{totalNum.buyMoney}}元</span> ，中奖<span>{{totalNum.rewardMoney}}元</span></p>
            </div>
        </section>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>