<style lang='scss' scoped src='./style.scss'>

</style>

<!--消息中心-->
<template>
	<div class="wrap give">
		<div class="box">
			<p class="p1"><i>￥</i>{{giveObj.amount}}</p>
			<p class="chuli">{{giveObj.status}}</p>
		</div>
		<div class="give_cen">
			<b v-if="giveObj.userWithdrawLogs&&giveObj.userWithdrawLogs.length>0"></b>
			<div class="sent" v-for="(item,i) in giveObj.userWithdrawLogs" :key='i'>
				<div class="txSuccess">
					<p><em><i class="iconfont icon-icon-29" :style="{'color':item.logTime!==''?'#ea5504':'#9f9f9f'}"></i></em><span>{{item.logName}}</span></p><p>{{dateFter(item.logTime)}}</p></div>
		</div>
	</div>
	<section class=" wechat">
		<ul class="msg_list">
			<li>
				<a>
					<div>
						<span class="message">提取到</span>
						<p>{{giveObj.card}}</p>
					</div>
				</a>
			</li>
		</ul>
	</section>
	</div>
</template>

<script src='./script.js'>
	// import http from '../api/http'
</script>