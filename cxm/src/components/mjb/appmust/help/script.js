
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
          return '必中彩·帮助中心'
      }
    }
}