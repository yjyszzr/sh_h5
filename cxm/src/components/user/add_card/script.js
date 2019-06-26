import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'add_card',
    data () {
      return {
        blankNum: ''
      }
    },
    created(){


    },
    methods: {
      add_card(){
        Indicator.open()
        let data = {
          'bankCardNo': this.blankNum.replace(/\s/g,'')
        }
        api.addBankCard(data)
        .then(res => {
            if(res.code == 0 ){
                Toast(res.msg)
                this.$router.go(-1)
            }


        })
      },
        bankCard(){
            this .blankNum = this.blankNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        }
    },
    mounted(){
   
    }
}