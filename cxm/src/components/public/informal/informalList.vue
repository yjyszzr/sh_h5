<template>
<div class="informalList">
<div class="choice" v-for="(item,i) in zxList" :key='i' @click="goZxDetail(item.articleId)">
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
								<h5 style='-webkit-box-orient: vertical;'>{{item.title}}</h5>
								<div class="zx_info"><span>{{item.author}}</span><span>{{addTime(item.addTime)}}</span><span>阅读{{item.clickNumber}}</span></div>
							</div>
							<div class="zxRight">
								<img class="img1" :src="data" alt="" v-for="(data,index) in item.articleThumb" :key='index'>
                <img class="img2" src="../../../assets/img/bofang@2x.png" alt="" v-if="item.listStyle==4">
							</div>
						</div>
					</div>
</div>
	
</template>

<script>
import dateFilter from '../../../util/datefilter'
import {getUrlStr} from '../../../util/common'
export default {
  name: "informalList",
  data() {
      return {

      }
  },
  props: ["zxList","from"],
  mounted() {
    //console.log(this.zxList)
  },
  methods: {
      goZxDetail(c){
        if(this.from&&this.from.split('_')[1]=='find'){
          if(this.from.split('_')[0]=='h5'){
            this.$router.push({
                  path: "/index/consult",
                  query: {
                  id: c,
                  frz: getUrlStr('frz',location.href)==undefined?'1':getUrlStr('frz',location.href)
                  }
            });
          }else{
            // location.href = '/index/consult?id='+c+'&frz=0&type=1&showtitle=1&cxmxc=scm'
            location.href = '/index/consult?id='+c+'&frz=0&type=8&showtitle=1&cxmxc=scm'
          }
        }else{
          if(this.$route.query.showtitle=='1'){
              this.$router.push({
                    path: "/index/consult",
                    query: {
                    id: c,
                    frz: getUrlStr('frz',location.href)==undefined?'1':getUrlStr('frz',location.href),
                    showtitle: '1'
                    }
              });
              return false;
          }else{
              this.$router.push({
                    path: "/index/consult",
                    query: {
                    id: c,
                    frz: getUrlStr('frz',location.href)==undefined?'1':getUrlStr('frz',location.href),
                    showtitle: '0'
                    }
              });
              return false;
          }
        }
    },
    addTime(c){
      return dateFilter(c*1000,0)+' '+dateFilter(c*1000,1)
    }
  }
};
</script>

<style lang='scss'>
@import "../../../assets/css/function.scss";
.informalList{
    .choice {
        border-bottom: 1px solid #f0f0f0;
        padding: px2rem(20px) 0;
        h4 {
          color: #505050;
		  font-size: px2rem(30px);
		  overflow: hidden;
		  text-overflow:ellipsis;
		  white-space: nowrap;
        }
        .picSummary {
          margin: px2rem(10px) 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: px2rem(230px);
            height: px2rem(164px);
            display: block;
          }
        }
        .summary{
           margin: px2rem(10px) 0;
		   overflow : hidden;
		   text-overflow: ellipsis;
           display: -webkit-box;
           -webkit-line-clamp: 2;
        }
        span {
          color: #9f9f9f;
          margin-right: px2rem(16px);
          font-size: px2rem(22px);
		}
		span:last-of-type{
			margin: 0;
		}
		.zxBox{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.zxLeft{
				width: px2rem(430px);
				height: px2rem(164px);
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				h5{
					color: #505050;
		  			font-size: px2rem(30px);
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
				}
			}
			.zxRight{
        position: relative;
				.img1 {
            width: px2rem(230px);
            height: px2rem(164px);
            display: block;
          }
        .img2{
          width: px2rem(230px);
            height: px2rem(164px);
            position: absolute;
            top: 0;
            right: 0;
        }
			}
		}
      }
      .choice:last-of-type {
        border: none;
      }
}
</style>

