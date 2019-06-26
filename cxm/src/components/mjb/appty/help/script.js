import helpTable from '../../../public/help'
import {nativeApp} from '../../../../util/common'
export default {
    name: 'help',
    components: {
      "v-table": helpTable
    },
    mounted(){
			nativeApp({'methodName':'showTitle','title':'帮助中心'})
      window.getCxmTitle = function(){
          return '天天体育·帮助中心'
      }
    }
}