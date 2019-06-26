<style lang='scss' scoped src='./style.scss'>

</style>


<!--消息中心-->
<template>
    <div class="wrap mess">
        <mt-loadmore :bottom-method="loadBottom" :bottom-distance='-20' :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleTopChange" @scroll='handleScroll($event)'>
                <section class="box_cen" v-for="(item,i) in mess" v-if="msgType==0" :key='i'>
                        <div class="box1">
                            <h5>{{item.title}}</h5>
                            <span>{{item.sendTime}}</span>
                        </div>
                        <div class="box5">
                            <p>{{item.content}}</p>
                        </div>
                        <div class="box3">
                            <p v-html="item.msgDesc.replace(/#/g,'<br />')"></p>
                        </div>
                    <div class="box_title">
                        <p>{{item.contentDesc}}</p>
                        <a class="rout">
                            <!-- 查看详情 <b class="iconfont icon-icon-14"></b>  -->
                            </a>
                    </div>
                </section>
                <section class="box_cen" v-for="(item,i) in mess" v-if="msgType==1" :key='i' >
                    <div class="mess_message" style="margin: 0;padding: 0">
                        <a v-bind:href="item.msgUrl">
                        <!--<a v-bind:href="item.msgUrl" @click="ac(message.msgUrl)">-->
                        <p>{{item.title}}<span>{{item.sendTime}}</span></p>
                        <img :src=item.contentUrl>
                        <p class="rech"><a>查看详情<i class="iconfont icon-icon-14" ></i></a></p>
                        </a>
                    </div>
                </section>
                <p class="loadingText" v-show="bottomStatus !== 'loading'&&mess.length>0">{{loadText}}</p>
                <div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
					<mt-spinner :type="1" v-show="bottomStatus === 'loading'" color="#e82822"></mt-spinner>
				</div>
		</mt-loadmore>
        <div class="nullstatus" v-if="mess.length==0">
            <img src="../../../assets/img/juan.png" alt="">
            <span>暂无数据</span>
        </div>

    </div>
</template>

<script src='./script.js'>
// import http from '../api/http'
</script>

