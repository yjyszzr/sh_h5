<template>
	<div class="shortcut" @click="shortcutClick()" @touchmove.prevent>
        <img src="../../assets/img/shortcutmb.jpg" alt="" class="img1" v-if="isWx==false">
        <img src="../../assets/img/wxfx.jpg" class="img2" alt="" v-if="isWx==true">
    </div>
</template>

<script>
    import {wxPd} from '../../util/common.js'
	export default {
		name: 'shortcut',
		data() {
			return {
				isWx: false
			}
		},
		mounted() {
            if(wxPd()){
                this.isWx = true
            }
		},
		methods: {
			shortcutClick(){
                this.$store.commit('MARKSHORTCUT',false)
            }
		}
	}
</script>

<style lang='scss'>
	@import '../../assets/css/function.scss';
	.shortcut{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 210;
        .img1{
            width: 70%;
            position: absolute;
            bottom: 0;
            left: px2rem(150px);
        }
        .img2{
            position: absolute;
            top: 0;
            left: px2rem(60px);
            width: 90%;
        }
    }
</style>