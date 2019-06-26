import api from '../../../../../fetch/api'
import { Toast,Indicator,MessageBox } from 'mint-ui'
export default {
    name: 'bankList',
    data () {
      return {
          
      }
    },
    computed: {
        xfbklist() {
          return this.$store.state.xfbanklist;
        }
    },
    methods: {
      tjxkClick(){
        this.$emit('closeMarkCz')
        this.$store.commit('XFBANKLIST',[])
      },
      bkClick(c){
        this.$emit('closeMarkCz')
        this.$store.commit('XFBANKSELCTED',c)
      },
      deletelist(c){
        MessageBox.confirm('',{
            message: '是否解绑此卡',
            title: '提示',
            confirmButtonText: '解绑',
            cancelButtonText: '取消',
            closeOnClickModal: false
        }).then(action => {
            Indicator.open()
            let data = {
              'recordId': c.recordId
            }
            api.bankremove(data)
                .then(res => {
                  if(res.code==0){
                    this.$store.commit('XFBANKLIST',_.differenceWith(this.xfbklist,[c], _.isEqual))
                    this.$store.commit('XFBANKSELCTED',this.xfbklist[0])
                    this.$emit('closeMarkCz')
                  }
                })
        },action => {
            
        })
      }
    }
}