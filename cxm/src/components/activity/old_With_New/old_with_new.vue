<template>
    <div class="new-old" :style="{width:'100%'}">
        <div class="bgimgBox">
            <img class="bgimg" src="./images/bgimg.jpg" alt="">
        </div>
        <div class="btn-box" v-if="$route.query.cfrom!='app'||detect!=='ios'">
            <p class="btn-tou" @click="go">
                <img src="./images/btn.png" alt="">
            </p>
        </div>
    </div>
</template>

<script>
    import {means,detect,nativeApp} from '../../../util/common'

    export default {
        name: "old_with_new",
        data() {
            return {
                detect: ''
            }
        },
        methods: {
            go() {
                this.$store.commit('FREEBUYID', '6')
                if(this.$route.query.cfrom=='app'){
                    location.href = 'https://caixiaomi.net?cxmxc=scm&type=3&id=1&subid=6'
                }else{
                    this.$router.push({
                        path: "/lottery/freebuy/singleNote"
                    })
                }
            }
        },
        mounted() {
            this.detect = detect()
            nativeApp({'methodName':'showTitle','title':'小白课堂'})
            means('小白课堂').isTitle
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/css/function.scss";

    .new-old {
        height: 100%;
        position: relative;
        overflow: auto;
        .bgimgBox{
            position: absolute;
            overflow: auto;
            top: 0;
            bottom: 0;
            .bgimg{
                height: auto;
                /*width: auto;*/
                width: 100%;
            }
        }
        .btn-box{
            display: flex;
            justify-content: center;
            align-items: center;

        }
        .btn-tou {
            position: absolute;
            bottom: px2rem(30px);
            left: 15%;
            height: px2rem(150px);
            width: 70%;
            img{
                width: 100%;
            }
        }
    }
</style>