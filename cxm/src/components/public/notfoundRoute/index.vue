<template>
  <div class="nofound">
    <div class="nofond-box">
      <img class="nfd" src="../../../assets/img/404.gif" alt="">
      <p>页面找不到了,您可以<router-link to='/'>返回首页</router-link></p>
      <span>出现了这个问题，也许是因为您访问了不正确的链接地址，但更可能是由于我们对程序做出了更新，没有及时通知您所造成的。</span>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import '../../../assets/css/function.scss';
.nofound{
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .nfd{
    margin: px2rem(-150px) auto 0;
    width: px2rem(500px);
    display: block;
  }
  p{
    text-align: center;
    display: block;
    font-size: px2rem(30px);
    color: #505050;
    a{
      color: #ea5504;
    }
  }
  span{
    display: block;
    font-size: px2rem(24px);
    color: #9f9f9f;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    margin-top: px2rem(30px);
  }
}
</style>
