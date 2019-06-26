<style lang='scss' src='./style.scss'>

</style>
<template>
    <div class="wrap consult">
        <div class="article" v-if="$store.state.zxDetailObj!=''">
            <h4>{{$store.state.zxDetailObj.title}}</h4>
            <div class="zxDetailTitle">
                <span>{{$store.state.zxDetailObj.author}}</span>
                <span>{{zxDetailTime($store.state.zxDetailObj.addTime)}}</span>
            </div>
            <div v-html="$store.state.zxDetailObj.content"></div>
            <div class="keywords">
                <p v-for="(item,i) in $store.state.zxDetailObj.labelsArr" :key='i'>{{item}}</p>
            </div>
        </div>
        <!-- <div class="placeHolder" v-if="!$store.state.zxDetailObj.title"> -->
            <!-- <mt-spinner type="snake" color="#ea5504"></mt-spinner> -->
        <!-- </div> -->
        <div class="xgNews" v-show="$store.state.zxDetailObj.articles&&$store.state.zxDetailObj.articles.length>0">
            <h3>相关文章</h3>
            <ul>
                <li>
                    <div class="choice" v-for="(item,i) in $store.state.zxDetailObj.articles" :key='i' @click="reloadzxDetail(item.articleId)">
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
            </ul>
        </div>
        <button class="ckBtn" @click="ckBtn()">查看更多</button>
    </div>
</template>
<script src='./script.js'>
    
</script>