import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/iconfonts/iconfont.css'
import router from './router'
import store from './vuex/store'
import $ from './util/zepto'
import { Collapse,CollapseItem } from 'element-ui';
import { Progress} from 'element-ui';
import _ from 'lodash'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Progress)
// Vue.use(Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
