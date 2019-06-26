import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'withdraw',
    data () {
      return {
        withdrawObj: {
          
        },
        withdrawVal: ''
      }
    },
    beforeCreate() {
			Indicator.open()
    },
    created(){
      
    },
    mounted(){
        this.fetchData()
    },
    methods:{
      whole(){
        this.withdrawVal = this.withdrawObj.userMoney
      },
      fetchData(){
        let data = {
          str: ''
        }
        api.queryWithDrawShow(data)
        .then(res => {
            if(res.code==0) {
              this.withdrawObj = res.data
              //console.log(res)
            }
        })
      },
        //全部提现
      determine(){
          let regex = new RegExp("^(([1-9][0-9]*)|([0]\.[0-9]]{1,2})|([1-9][0-9]*\.[0-9]{1,2}))$");

          if(!regex.test(this.withdrawVal) ){
              Toast('请输入正确的金额')
              return false
          }
        if(this.withdrawObj.defaultBankLabel==''){
          Toast('请添加银行卡')
        }else if(this.withdrawVal == ''||Number(this.withdrawVal)<=0){
          Toast('请输入正确提现金额')
        }else{
          Indicator.open()
          let data = {
            totalAmount: this.withdrawVal,
            userBankId: this.withdrawObj.userBankId
          }
          api.withdraw(data)
          .then(res => {
              if(res.code==0||res.code=='304056') {
                //console.log(res)
                Toast(res.msg)
                // this.fetchData()
                this.$router.go(-1);
              }
          })
        }
      }
    }
}