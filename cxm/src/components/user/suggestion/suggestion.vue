<style lang='scss' scoped src='./style.scss'>

</style>

<!--投诉建议-->
<template>
    <div class="wrap" >
        <section class="small">
            <h5>尊敬的上帝您好：</h5>
            <p>请将您对我们产品的反馈内容输入下面输入框中，我们会认真对待您的每一条建议，谢谢您的反馈。</p>
        </section>
        <section class="area content">
            <textarea v-model="sugText" :maxlength="totalcount" placeholder="投诉建议" ></textarea>
            <i>还可以输入{{ reduceCount }}字</i>
        </section>
        <section class="button" @click="sugSend()">
            <a class="determine">发送</a>
        </section>
    </div>
</template>

<script>
import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'suggestion',
    data() {
        return {
            sugText: '',
            totalcount: 140,
        }
    },
    computed: {
        reduceCount() {
            return this.totalcount - this.sugText.length
        }
    },
        methods: {
            sugSend() {
                Indicator.open()
                let data = {
                    'complainContent': this.sugText
                }
                api.complainAdd(data)
                    .then(res => {
                        //console.log(res)
                        if (res.code == 0) {
                            Toast(res.msg)
                            this.$router.go(-1);
                        }
                    })
            }
        }
}
</script>

