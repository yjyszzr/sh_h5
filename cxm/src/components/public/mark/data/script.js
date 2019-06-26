import api from '../../../../fetch/api.js'
import {nowDataYYYYMMDD} from '../../../../util/common.js'
import {Toast} from 'mint-ui'

export default {
    name: "data",
    data() {
        return {
            playType: this.$route.query.id,
            cur_date: '',
            dataList:[],
        };
    },
    created() {
        this.getDate()

    },
    mounted(){
        // this.dataUl()
    },
    computed: {
        // data_list() {
        //     return [getDay(-7), getDay(-6), getDay(-5), getDay(-4), getDay(-3), getDay(-2), getDay(-1), getDay(0)]
        //
        //     function getDay(day) {
        //         var today = new Date();
        //
        //         var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        //
        //         today.setTime(targetday_milliseconds);
        //
        //         var tYear = today.getFullYear();
        //         var tMonth = today.getMonth();
        //         var tDate = today.getDate();
        //         tMonth = doHandleMonth(tMonth + 1);
        //         tDate = doHandleMonth(tDate);
        //         return tYear + "-" + tMonth + "-" + tDate;
        //     }
        //
        //     function doHandleMonth(month) {
        //         var m = month;
        //         if (month.toString().length == 1) {
        //             m = "0" + month;
        //         }
        //         return m;
        //     }
        // },
    },
    methods: {
        dataUl(even){
            // $('#databox1').css("background-color",'red')
            // this.$refs.dataUl.style.background="red"
            $('#databox1').scrollTop(200)
            console.log($('#databox1 li'))
            // document.getElementById("databox1").scrollTop = 100;
            // console.log();
            console.log($('#databox1').scrollTop(200));
        },
        getDate() {
            var that = this
            let data = {
                emptyStr: ""
            }
            api.giveMatchChooseDate(data)
                .then(res=>{
                    if(res.code==0) {
                        that.dataList = res.data
                        if(that.$store.state.mark_showObj.mark_dateVal==''){
                            this.$store.dispatch("getMarkDateVal",nowDataYYYYMMDD())
                        }
                        this.$nextTick(()=>{
                            $('#sroll-height').scrollTop($('.cur').offset().top-134)
                        })
                    }
                })
        },

        cancel() {
            this.$store.dispatch("getMarkShow", false)
        },
        list_li(c, index) {
            c.isSelected = "0"
            this.$store.dispatch("getMarkShow", false)
            this.$store.dispatch("getMarkDateVal",c.strDate)
        }
    },
    mounted(){
    
    }
}