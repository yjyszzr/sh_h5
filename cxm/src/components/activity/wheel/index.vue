<template>
    <div class="wheel">
        <img src="./img/wheel_bg.jpg" alt="">
        <ul @click="xz()">
            <li v-for="(item, i) of items" :key='i' v-show='i == actvieIndex'>
                <img :src="item.img" alt="">
            </li>
        </ul>
        <div class="wheel-text">
            每个用户仅限领取一次
        </div>
        <transition name="fade">
            <div @touchmove.prevent class="mark" v-if="markshow">
                <div class="tanBox">
                    <img src="./img/view.png" alt="" srcset="">
                    <div class="close_mark" @click="close()">

                    </div>
                    <div class="wheel-btn" @click="lqbtn()">
                        <img src="./img/btn.png" alt="">
                    </div>
                    <div class="wheel-app">
                        <p>红包已放入您的账户</p>
                        <p>请登录{{detect==='ios'?'天天体育':fr=='c039'||fr=='c239'?'必中彩':'彩小秘'}}APP使用</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang='scss'>
@import '../../../assets/css/function.scss';
.wheel{
    background: rgb(152, 0, 193);
    min-height: 100%;
    height: auto;
    position: absolute;
    img{
        width: 100%;
    }
    ul{
        position: absolute;
        width: px2rem(600px);
        height: px2rem(600px);
        bottom: px2rem(100px);
        left: px2rem(80px);
        background: url('./img/wheel.png') no-repeat left top;
        background-size: 100% 100%;
        .m_ban{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 60;
        }
        li{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 10;
            img{
                width: 82.5%;
                position: absolute;
                left: 9%;
                top: 9%;
            }
        }
    }
    .wheel-text{
        position: absolute;
        bottom: px2rem(50px);
        color: #fff;
        font-size: px2rem(24px);
        text-align: center;
        width: 100%;
    }
    .mark{
        position: fixed;
        top: 0;
        width: 100%;
        left: 0;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        .tanBox{
            position: relative;
            width: 80%;
            img{
                width: 100%;
            }
            .close_mark{
                position: absolute;
                left: 0;
                top: 0;
                width: px2rem(150px);
                height: px2rem(150px);
            }
            .wheel-btn{
                position: absolute;
                bottom: px2rem(30px);
                width: px2rem(300px);
                left: 24%;
            }
            .wheel-app{
                position: absolute;
                bottom: px2rem(130px);
                width: 100%;
                p{
                    text-align: center;
                    font-size: px2rem(26px);
                    color: #fff;
                }
            }
        }
    }
}

</style>
<script>
import {detect,wxPd} from '../../../util/common'
import m1 from './img/m1.png'
import m2 from './img/m2.png'
import m3 from './img/m3.png'
import m4 from './img/m4.png'
import m5 from './img/m5.png'
import m6 from './img/m6.png'
export default {
    name: 'wheel',
    data () {
        return {
            actvieIndex: 0,
            i: 0,
            count: 0,
            items: [
                {img: m1},
                {img: m2},
                {img: m3},
                {img: m4},
                {img: m5},
                {img: m6}
            ],
            markshow: false,
            mbanShow: false,
            detect: '',
            fr: this.$route.query.fr
        }
    },
    created(){
      if(this.fr=='c039'||this.fr=='c239'){
          document.title = '必中彩'
      }
    },
    methods: {
      go(seconds) {
        const SECONDS = seconds * 1000;
        const HALF_SECONDS = SECONDS / 2;
        const FREQUENCY = 50;
        
        setTimeout(() => {
            this.actvieIndex++;
            if(this.actvieIndex >= this.items.length ) {this.actvieIndex = 0;}
             
            if (this.count >= HALF_SECONDS) {
               this.i+= 10;
               this.count += 50 + this.i;
            } else {
              this.count += 50;
            }
          
            if (this.count <= SECONDS) {
               this.go(seconds)
            }else{
               this.markshow = true
               this.mbanShow = false
            }
        }, FREQUENCY + this.i);
      },
      xz(){
          if(!this.mbanShow){
              this.mbanShow = true
              this.actvieIndex = 0
              this.i = 0
              this.count = 0
              this.go(1)
          }
      },
      close(){
          this.markshow = false
      },
      lqbtn(){
            if (detect() === 'ios') {
                if(this.fr == 'c039'){
                    countLog.init(()=>{
                        location.href="https://itunes.apple.com/app/apple-store/id1402481777?pt=118446425&ct=tuia&mt=8"
                    });
                }else if(this.fr == 'c046'||this.fr == 'c047'){
                    nicetuiLog.init(()=>{
                        location.href="https://itunes.apple.com/app/apple-store/id1402481777?pt=118446425&ct=nicetui1&mt=8"
                    });
                }else{
                    location.href="https://itunes.apple.com/cn/app/id1402481777?mt=8"
                }
            } else {
                if(wxPd()){
                    location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=net.caixiaomi.info'
                }else{
                    if(this.fr == 'c039'){
                        countLog.init(()=>{
                            location.href="https://static.caixiaomi.net/softs/"+this.fr+"/caixiaomi_"+this.fr+".apk"
                        });
                    }else if(this.fr == 'c239'){
                        location.href = 'https://static.caixiaomi.net/softs/oppo/bizhongcai_c20039.apk'
                    }else if(this.fr == 'c046'||this.fr == 'c047'){
                        nicetuiLog.init(()=>{
                            location.href="https://static.caixiaomi.net/softs/"+this.fr+"/caixiaomi_"+this.fr+".apk"
                        });
                    }else{
                        location.href="https://m.caixiaomi.net/down/cxm106_j"+this.$route.query.fr+".apk"
                    }
                }
            }
      }
    },
    mounted () {
        // console.log(nicetuiLog,countLog)
      this.detect = detect()
    }
}
</script>


