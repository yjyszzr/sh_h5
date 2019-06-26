<style lang='scss' src='./style.scss'></style>
<template>
	<div class="odds">
		<ul class="odd_ul" :class="isFixed?'isFixed':''">
			<li class="odd_cur">
				<p @click="deTailTab($event,'1')"></p><span>欧赔</span></li>
			<li>
				<p @click="deTailTab($event,'2')"></p><span>亚盘</span></li>
			<li>
				<p @click="deTailTab($event,'3')"></p><span>大小球</span></li>
		</ul>
		<div class="cen_list1" v-if="dFlag=='1'">
			<ul class="box_list_1">
				<li>公司</li>
				<li></li>
				<li>胜</li>
				<li>平</li>
				<li>负</li>
			</ul>
			<div class="box_list_2">
				<ul v-for="(data,i) in leagueMatchEuropes" :key='i'>
					<li>{{data.comName}}</li>
					<li><span>初始</span><span>即时</span></li>
					<li><i>{{data.initWin}}</i>
						<i v-if="data.winChange=='0'">{{data.realWin}}</i>
						<i v-if="data.winChange=='1'" style="color: #ea5504;">{{data.realWin}}↑</i>
						<i v-if="data.winChange=='2'" style="color: rgb(68, 174, 53);">{{data.realWin}}↓</i>
					</li>
					<li><i>{{data.initDraw}}</i>
						<i v-if="data.drawChange=='0'">{{data.realDraw}}</i>
						<i v-if="data.drawChange=='1'" style="color: #ea5504;">{{data.realDraw}}↑</i>
						<i v-if="data.drawChange=='2'" style="color: rgb(68, 174, 53);">{{data.realDraw}}↓</i>
					</li>
					<li><i>{{data.initLose}}</i>
						<i v-if="data.loseChange=='0'">{{data.realLose}}</i><i v-if="data.loseChange=='1'" style="color: #ea5504;">{{data.realLose}}↑</i><i v-if="data.loseChange=='2'" style="color: rgb(68, 174, 53);">{{data.realLose}}↓</i>
					</li>
				</ul>
			</div>
		</div>
		<div class="cen_list2" v-if="dFlag=='2'">
			<ul class="box_list_1">
				<li>公司</li>
				<li></li>
				<li>主水</li>
				<li>盘口</li>
				<li>客水</li>
			</ul>
			<div class="box_list_2">
				<ul v-for="(data,i) in leagueMatchAsias" :key='i'>
					<li>{{data.comName}}</li>
					<li><span>初始</span><span>即时</span></li>
					<li><i>{{data.initOdds1}}</i>
						<i v-if="data.odds1Change=='0'">{{data.realOdds1}}</i>
						<i v-if="data.odds1Change=='1'" style="color: #ea5504;">{{data.realOdds1}}↑</i>
						<i v-if="data.odds1Change=='2'" style="color: rgb(68, 174, 53);">{{data.realOdds1}}↓</i>
					</li>
					<li><i>{{data.initRule}}</i><i>{{data.realRule}}</i></li>
					<li><i>{{data.initOdds2}}</i>
						<i v-if="data.odds2Change=='0'">{{data.realOdds2}}</i><i v-if="data.odds2Change=='1'" style="color: #ea5504;">{{data.realOdds2}}↑</i><i v-if="data.odds2Change=='2'" style="color: rgb(68, 174, 53);">{{data.realOdds2}}↓</i>
					</li>
				</ul>
			</div>
		</div>
		<div class="cen_list3" v-if="dFlag=='3'">
			<ul class="box_list_1">
				<li>公司</li>
				<li></li>
				<li>大球</li>
				<li>盘口</li>
				<li>小球</li>
			</ul>
			<div class="box_list_2">
				<ul v-for="(data,i) in leagueMatchDaoxiaos" :key='i'>
					<li>{{data.comName}}</li>
					<li><span>初始</span><span>即时</span></li>
					<li><i>{{data.initWin}}</i>
						<i v-if="data.winChange=='0'">{{data.realWin}}</i>
						<i v-if="data.winChange=='1'" style="color: #ea5504;">{{data.realWin}}↑</i>
						<i v-if="data.winChange=='2'" style="color: rgb(68, 174, 53);">{{data.realWin}}↓</i>
					</li>
					<li>
						<i>{{data.initDraw}}</i>
						<i v-if="data.drawChange=='0'">{{data.realDraw}}</i>
						<i v-if="data.drawChange=='1'" style="color: #ea5504;">{{data.realDraw}}↑</i>
						<i v-if="data.drawChange=='2'" style="color: rgb(68, 174, 53);">{{data.realDraw}}↓</i>
					</li>
					<li>
						<i>{{data.initLose}}</i>
						<i v-if="data.loseChange=='0'">{{data.realLose}}</i>
						<i v-if="data.loseChange=='1'" style="color: #ea5504;">{{data.realLose}}↑</i>
						<i v-if="data.loseChange=='2'" style="color: rgb(68, 174, 53);">{{data.realLose}}↓</i>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script src='./script.js'>
</script>