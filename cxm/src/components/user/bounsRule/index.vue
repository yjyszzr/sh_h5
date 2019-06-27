<!--优惠券规则-->
<template>
    <div class="bounsRule" >
        <p>1.当前所有优惠券只限于（竞彩足球）使用；</p>   
        <p>2.满减优惠券使用条件必须满足购彩金额等于大于满减额度方可抵扣，小于则不可使用；</p>  
        <p>3.无门槛优惠券使用条件无限制，当购彩金额等于大于优惠券面额时，可直接抵扣或补差额完成使用。当购彩金额小于优惠券面额时，可直接抵扣，但产生的差额不予以退回；</p> 
        <p>4.优惠券不可叠加使用，不能提现，超过使用有效期将予以作废；</p> 
        <p>注：如有疑问请咨询客服</p> 
    </div>
</template>
<style lang='scss' scoped>
@import '../../../assets/css/function.scss';
.bounsRule{
    padding: px2rem(30px);
    font-size: px2rem(26px);
    color: #505050;
    line-height: px2rem(42px);
}
</style>
<script>
import {nativeApp} from '../../../util/common'
export default {
    name: 'bounsRule',
    mounted(){
      nativeApp({'methodName':'showTitle','title':'使用规则'})
    }
}
</script>



