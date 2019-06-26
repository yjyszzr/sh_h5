<template>
  <div class="main-skeleton">
    <div class="sktitle">
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="skbanner"></div>
    <div class="skfooter">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import '../../../assets/css/function.scss';
.main-skeleton{
  width: 100%;
  height: 100%;
  background: white;
  padding: 0 px2rem(30px);
  box-sizing: border-box;
  .sktitle{
    p{
      background: #eaeaea;
      width: 100%;
      height: px2rem(30px);
      margin-top: px2rem(20px);
    }
    p:nth-child(2){
      width: 70%;
    }
    p:nth-child(3){
      width: 30%;
    }
  }
  .skbanner{
    width: 100%;
    height: px2rem(220px);
    background: #eaeaea;
    margin-top: px2rem(20px);
  }
  .skfooter{
    p{
      background: #eaeaea;
      width: 100%;
      height: px2rem(30px);
      margin-top: px2rem(20px);
    }
    p:last-of-type{
      width: 60%;
    }
  }
}
</style>
