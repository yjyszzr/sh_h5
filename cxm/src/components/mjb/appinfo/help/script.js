import {nativeApp} from '../../../../util/common'
import helpTable from '../../../public/help'
export default {
    name: 'help',
    components: {
      "v-table": helpTable
    },
    mounted(){
			nativeApp({'methodName':'showTitle','title':'帮助中心'})
      window.getCxmTitle = function(){
          return '彩小秘彩票·帮助中心'
      }
    }
}