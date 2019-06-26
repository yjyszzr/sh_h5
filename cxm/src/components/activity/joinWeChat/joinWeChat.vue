<template>
    <div class="new-old" :style="{width:'100%'}">
        <input class="inputed" type="text" id = 'cpLink' readonly="readonly" v-model="mes">
        <div class="bgimgBox">
            <img class="bgimg" src="./images/bgimg.jpg" alt="">
        </div>
        <div class="btn-box" @click="copy">
            <p>加群主微信  助你赚翻天</p>
            <p>Caixiaomi123456</p>
            <p>复制微信号</p>
        </div>
    </div>
</template>
<script>
    import {means,detect,nativeApp} from '../../../util/common'
    import {Toast} from 'mint-ui';
    export default {
        name: "old_with_new",
        data() {
            return {
                detect: '',
                mes : 'Caixiaomi123456'
            }
        },
        methods: {
            copy(){
                var url = document.getElementById("cpLink");
                url.select();
                document.execCommand("copy");
                Toast("复制成功！")
            },
            go() {
                this.$store.commit('FREEBUYID', '6')
                if(this.$route.query.cfrom=='app'){
                    location.href = 'https://caixiaomi.net?cxmxc=scm&type=3&id=1&subid=6'
                }else{
                    this.$router.push({
                        path: "/freebuy/singleNote?id=6"
                    })
                }
            }
        },
        mounted() {
            this.detect = detect()
            nativeApp({'methodName':'showTitle','title':'彩民交流群'})
            means('彩民交流群').isTitle
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/css/function.scss";

    .new-old {
        height: 100%;
        position: relative;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        .bgimgBox{
            position: absolute;
            overflow: auto;
            top: 0;
            bottom: 0;
            .bgimg{
                height: 100%;
                width: 100%;
            }
        }
        .btn-box{
            background-color: rgba(17,11,12,.5);
            width: 100%;
            padding: px2rem(20px) 0;
            bottom: px2rem(0px);
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            p:nth-child(1){
                color: #ffffff;
                font-size:px2rem(40px) ;
            }
            p:nth-child(2){
                color: #EA5504;
                font-size:px2rem(34px) ;
            }
            p:nth-child(3){
                color: #ffffff;
                font-size:px2rem(24px) ;
            }
        }
    }
</style>