<template>
    <div class="unionPayStatus">
        <img src="./img/success.png" alt="" v-if="status=='01'">
		<img src="./img/fail.png" alt="" v-if="status=='02'">
        <div class="un-alert-txt" v-show="status=='01'">
            <p>恭喜,充值成功</p>
            <p>{{amount}}元</p>
        </div>
		<div class="un-alert-txt" v-show="status=='02'">
		    <p style="color: #666">充值失败</p>
		</div>
		<div class="un-alert-txt" v-show="status=='03'">
		    <p style="color: #666">处理中...</p>
		</div>
        <div class="un-ft">
            <p v-show="status!='02'">注: 充值金偶尔会有1~2分钟延迟到账</p>
            <div class="un-btn" @click="close()">
                返回
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../fetch/api'
	import {nativeApp} from '../../util/common'
    export default {
        name: "unionPayStatus",
        data() {
            return {
                status: this.$route.query.status,
				amount: this.$route.query.amount
            }
        },
        mounted(){
            
        },
        methods:{
            close(){
				nativeApp({'methodName':'closeWeb'})
			}
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../assets/css/function.scss';
    .unionPayStatus{
        background: white;
        min-height: 100%;
        padding-top: px2rem(220px);
        box-sizing: border-box;
        img{
            width: px2rem(80px);
            display: block;
            margin:  0 auto px2rem(60px);
        }
        .un-alert-txt{
            margin-bottom: px2rem(400px);
            p{
                text-align: center;
                color: #dc3c32;
                font-size: px2rem(32px);
                line-height: px2rem(48px);
            }
        }
        .un-ft{
            p{
                color: #dc3c32;
                text-align: center;
                font-size: 0.24rem;
            }
            .un-btn{
                background: #dc3c32;
                font-size: px2rem(32px);
                color: #fff;
                width: px2rem(440px);
                height: px2rem(68px);
                text-align: center;
                display: block;
                line-height: px2rem(68px);
                margin: px2rem(20px) auto;
                border-radius: px2rem(8px);
            }
        }
    }
</style>