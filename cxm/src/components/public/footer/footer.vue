<template>
    <div class="foot fixBottom" @touchmove.prevent v-if="isShowTabbar">
            <router-link to='/' :style="{'color': $route.path.split('/')[1] == ''?'#dc3c32':'#505050'}">
                <i class="iconfont icon-index"></i>
                <span>大厅</span>
            </router-link>
            <router-link to='/lotteryResult' :style="{'color': $route.path.split('/')[1] == 'lotteryResult'?'#dc3c32':'#505050'}">
                <i class="iconfont icon-bisai"></i>
                <span>比赛</span>
            </router-link>
            <router-link :to='{path:"/find",query:{"from":"h5_find"}}' :style="{'color': $route.path.split('/')[1] == 'find'?'#dc3c32':'#505050'}">
                <i class="iconfont icon-faxian"></i>
                <span>发现</span>
            </router-link>
            <router-link to='/user' :style="{'color': $route.path.split('/')[1] == 'user'?'#dc3c32':'#505050'}" v-show="$store.state.version!='zx'">
                <i class="iconfont icon-wodedefuben1"></i>
                <span>我的</span>
            </router-link>
    </div>
</template>

<script>
export default {
	data() {
		return {
            isShowTabbar: false
		}
	},
    watch:{
        $route(a,b){
            let routeLength = this.$route.path.split('/').length
			if(routeLength > 2||this.$route.name=='404'){
                this.isShowTabbar = false
            }else{
                this.isShowTabbar = true
            }
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
        a:nth-child(3),a:nth-child(2){
        	i{
                font-size: px2rem(48px);
            }
            span{
                margin-bottom: px2rem(-4px);
            }
        }
    }
</style>

