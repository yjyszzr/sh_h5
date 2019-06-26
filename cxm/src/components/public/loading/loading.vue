<template>
  <div class="mf-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="scss">
  @import '../../../assets/css/function.scss';
  .mf-loading-container{
    img{
      width: px2rem(50px);
      height: px2rem(50px);
      display: block;
    }
  }
</style>
