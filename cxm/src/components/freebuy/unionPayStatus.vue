<template>
    <div class="unionPayStatus">
        <img src="./img/success.png" alt="">
        <div class="un-alert-txt">
            <p>恭喜,充值成功</p>
            <p>10000元</p>
        </div>
        <div class="un-ft">
            <p>注: 充值金偶尔会有1~2分钟延迟到账</p>
            <div class="un-btn">
                返回
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../fetch/api'
    export default {
        name: "unionPayStatus",
        data() {
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            
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