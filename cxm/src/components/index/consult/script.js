import api from "../../../fetch/api";
import informal from '../../public/informal/informalList'
import {
    Toast
} from "mint-ui";
import {
    Indicator
} from "mint-ui";
import dateFailter from '../../../util/datefilter'
import {getUrlStr} from '../../../util/common'
import {means,nativeApp } from '../../../util/common'
export default {
    name: "consult",
    data() {
        return {
            id: this.$route.query.id,
        }
    },
    beforeCreate() {
        // Indicator.open()
    },
    created(){
        
    },
    components: {
        "v-informal": informal
    },
    mounted() {
        nativeApp({'methodName':'showTitle','title':'资讯详情'})
        means('资讯详情').isTitle
        this.fetchData()
    },
    methods:{
        fetchData(){
            let data = {
                articleId: this.id,
            }
            this.$store.dispatch("getDetailObj",data)
        },
        ckBtn(){
            this.$router.push({
                path: "/index/moreInfo",
                query: {
                    currentArticleId: this.$store.state.zxDetailObj.articleId,
                    extendCat: this.$store.state.zxDetailObj.extendCat,
                    frz: getUrlStr('frz',location.href)==undefined?'1':getUrlStr('frz',location.href),
                    showtitle: this.$route.query.showtitle&&this.$route.query.showtitle=='1'?'1':'0'
                },
                replace: false
            });
        },
        reloadzxDetail(c){
            document.querySelector('#content').scrollTop = 0;
            // Indicator.open()
            this.$store.commit('COSULTINIT',false)
            this.id = c
            this.fetchData()
        },
        zxCollectionStatus(flag){
            if(flag==true){
                let data = {
                    articleId: this.$store.state.zxDetailObj.articleId,
                    articleTitle: this.$store.state.zxDetailObj.title,
                    collectFrom: ''
                }
                api.collectAdd(data)
                    .then(res => {
                        Toast(res.msg);
                        //console.log(res)
                    })
            }else{
                let data = {
                    id: this.$store.state.zxDetailObj.articleId
                  };
                  api
                    .collectdelete(data)
                    .then(res => {
                        if(res.code == 0){
                            Toast(res.msg);
                        }

                    })
            }
        },
        zxDetailTime(c){
            if(c!=undefined){
                return dateFailter(c*1000,3)
            }
        },
        addTime(c){
            return dateFailter(c*1000,0)+' '+dateFailter(c*1000,1)
        }
    },
    computed: {  
        zxCollectionFlag(){
            return this.$store.state.zxCollectionFlag;
        },
        consultinit() {  
            return this.$store.state.skeletion.consultInit; 
        }
    },
    watch:{
        zxCollectionFlag(a,b){
            Indicator.open()
            this.zxCollectionStatus(a)
        }
        // ,
        // '$route':(to, from)=>{
        //     console.log(to)
        // }
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        vm.$store.commit('COSULTINIT',false)
      })
    },
    beforeRouteLeave(to, from, next) {
      next()
      this.$store.commit('COSULTINIT',true)
      this.$store.dispatch("getCollectionFlag", '')
      this.$store.state.zxDetailObj = {}
    }
}