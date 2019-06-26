<template>
    <div class="what-dantuo">
        <!--躯干-->
        <div class="body">
            <div class="body-in">
                <p class="body-in-title">什么是胆拖？</p>
                <p>在胆拖投注中，我们把号码分成胆码和拖码两部分，胆码就是您认为出现的机会非常大的号码，它在所投注的每一注彩票里都固定出现，拖码即补充的其他可能会出的不同号码，由胆码与拖码共同组成一组完整的投注号码。</p>
                <p class="title-two">以双色球为例</p>
                <p>假设您认为红球 01 02 03 04 05必出，红球31 32 33可能会出，蓝球选择16 那么则将 01 02 03 04 05 作为胆码，它们在每注彩票中都固定出现；将31 32 33作为拖码 表示为（01 02 03 04 05）31 32 33：16</p>
                <p>这样胆码和拖码组合出来就是以下几注号码：</p>
                <p>01 02 03 04 05 31 ： 16</p>
                <p>01 02 03 04 05 32 ： 16</p>
                <p>01 02 03 04 05 33 ： 16</p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/css/function.scss";

    .what-dantuo {
        .body {
            width: 100%;
            overflow: auto;
            .body-in{
                background-color: #ffffff;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding: px2rem(40px);
                padding-top: px2rem(60px);
                color: #505050;
                font-size: px2rem(26px);
                p{
                    line-height: px2rem(48px);
                }
                .body-in-title{
                    font-size: px2rem(28px);
                    color: #EA5504;
                }
                .title-two{
                    margin-top: px2rem(30px);
                    font-size: px2rem(28px);
                    font-weight: 700;
                }
            }
        }
    }
</style>
<script>
    import {means,nativeApp} from '../../util/common'
    export default {
        name: "whatDantuo",
        data() {
            return {}
        },
        created(){},
        mounted(){
            nativeApp({'methodName':'showTitle','title':'胆拖介绍'})
            means('胆拖介绍').isTitle
        },
        methods:{
            
        },
        computed:{},
        watch: {},
        destroyed(){},
        beforeRouteLeave(to, from, next) {
            next()
        }
    }
</script>