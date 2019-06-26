<template>
    <div class="mark">
        <div class="mark_box">
            
        </div>
        <!-- 赛事筛选 -->
        <v-matchfilter></v-matchfilter>
    </div>
</template>

<script>
    import matchFilter from './match_fliter/match_filter.vue'
	export default {
        name: 'mark',
        components: {
            'v-matchfilter': matchFilter
        },
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>


<style lang='scss'>
    @import '../../../assets/css/function.scss';
    .mark{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 300;
        .mark_box{
            background: white;
            border-radius: px2rem(5px); 
            .matchFilter{
                width: px2rem(652px);
                .ft_title{
                    text-align: center;
                    font-size: px2rem(30px);
                    height: px2rem(100px);
                    line-height: px2rem(100px);
                }
                .ft_selected{
                    margin: 0 px2rem(20px) px2rem(20px);
                    width: px2rem(612px);
                    display: flex;
                    border: 1px solid #f0f0f0;
                    li{
                        flex: 1;
                        height: px2rem(60px);
                        text-align: center;
                        line-height: px2rem(60px);
                        font-size: px2rem(24px);
                        color: #787878;
                        background: url('../../../assets/img/freebuy_img/line3.png') no-repeat right center;
                        background-size: 1px px2rem(40px); 
                    }
                }
                .matchTeam{
                    width: px2rem(612px);
                    margin: 0 auto;
                    margin-bottom: px2rem(28px);
                    overflow: hidden;
                    li{
                        width: px2rem(192px);
                        height: px2rem(60px);
                        border: 1px solid #f0f0f0;
                        box-sizing: border-box;
                        text-align: center;
                        line-height: px2rem(60px);
                        margin-bottom: px2rem(20px);
                        float: left;
                        margin-right: px2rem(18px);
                        color: #505050;
                        font-size: px2rem(26px);
                    }
                    li:nth-child(3n){
                        margin-right: 0;
                    }
                }
                .confim_btn{
                    display: flex;
                    border-top: 1px solid #f0f0f0;
                    p{
                        flex: 1;
                        height: px2rem(72px);
                        border-right: 1px solid #f0f0f0;
                        box-sizing: border-box;
                        text-align: center;
                        line-height: px2rem(72px);
                        font-size: px2rem(26px);
                        color: #e85504;
                    }
                    p:last-of-type{
                        border: none;
                        color: #505050;
                    }
                }
            }
        }
    }
</style>

