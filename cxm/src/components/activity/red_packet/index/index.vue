<style lang='scss' scoped src='./style.scss'>

</style>

<template>
    <div class="packetindex">
        <div class="pack_center">
            <img src="../image/xin_banner.jpg" class="imgTop" @click.prevent>
            <div class="time">
                <h5>活动倒计时</h5>
                <v-countDown :endTime="packet.endTime" :callback="callback"></v-countDown>
            </div>
            <!--首页-->
			<div class="carousel">
				<div class="scroll-wrap">
                    <i></i>
                    <em></em>
					<ul class="scroll-content" :style="{top}">
						<li v-for="(data,item) in y_Carousel" :key='item' v-html="data.winningMsg+''+data.winningMoney+'元'">
						</li>
					</ul>
				</div>
			</div>
            <div class="box">
                <ul>
                    <li v-for='(item,i) in packet.rechargeCardList' :key='i'>
                        <div v-bind:class="{'img3':item.type == 0,'img5':item.type == 1}">
                            <!--<i ></i>-->
                            <p v-bind:class="{'disnone':item.type == 0}">
                                <b>￥</b><span>{{item.realValue}}</span>
                                <span>元</span>
                            </p>
                            <p v-bind:class="{'mtop':item.type == 0}">{{item.description}}</p>
                        </div>
                        <div @click="btn(item.realValue, item.type)" class="btn"></div>
                    </li>
                </ul>
                <div class="rule">
                    <h5>注意事项</h5>
                    <div>
                        <p>1、本活动时间为即日起至X月X日X时，具体使用范围以红包券显示为准，请至个人中心“我的卡券”中查看。</p>
                        <p>2、只有通过活动页面充值对应金额，才能参与充值送红包活动。</p>
                        <p>3、用户只能在活动页面领取活动资格后，才能参与充值活动。</p>
                        <p>4、参与活动的充值金额，仅限购彩使用，不可提现，中奖奖金可以提现。</p>
                        <p>5、本活动最终解释权归平台所有，如有疑问请拨打客服电话：400-012-6600。</p>
                    </div>
                </div>
                <div class="heit"></div>
            </div>
        </div>
    </div>
</template>
<script src='./script.js'>

</script>
