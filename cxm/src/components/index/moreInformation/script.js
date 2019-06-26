import api from "../../../fetch/api";
import informal from '../../public/informal/informalList'
import {
    Toast
} from "mint-ui";
import {
    Indicator
} from "mint-ui";
export default {
    name: "moreInfo",
    data() {
        return {
            id: this.$route.query.currentArticleId,
            extendCat: this.$route.query.extendCat,
            page: 1,
            moreInformationObj: {

            },
            moreInforList: [],
            trFlag: true,
            isbool: true,
            cxLoadFlag: false
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    components: {
        "v-informal": informal
    },
    mounted() {
        document
      .querySelector("#content")
      .addEventListener("scroll", this.handleScroll);
        this.fetchData()
    },
    deactivated() {
        this.$destroy()
    },
    methods:{
        fetchData(){
            let data = {
                currentArticleId: this.id,
                extendCat: this.extendCat,
                page: this.page,
                size: 10
            }
            api.relatedArticles(data)
                .then(res => {
                    //console.log(res)
                    if (res.code == 0) {
                        this.moreInformationObj = res.data
                        if (this.page == 1) {
                            this.moreInforList = [].concat(res.data.list);
                            this.trFlag = false
                        } else {
                            setTimeout(() => {
                              this.trFlag = false;
                              this.isbool = true;
                              this.moreInforList = this.moreInforList.concat(res.data.list);
                            }, 800);
                        }
                    }
                })
                .catch(err=>{
                    setTimeout(() => {
                          this.trFlag = false;
                          this.cxLoadFlag = true;
                    }, 800);
                  })
        },
        handleScroll(e) {
            if (
              document.querySelector("#content").scrollHeight -
              document.querySelector("#content").clientHeight -
              document.querySelector("#content").scrollTop <=
              0 &&
              this.isbool == true
            ) {
              if (this.moreInformationObj.isLastPage == "false") {
                this.page++;
                this.fetchData();
                this.trFlag = true;
                this.isbool = false;
              }
            }
        },
        cxLoadClick(){
            this.trFlag = true;
            this.cxLoadFlag = false;
            this.fetchData()
        },
    }
}