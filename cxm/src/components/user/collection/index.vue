<style lang='scss' src='./style.scss'>

</style>
<template>
    <div class="wrap collection">
            <ul>
                <div class="liBox" v-for="(item,i) in scList" :key='i'>
                <li>
                    <div class="scDelete" v-if="deleteFlag" @click="deleteItem(item.articleId)">
                        <i class="iconfont icon-icon-37"></i>
                    </div>
                    <div class="choice" @click="goZxDetail(item.articleId)">
						<div v-if="item.listStyle==2||item.listStyle==3||item.listStyle==0">
							<h4>{{item.title}}</h4>
						<p class="picSummary" v-if="item.listStyle==2||item.listStyle==3">
							<img :src="data" alt="" v-for="(data,index) in item.articleThumb" :key='index'>
						</p>
            <p v-if="item.listStyle==0" class="summary" style="-webkit-box-orient: vertical;">
              {{item.summary}}
            </p>
						<span>{{item.author}}</span><span>{{addTime(item.addTime)}}</span><span>阅读{{item.clickNumber}}</span>
						</div>
						<div class="zxBox" v-if="item.listStyle==1||item.listStyle==4">
							<div class="zxLeft">
								<h5 style="-webkit-box-orient: vertical;">{{item.title}}</h5>
								<div class="zx_info"><span>{{item.author}}</span><span>{{addTime(item.addTime)}}</span><span>阅读{{item.clickNumber}}</span></div>
							</div>
							<div class="zxRight">
								<img class="img1" :src="data" alt="" v-for="(data,index) in item.articleThumb" :key='index'>
                                <img class="img2" src="../../../assets/img/bofang@2x.png" alt="" v-if="item.listStyle==4">
							</div>
						</div>
					</div>
                </li>
                </div>
            </ul>
			<div class="nullstatus" v-if="scList.length==0&&cxLoadFlag==false">
                    <img src="../../../assets/img/juan.png" alt="">
                    <span>暂无收藏内容</span>
            </div>
            <div class="triple" v-show="trFlag">
				<mt-spinner type="triple-bounce" color="#999"></mt-spinner>&nbsp;<span>正在加载</span>
			</div>
            <div class="cxLoad" v-show="cxLoadFlag" @click="cxLoadClick()">
                加载失败,点击重试
            </div>
    </div>
</template>
<script src='./script.js'>
// import http from '../api/http'
</script>