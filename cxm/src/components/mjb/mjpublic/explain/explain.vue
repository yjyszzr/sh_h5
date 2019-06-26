<style lang='scss' scoped src='./style.scss'>

</style>
<template>
    <div class="wrap explain">
        <h5>什么是“胆”？</h5>
        <p>“胆”指的是您认为比较稳准的选项，在选择场次大于串关数的时候，您可以设定某场比赛为“胆”。定胆投注指的是在过关玩法的基础上，根据自身判断选择“胆”选项，过滤掉不包含“胆”的所有组合，设胆玩法的优势在于，既可以提高中奖率，又能够减少组合数，控制成本，提高盈利率。</p>
    </div>
</template>
<script>
    import {nativeApp} from '../../../../util/common'
    export default {
        name: 'explain',
        data(){
            return {}
        },
        mounted(){
            nativeApp({'methodName':'showTitle','title':'胆说明'})
            window.getCxmTitle = function(){
                return '乐得体育·胆说明'
            }
        }
    }
</script>