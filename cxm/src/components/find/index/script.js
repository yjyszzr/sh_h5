import Swiper from '../../../../static/swiper/swiper-3.4.2.min'
import api from '../../../fetch/api'
import { Indicator } from 'mint-ui'
import silder from '../../index/lunbo.vue'
import informal from '../../public/informal/informalList'
import Loading from '../../public/loading/loading.vue'
export default {
    name: 'find',
    data(){
        return {
            page: 1,
            bannerList: [],
            zxList: [],
            trFlag: true,
            cxLoadFlag: false,
            isbool: true,
            findObj: {},
            from: this.$route.query.from
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    components: {
        "v-slider": silder,
        "v-informal": informal,
        "v-loading": Loading
    },
    methods:{
        fetchData(){
            let data = {
                extendCat: this.findStatus,
                page: this.page,
                size: 20
            }
            api.findList(data)
            .then(res => {
                if(res.code==0) {
                    this.bannerList = res.data.navBanners
                    this.findObj = res.data
                    if (this.page == 1) {
                        this.zxList = this.zxList.concat(res.data.dlArticlePage.list);
                        this.trFlag = false
                    } else {
                        setTimeout(() => {
                          this.trFlag = false;
                          this.isbool = true;
                          this.zxList = this.zxList.concat(res.data.dlArticlePage.list);
                        }, 800);
                    }
                    this.$store.dispatch("changeFinTab",res.data.infoCatList)
                    this.$nextTick(()=>{
                        this.mySwiper = new Swiper ('.findTab', {		    
                            freeMode : true,
                            slidesPerView : 'auto',
                            freeModeSticky : true ,
                            freeModeMomentumRatio:0.3
                       }) 
                    })
                }
            })
            .catch(err=>{
                setTimeout(() => {
                      this.trFlag = false;
                      this.cxLoadFlag = true;
                }, 800);
            })
        },
        cxLoadClick(){
          this.trFlag = true;
          this.cxLoadFlag = false;
          this.fetchData()
        },
        handleScroll(e) {
            if (
              document.querySelector("#content").scrollHeight -
                document.querySelector("#content").clientHeight -
                document.querySelector("#content").scrollTop <=
                0 &&
              this.isbool == true
            ) {
              if (this.findObj.dlArticlePage.isLastPage == "false") {
                  
                this.page++;
                this.fetchData();
                this.trFlag = true;
                this.isbool = false;
              }
            }
        },
    },
    mounted(){
        document
      .querySelector("#content")
      .addEventListener("scroll", this.handleScroll);
        this.fetchData()
    },
    activated(){
        document.getElementById('content').scrollTop = this.$root.consultScrolltop
    },
    computed: {  
        findTab() {  
            return this.$store.state.findObj.findTab; 
        },
        findStatus() {  
            return this.$store.state.findObj.findActive; 
        }
    },
    watch:{
        findStatus(a,b){
            this.page = 1
            this.zxList = []
            this.fetchData()
        }
    }
}