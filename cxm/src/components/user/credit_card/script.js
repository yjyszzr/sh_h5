import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'credit',
    data () {
      return {
        bankList: [],
        value: []
      }

    },

    beforeCreate() {
        Indicator.open()
    },

    created(){
      
    },
    methods: {
      checkselect(num,id){
        this.value = []
        this.value.push(num)
        let data = {
          'id': id
        }
        api.updateUserBankDefault(data)
        .then(res => {
            if( res.code == 0){
                Toast(res.msg)
            }

        })
      },
      removeBank(num,id){
        let status = ''
          if(this.value[0]==num){
            status = '1'
          }else{
            status = '0'
        }
        MessageBox.confirm('',{message:status=='1'?'这张卡为默认收款卡,您确定要删除吗?':'您确定删除这张银行卡吗?',title:'提示',closeOnClickModal:false}).then(action => {
          let data = {
            'id': id,
            'status': status
          }
          api.deleteUserBank(data)
          .then(res => {
              if(res.code==0) {
                for(let i=0;i<this.bankList.length;i++){
                  if(id==this.bankList[i].userBankId){
                    this.bankList.splice(i,1)
                  }
                }
                this.fdelete()
                  Toast(res.msg)
              }

          })
        },action => {

        })
      },
      fdelete(){
        api.queryUserBankList({})
        .then(res => {
            if(res.code==0) {
              this.bankList = res.data
              this.value = []
              for(let i=0;i<res.data.length;i++){
                if(res.data[i].status==1){
                  this.value.push(i)
                }
              }
            }
        })
      }
    },
    mounted(){
      this.fdelete()
    }
}