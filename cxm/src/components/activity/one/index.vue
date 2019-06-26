<style lang='scss' scoped src='./style.scss'>
</style>

<template>

<div class="activityOne">
	<img class="header-img" src="./img/header.jpg" alt="">
	<div class="reg-bouns">
		<div class="reg-title">
			注册领红包
		</div>
		<div class="reg-tel">
            <i class="iconfont icon-huaban-"></i>
            <input type="tel" v-model="mobileVal" placeholder="请输入手机号" class="text"/>
        </div>
		<div class="reg-code">
			<div class="code-box">
				<i class="iconfont icon-huaban-2"></i>
            	<input v-model="telVal" type="tel" placeholder="请输入验证码" class="text1"/>
			</div>
            <button :disabled='stop' @click="changeNum()" v-html="stop?remainTime+'秒后重新获取':'获取验证码'"></button>
        </div>
	</div>
	<div class="lqBtn">
		<img @click="lqbtn()" src="./img/btn.jpg" alt="">
	</div>
	<div class="reg-rule">
		<div class="rule-title">
			规则说明
		</div>
		<div class="rule-content">
			<p>1.本活动为新用户专享，同一设备及同一手机号只能参与一次。</p>
			<p>2.完成注册即可领取100元新人专享优惠券，获得的优惠券可点击“我的”-“我的卡券”查看。</p>
			<p>3.如有用户通过软件恶意、重复注册等方式参与活动，均视为作弊，平台有权冻结、封禁账号、要求返还违规获利，并保留追责权利。</p>
			<p>4.如遇不可抗因素，平台有权在活动期间更改活动规则，用户请及时关注公告。</p>
			<p>5.本活动最终解释权归平台所有，如有任何疑问，请咨询客服电话：400-012-6600。</p>
		</div>
	</div>
</div>
  
</template>
<script src='./script.js'>
</script>
