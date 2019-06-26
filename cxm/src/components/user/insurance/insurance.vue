<style lang='scss' scoped src='./style.scss'>

</style>
<!--安保障全-->
<template>
    <div class="wrap" >
        <section class="rance">
            <div class="box1">
                <i class="iconfont icon-icon-17"></i>
                <span>资金安全</span>
                <div>
                    <p>专业安全团队</p>
                    <p>银行级安全技术保障</p>
                </div>
            </div>
            <div class="box2">
                <i class="iconfont icon-icon-18"></i>
                <span>数据安全</span>
                <div>
                    <p>安全工程师7*24小时保障服务安全运转</p>
                </div>
            </div>
            <div class="box2">
                <i class="iconfont icon-icon-15"></i>
                <span>隐私保障</span>
                <div>
                    <p>隐私保障</p>
                </div>
            </div>
            <div class="box2">
                <i class="iconfont icon-icon-19"></i>
                <span>信息安全</span>
                <div>
                    <p>采用软,硬件防护,有效防止病毒和恶意入侵</p>
                </div>
            </div>
            <div class="box1" style="border:none;">
                <i class="iconfont icon-icon-20"></i>
                <span>购彩保障</span>
                <div>
                    <p>购彩方案由实体店真实出票</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {means,nativeApp} from '../../../util/common'
export default {
  name: 'insurance',
  data(){
      return {}
  },
  mounted(){
      nativeApp({'methodName':'showTitle','title':'安全保障'})
      means('安全保障').isTitle
  }
}
</script>


