<template>
  <div :class="btnClass" @click="click">
      <slot>按钮标签</slot>
  </div>
</template>
<script>
  export default {
    name: 'appbtn',
    props: {
      'btnClass': {default: ''}
    },
    data: function(){ return {time: new Date()} },
    methods: {
      click (e) {
        let temp = new Date();
        // 防暴力点击
        if (temp - this.time > 1000) {
          this.time = temp;
          this.$emit('click', e);
        }
      }
    },
    mounted: function(){
    }
  }
</script>
<style scoped>

</style>