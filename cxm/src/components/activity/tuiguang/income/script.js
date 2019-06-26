import {means} from '../../../../util/common'
import api from '../../../../fetch/api'
import {Indicator, Toast} from 'mint-ui'
import datefilter from "../../../../util/datefilter";

export default {
    name: 'income',
    data() {
        return {
            token: '',
            income: {},
            userId: this.$route.query.userId,

        }
    },
    beforeCreate() {
        Indicator.open()
    },
    mounted() {
        let data = {
            'userId': this.userId
        }
        api.income(data)
            .then(res => {
                if (res.code == 0) {
                    this.income = res.data
                }
            })
        means('我的推广收入').isTitle
    },
    methods: {
        golist(itemdate) {
            if(this.$route.query.showtitle&&this.$route.query.showtitle=='1'){
                location.href="/activity/incomedetail?cxmxc=scm&userId="+this.userId+"&addTime="+new Date(itemdate.replace(/-/g, '/')).getTime()+"&showtitle=1"
            }else{
                this.$router.push({
                    path: '/activity/incomedetail',
                    query: {
                        'addTime': new Date(itemdate.replace(/-/g, '/')).getTime(),
                        'userId': this.userId
                    },
                    replace: false
                })
            }
        }

    }
}