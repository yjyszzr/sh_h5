<template>
    <div class="foot fixBottom" @touchmove.prevent v-if="isShowTabbar()">
            <router-link to='/' :style="{'color': $route.path.split('/')[1] == ''?'#ea5504':'#505050'}">
                <i class="iconfont icon-dibucaidan_svg_huaban"></i>
                <span>大厅</span>
            </router-link>
            <router-link to='/lotteryResult' :style="{'color': $route.path.split('/')[1] == 'lotteryResult'?'#ea5504':'#505050'}">
                <i class="iconfont icon-dibucaidan_svg_huabanfuben"></i>
                <span>比赛</span>
            </router-link>
            <router-link :to='{path:"/find",query:{"from":"h5_find"}}' :style="{'color': $route.path.split('/')[1] == 'find'?'#ea5504':'#505050'}">
                <i class="iconfont icon-icon-test"></i>
                <span>发现</span>
            </router-link>
            <router-link to='/user' :style="{'color': $route.path.split('/')[1] == 'user'?'#ea5504':'#505050'}">
                <i class="iconfont icon-dibucaidan_svg_huabanfuben1"></i>
                <span>我的</span>
            </router-link>
    </div>
</template>

<script>
export default {
	data() {
		return {
            
		}
	},
	methods: {
		isShowTabbar () {
            let routeLength = this.$route.path.split('/').length
			return routeLength > 2||this.$route.name=='404' ? false : true
		}
	}
}
</script>

<style lang='scss'>
    @import '../../../assets/css/function.scss';
    .foot {
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        border-top: 1px solid #f0f0f0;
        height: px2rem(98px);
        display: flex;
        background: white;
        position: relative;
        z-index: 10;
        a {
            // flex:1;
            display: flex;
            background: white;
            flex-grow: 1;
            flex-shrink: 1;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            i{
                font-size: px2rem(52px);
            }
            span{
                font-size: px2rem(20px); 
            }
        }
        a:nth-child(3){
        	i{
                font-size: px2rem(49px);
            }
            span{
                margin-bottom: px2rem(-4px);
            }
        }
    }
</style>

