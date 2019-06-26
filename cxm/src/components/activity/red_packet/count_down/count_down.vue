<template>
    <span :callback="callback" :endText="endText" v-html="content" class="czhd">

    </span>
</template>
<script>
    export default {
        name: "countDown",
        data(){
            return {
                content: '',
            }
        },
        watch:{
            endTime(times){
                this.countdowm(times);
            }
        },
        props:{
            endTime:{
                type: String,
                default :''
            },
            endText:{
                type : String,
                default:'活动已结束，敬请期待下次活动'
            },
            callback : {
                type : Function,
                default :''
            },
        },
        mounted () {
            this.$nextTick(()=>{
            })
        },
        methods: {
            countdowm(timestamp){
                let self = this;
                let timer = setInterval(function(){
                    let nowTime = new Date();
                    let endTime = new Date(timestamp * 1000);
                    let t = endTime.getTime() - nowTime.getTime();
                    if(t>0){
                        let day = Math.floor(t/86400000);
                        let hour=Math.floor((t/3600000)%24);
                        let min=Math.floor((t/60000)%60);
                        let sec=Math.floor((t/1000)%60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        sec = sec < 10 ? "0" + sec : sec;
                        let format = '';
                        if(day > 0){
                            format =  `<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${day}</b>天<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${hour}</b>小时<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight:normal;padding:0 0.05rem;color: #fff'>${min}</b>分<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${sec}</b>秒`;
                        }
                        if(day <= 0 && hour > 0 ){
                            format = `<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${day}</b>天<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${hour}</b>小时<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight:normal;padding:0 0.05rem;color: #fff'>${min}</b>分<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${sec}</b>秒`;
                        }
                        if(day <= 0 && hour <= 0){
                            format =`<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${day}</b>天<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>0</b>小时<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight:normal;padding:0 0.05rem;color: #fff'>${min}</b>分<b style='background:#DC351C;border-radius:3px;margin:0 2px;font-weight: normal;padding:0 0.05rem;color: #fff'>${sec}</b>秒`;
                        }
                        self.content = format;
                    }else{
                        clearInterval(timer);
                        self.content = self.endText;
                        self._callback();
                    }
                },10);
            },
            _callback(){
                if(this.callback && this.callback instanceof Function){
                    this.callback(...this);
                }
            }
        }
    }
</script>
