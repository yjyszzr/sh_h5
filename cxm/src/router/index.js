import Vue from 'vue'
import Router from 'vue-router'
import { Toast,MessageBox } from 'mint-ui'
import {wxPd} from '../util/common'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { 
        path: '*', 
        name: '404',
        meta: {
            title: '404未找到'
        },
        component: resolve => require(['@/components/public/notfoundRoute'], resolve), 
    },
    {
      path: '/',
      name: 'index',
      meta:{
        keepAlive: true,
        title: '购彩大厅'
      },
      component: resolve => require(['@/components/Index'], resolve)
    },
    {
      path: '/user/pwd',
      name: 'pwd',
      meta: {
        requireAuth: false,
        title: '密码登录'
      },
      component: resolve => require(['@/components/login/passwordLogin/password.vue'], resolve)
    },
    {
        path: '/activity/down/cxm',
        name: 'down',
        meta: {
          title: 'APP下载'
        },
        component: resolve => require(['@/components/index/appDownload/index.vue'], resolve)
    },
    {
        path: '/user/sms',
        name: 'sms',
        meta: {
            requireAuth: false,
            title: '短信登录'
        },
        component: resolve => require(['@/components/login/sms/sms.vue'], resolve)
    },
      {
          path: '/user/find',
          name: 'find',
          cname:'找回密码',
          meta: {
            title: '找回密码'
          },
          component: resolve => require(['@/components/login/findPassword/find.vue'], resolve)
      },
      {
          path: '/user/revise',
          name: 'revise',
          meta: {
            title: '修改密码'
          },
          component: resolve => require(['@/components/login/revisePassword/revise.vue'], resolve)
      },
      {
          path: '/user/register',
          name: 'register',
          meta: {
            title: '注册'
          },
          component: resolve => require(['@/components/login/register/register.vue'], resolve)
      },
      {
          path: '/user',
          name: 'user',
          meta: {
            requireAuth: true,
            title: '我的'
          },
          component: resolve => require(['@/components/user/index/index.vue'], resolve)
      },
      {
          path: '/find',
          name: 'findtab',
          meta: {
            keepAlive: true,
            title: '发现'
          },
          component: resolve => require(['@/components/find/index/index.vue'], resolve)
      },
      {
          path: '/user/recharge',
          name: 'recharge',
          meta: {
            title: '充值'
          },
          component: resolve => require(['@/components/user/recharge/recharge.vue'], resolve)
      },
      {
          path: '/user/withdraw',
          name: 'withdraw',
          meta: {
            title: '提现'
          },
          component: resolve => require(['@/components/user/withdraw/withdraw.vue'], resolve)
      },
      {

          path: '/user/credit_card',
          name: 'credit_card',
          meta: {
            title: '管理银行卡'
          },
          component: resolve => require(['@/components/user/credit_card/card.vue'], resolve)
      },
      {
          path: '/user/detail',
          name: 'detail',
          meta: {
            title: '我的卡券'
          },
          component: resolve => require(['@/components/user/detail/detail.vue'], resolve)
      },
      {
          path: '/user/about',
          name: 'about',
          meta: {
            title: '关于我们'
          },
          component: resolve => require(['@/components/user/about/about.vue'], resolve)
      },
      {
          path: '/user/suggestion',
          name: 'suggestion',
          meta: {
            title: '投诉建议'
          },
          component: resolve => require(['@/components/user/suggestion/suggestion.vue'], resolve)
      },
      {
          path: '/user/insurance',
          name: 'insurance',
          meta: {
            title: '安全保障'
          },
          component: resolve => require(['@/components/user/insurance/insurance.vue'], resolve)
      },
      {
          path: '/user/message',
          name: 'message',
          meta: {
            title: '消息中心'
          },
          component: resolve => require(['@/components/user/message/mess.vue'], resolve)
      },
      {
          path: '/user/order',
          name: 'order',
          meta: {
            title: '订单详情'
          },
          component: resolve => require(['@/components/user/order/index.vue'], resolve)
      },
      {
          path: '/user/certification',
          name: 'certification',
          meta: {
            title: '实名认证'
          },
          component: resolve => require(['@/components/user/certification/index.vue'], resolve)
      },
      {
          path: '/user/record',
          name: 'record',
          meta: {
            title: '购彩记录'
          },
        //   meta:{
        //     keepAlive: true
        //   },
          component: resolve => require(['@/components/user/record/index.vue'], resolve)
      },
      {
          path: '/user/account',
          name: 'account',
          meta: {
            title: '账户明细'
          },
          component: resolve => require(['@/components/user/account/index.vue'], resolve)
      },
      {
          path: '/user/add_card',
          name: 'add_card',
          meta: {
            title: '添加银行卡'
          },
          component: resolve => require(['@/components/user/add_card/index.vue'], resolve)
      },
      {
          path: '/user/give_details',
          name: 'give_details',
          meta: {
            title: '提现详情'
          },
          component: resolve => require(['@/components/user/give_details/index.vue'], resolve)
      },
      {
          path: '/user/draw',
          name: 'draw',
          meta: {
            title: '出票方案'
          },
          component: resolve => require(['@/components/user/draw/index.vue'], resolve)
      },
      {
          path: '/freebuy/protocol',
          name: 'protocol',
          meta: {
            title: '投注服务协议'
          },
          component: resolve => require(['@/components/freebuy/protocol/index.vue'], resolve)
      },
      {
          path: '/lottery/freebuy/singleNote',
          name: 'singleNote',
          cname:'单注页面',
          meta: {
            
            title: '购彩记录'
          },
          component: resolve => require(['@/components/freebuy/singleNote/singleNote.vue'], resolve)
      },
      {
          path: '/freebuy/cathectic',
          name: 'cathectic',
          meta: {
            title: '投注确认'
          },
          component: resolve => require(['@/components/freebuy/cathectic/index.vue'], resolve)
      },
      {
          path: '/freebuy/payment',
          name: 'payment',
          cname:'支付订单',
          meta: {
              requireAuth: true,
              title: '支付订单'
          },
          component: resolve => require(['@/components/freebuy/payment/index.vue'], resolve)
      },
      {
          path: '/users/freebuy/ewmPay',
          name: 'ewmPay',
          cname:'二维码支付',
          meta: {
              requireAuth: true,
              title: '微信支付'
          },
          component: resolve => require(['@/components/freebuy/ewmPay.vue'], resolve)
      },
      {
          path: '/users/freebuy/ewmAliPay',
          name: 'ewmAliPay',
          cname:'二维码支付',
          meta: {
              requireAuth: true,
              title: '支付宝支付'
          },
          component: resolve => require(['@/components/freebuy/ewmAliPay.vue'], resolve)
      },
      {
          path: '/users/freebuy/ewmYinLianPay',
          name: 'ewmYinLianPay',
          cname:'二维码支付',
          meta: {
              requireAuth: true,
              title: '银联支付'
          },
          component: resolve => require(['@/components/freebuy/ewmYinLianPay.vue'], resolve)
      },
      {
          path: '/users/bankList',
          name: 'appubey',
          cname:'银行列表',
          meta: {
              requireAuth: true,
              title: '银行列表'
          },
          component: resolve => require(['@/components/freebuy/bankList.vue'], resolve)
      },
      {
          path: '/lotteryResult',
          name: 'result',
          meta: {
            title: '比赛结果'
          },
          component: resolve => require(['@/components/lottery/result/index.vue'], resolve)
      },
      {
          path: '/lottery/teamDetail',
          name: 'teamDetail',
          meta: {
            title: '球队详情'
          },
          component: resolve => require(['@/components/lottery/teamDetail/index.vue'], resolve)
      },
      {
          path: '/index/consult',
          name: 'consult',
          meta: {
            title: '资讯详情'
          },
          component: resolve => require(['@/components/index/consult/consult.vue'], resolve)
      },
      {
          path: '/user/collection',
          name: 'collection',
          meta: {
            title: '我的收藏'
          },
          component: resolve => require(['@/components/user/collection/index.vue'], resolve)
      },
      {
          path: '/index/moreInfo',
          name: 'moreInfo',
          meta: {
            title: '相关文章'
          },
          component: resolve => require(['@/components/index/moreInformation/moreInformation.vue'], resolve)
      },
      {
          path: '/user/help',
          name: 'help',
          meta: {
            title: '帮助中心'
          },
          component: resolve => require(['@/components/user/help/index.vue'], resolve)
      },
      {
          path: '/user/service',
          name: 'service',
          meta: {
            title: '注册服务协议'
          },
          component: resolve => require(['@/components/user/service/index.vue'], resolve)
      },
      {
        path: '/freebuy/inToplay',
        name: 'inToplay',
        meta: {
            title: '玩法介绍'
        },
        component: resolve => require(['@/components/freebuy/intoplay/index.vue'], resolve)
      },
      {
          path: '/freebuy/explain',
          name: 'explain',
          meta: {
            title: '胆说明'
          },
          component: resolve => require(['@/components/freebuy/explain/explain.vue'], resolve)
      },
      {
        path: '/user/quickinfo',
        name: 'quickInfo',
        meta: {
          title: '快捷支付'
        },
        component: resolve => require(['@/components/user/quickPayment/quickInfo/index.vue'], resolve)
      },
//    一期活动相关路由
      {
        path: '/activity/one',
        name: 'activity',
        meta: {
            title: '注册送好礼'
        },
        component: resolve => require(['@/components/activity/one/index.vue'], resolve)
      },
      {
          path: '/activity/tuiguang',
          name: 'tuiguang',
          meta: {
            title: '我的推广'
          },
          component: resolve => require(['@/components/activity/tuiguang/index/index.vue'], resolve)
      },
      {
          path: '/activity/rule',
          name: 'rule',
          meta: {
            title: '活动规则'
          },
          component: resolve => require(['@/components/activity/tuiguang/rule/index.vue'], resolve)
      },
      {
          path: '/activity/mycode',
          name: 'mycode',
          meta: {
            title: '我的二维码'
          },
          component: resolve => require(['@/components/activity/tuiguang/mycode/index.vue'], resolve)
      },
      {
          path: '/activity/income',
          name: 'income',
          meta: {
            title: '我的推广收入'
          },
          component: resolve => require(['@/components/activity/tuiguang/income/index.vue'], resolve)
      },
      {
        path: '/activity/tuiguang/popupleft',
        name: 'popupLeft',
        cname:'地址搜索',
        component: resolve => require(['@/components/activity/tuiguang/popupLeft/popupLeft.vue'], resolve)
        },
      {
          path: '/activity/incomedetail',
          name: 'incomedetail',
          meta: {
            title: '收入明细'
          },
          component: resolve => require(['@/components/activity/tuiguang/incomedetail/index.vue'], resolve)
      },
      {
          path: '/activity/include',
          name: 'include',
          meta: {
            title: '如何计算收益'
          },
          component: resolve => require(['@/components/activity/tuiguang/include/index.vue'], resolve)
      },
      {
          path: '/user/activity/spread',
          name: 'spread',
          component: resolve => require(['@/components/activity/spread/spread.vue'], resolve)
      },
      //二期活动
      {
          path: '/activity/red_packet',
          name: 'red_packet',
          meta: {
              title: '充值送壕礼'
          },
          component: resolve => require(['@/components/activity/red_packet/index/index.vue'], resolve),
      },
      {
          path: '/activity/rechangeActivity',
          name: 'rechangeActivity',
          meta: {
              title: '充值送壕礼'
          },
          component: resolve => require(['@/components/activity/red_packet/rechangeActivity.vue'], resolve),
      },
      {
          path: '/activity/tuiguang/registration',
          name: 'registration',
          meta:{
            keepAlive: true,
            title: '店员注册'
          },
          component: resolve => require(['@/components/activity/tuiguang/registration/registration.vue'], resolve)
      },
      {
          path: '/activity/tuiguang/success',
          name: 'success',
          meta:{
            title: '注册成功'
          },
          component: resolve => require(['@/components/activity/tuiguang/success/success.vue'], resolve)
      },
      //老带新 活动
      {
        path: '/activity/oldbeltyd',
        name: 'oldbeltyd',
        meta: {
          title: '老带新引导'
        },
        component: resolve => require(['@/components/activity/oldbeltnew/oldbeltyd'], resolve)
       },
      {
        path: '/activity/oldbeltnew',
        name: 'oldbeltnew',
        meta: {
          title: '老带新'
        },
        component: resolve => require(['@/components/activity/oldbeltnew/oldbeltyq'], resolve)
     },
     //大转盘
     {
        path: '/activity/wheel',
        name: 'wheel',
        meta: {
          title: '必中彩'
        },
        component: resolve => require(['@/components/activity/wheel'], resolve)
     },
      //app彩小秘彩票
      //帮助中心：appinfo/help
      //购彩协议：appinfo/protocol
      //服务协议：appinfo/service
      //玩法介绍：/appinfo/inToplay
      //胆说明：/appinfo/explain
      //安全保障：/appinfo/insurance
      {
          path: '/appinfo/help',
          name: 'helpmjb',
          component: resolve => require(['@/components/mjb/appinfo/help/index.vue'], resolve)
      },
      {
          path: '/appinfo/protocol',
          name: 'protocolmjb',
          component: resolve => require(['@/components/mjb/appinfo/protocol/index.vue'], resolve)
      },
      {
          path: '/appinfo/service',
          name: 'servicemjb',
          component: resolve => require(['@/components/mjb/appinfo/service/index.vue'], resolve)
      },
      {
          path: '/appinfo/inToplay',
          name: 'inToplaymjb',
          component: resolve => require(['@/components/mjb/appinfo/intoplay/index.vue'], resolve)
      },
      {
          path: '/appinfo/explain',
          name: 'explainmjb',
          component: resolve => require(['@/components/mjb/appinfo/explain/explain.vue'], resolve)
      },
      {
          path: '/appinfo/insurance',
          name: 'insurancemjb',
          component: resolve => require(['@/components/mjb/appinfo/insurance/insurance.vue'], resolve)
      },
      //app必中彩
      //帮助中心：/appmust/help
      //购彩协议：/appmust/protocol
      //服务协议：/appmust/service
      //玩法介绍：/appmust/inToplay
      //胆说明：  /appmust/explain
      //安全保障：/appmust/insurance
      {
          path: '/appmust/help',
          name: 'helpmjbm',
          component: resolve => require(['@/components/mjb/appmust/help/index.vue'], resolve)
      },
      {
          path: '/appmust/protocol',
          name: 'protocolmjbm',
          component: resolve => require(['@/components/mjb/appmust/protocol/index.vue'], resolve)
      },
      {
          path: '/appmust/service',
          name: 'servicemjbm',
          component: resolve => require(['@/components/mjb/appmust/service/index.vue'], resolve)
      },
      {
          path: '/appmust/inToplay',
          name: 'inToplaymjbm',
          component: resolve => require(['@/components/mjb/appmust/intoplay/index.vue'], resolve)
      },
      {
          path: '/appmust/explain',
          name: 'explainmjbm',
          component: resolve => require(['@/components/mjb/appmust/explain/explain.vue'], resolve)
      },
      {
          path: '/appmust/insurance',
          name: 'insurancemjbm',
          component: resolve => require(['@/components/mjb/appmust/insurance/insurance.vue'], resolve)
      },
      //app天天买
      //帮助中心：/apptt/help
      //购彩协议：/apptt/protocol
      //服务协议：/apptt/service
      //玩法介绍：/apptt/inToplay
      //胆说明：  /apptt/explain
      //安全保障：/apptt/insurance
      {
          path: '/apptt/help',
          name: 'helpmjbt',
          component: resolve => require(['@/components/mjb/apptt/help/index.vue'], resolve)
      },
      {
          path: '/apptt/protocol',
          name: 'protocolmjbt',
          component: resolve => require(['@/components/mjb/apptt/protocol/index.vue'], resolve)
      },
      {
          path: '/apptt/service',
          name: 'servicemjbt',
          component: resolve => require(['@/components/mjb/apptt/service/index.vue'], resolve)
      },
      {
          path: '/apptt/inToplay',
          name: 'inToplaymjbt',
          component: resolve => require(['@/components/mjb/apptt/intoplay/index.vue'], resolve)
      },
      {
          path: '/apptt/explain',
          name: 'explainmjbt',
          component: resolve => require(['@/components/mjb/apptt/explain/explain.vue'], resolve)
      },
      {
          path: '/apptt/insurance',
          name: 'insurancemjbt',
          component: resolve => require(['@/components/mjb/apptt/insurance/insurance.vue'], resolve)
      },
      // 竞彩答题
      {
          path: '/activity/jingcai',
          name: 'jingcai',
          component: resolve => require(['@/components/activity/jingcai/index.vue'], resolve)
      },
      // 竞彩答题-纪录列表
      {
          path: '/activity/recordedList',
          name: 'recordedList',
          component: resolve => require(['@/components/activity/jingcai/recordList.vue'], resolve)
      },
      // 竞彩答题-上期纪录
      {
          path: '/activity/upRecord',
          name: 'upRecord',
          component: resolve => require(['@/components/activity/jingcai/upRecord.vue'], resolve)
      },
      // 老带新
      {
          path: '/activity/oldwithnew',
          name: 'old_with_new',
          component: resolve => require(['@/components/activity/old_With_New/old_with_new.vue'], resolve)
      },
      // 引流加微信
      {
          path: '/activity/joinWeChat',
          name: 'joinWeChat',
          component: resolve => require(['@/components/activity/joinWeChat/joinWeChat.vue'], resolve)
      },
      {
          path: '/user/setup',
          name: 'setup',
          component: resolve => require(['@/components/user/setup/setup.vue'], resolve)
      },
      {
          path: '/user/setlogin',
          name: 'setlogin',
          component: resolve => require(['@/components/user/setlogin/setup.vue'], resolve)
      },
      {
          path: '/user/setchange',
          name: 'setchange',
          component: resolve => require(['@/components/user/setchange/setup.vue'], resolve)
      },
      //appball足球资讯
      //帮助中心：/appball/help
      //购彩协议：/appball/protocol
      //服务协议：/appball/service
      //玩法介绍：/appball/inToplay
      //胆说明：  /appball/explain
      //安全保障：/appball/insurance
      {
          path: '/appball/help',
          name: 'helpmjbs',
          component: resolve => require(['@/components/mjb/appball/help/index.vue'], resolve)
      },
      {
          path: '/appball/protocol',
          name: 'protocolmjbs',
          component: resolve => require(['@/components/mjb/appball/protocol/index.vue'], resolve)
      },
      {
          path: '/appball/service',
          name: 'servicemjbs',
          component: resolve => require(['@/components/mjb/appball/service/index.vue'], resolve)
      },
      {
          path: '/appball/inToplay',
          name: 'inToplaymjbs',
          component: resolve => require(['@/components/mjb/appball/intoplay/index.vue'], resolve)
      },
      {
          path: '/appball/explain',
          name: 'explainmjbs',
          component: resolve => require(['@/components/mjb/appball/explain/explain.vue'], resolve)
      },
      {
          path: '/appball/insurance',
          name: 'insurancemjbs',
          component: resolve => require(['@/components/mjb/appball/insurance/insurance.vue'], resolve)
      },
      //天天体育
      {
          path: '/appty/help',
          name: 'helpmjby',
          component: resolve => require(['@/components/mjb/appty/help/index.vue'], resolve)
      },
      {
          path: '/appty/protocol',
          name: 'protocolmjby',
          component: resolve => require(['@/components/mjb/appty/protocol/index.vue'], resolve)
      },
      {
          path: '/appty/service',
          name: 'servicemjby',
          component: resolve => require(['@/components/mjb/appty/service/index.vue'], resolve)
      },
      {
          path: '/appty/inToplay',
          name: 'inToplaymjby',
          component: resolve => require(['@/components/mjb/appty/intoplay/index.vue'], resolve)
      },
      {
          path: '/appty/explain',
          name: 'explainmjby',
          component: resolve => require(['@/components/mjb/appty/explain/explain.vue'], resolve)
      },
      {
          path: '/appty/insurance',
          name: 'insurancemjby',
          component: resolve => require(['@/components/mjb/appty/insurance/insurance.vue'], resolve)
      },
      //天空体育
      {
          path: '/sky/help',
          name: 'helpmjbk',
          component: resolve => require(['@/components/mjb/sky/help/index.vue'], resolve)
      },
      {
          path: '/sky/protocol',
          name: 'protocolmjbk',
          component: resolve => require(['@/components/mjb/sky/protocol/index.vue'], resolve)
      },
      {
          path: '/sky/service',
          name: 'servicemjbk',
          component: resolve => require(['@/components/mjb/sky/service/index.vue'], resolve)
      },
      {
          path: '/sky/inToplay',
          name: 'inToplaymjbk',
          component: resolve => require(['@/components/mjb/sky/intoplay/index.vue'], resolve)
      },
      {
          path: '/sky/explain',
          name: 'explainmjbk',
          component: resolve => require(['@/components/mjb/sky/explain/explain.vue'], resolve)
      },
      {
          path: '/sky/insurance',
          name: 'insurancemjbk',
          component: resolve => require(['@/components/mjb/sky/insurance/insurance.vue'], resolve)
      },
      //乐得体育
      {
            path: '/appld/help',
            component: resolve => require(['@/components/mjb/appld/help/index.vue'], resolve)
        },
        {
            path: '/appld/protocol',
            component: resolve => require(['@/components/mjb/appld/protocol/index.vue'], resolve)
        },
        {
            path: '/appld/service',
            component: resolve => require(['@/components/mjb/appld/service/index.vue'], resolve)
        },
        {
            path: '/appld/inToplay',
            component: resolve => require(['@/components/mjb/appld/intoplay/index.vue'], resolve)
        },
        {
            path: '/appld/explain',
            component: resolve => require(['@/components/mjb/appld/explain/explain.vue'], resolve)
        },
        {
            path: '/appld/insurance',
            component: resolve => require(['@/components/mjb/appld/insurance/insurance.vue'], resolve)
        },
			//公用
			{
						path: '/mjpublic/help',
						component: resolve => require(['@/components/mjb/mjpublic/help/index.vue'], resolve)
				},
				{
						path: '/mjpublic/protocol',
						component: resolve => require(['@/components/mjb/mjpublic/protocol/index.vue'], resolve)
				},
				{
						path: '/mjpublic/service',
						component: resolve => require(['@/components/mjb/mjpublic/service/index.vue'], resolve)
				},
				{
						path: '/mjpublic/inToplay',
						component: resolve => require(['@/components/mjb/mjpublic/intoplay/index.vue'], resolve)
				},
				{
						path: '/mjpublic/explain',
						component: resolve => require(['@/components/mjb/mjpublic/explain/explain.vue'], resolve)
				},
				{
						path: '/mjpublic/insurance',
						component: resolve => require(['@/components/mjb/mjpublic/insurance/insurance.vue'], resolve)
				},
      // 大乐透选号
      {
          path: '/lottery/daletou/selectnumber',
          name: 'selectNumber',
          component: resolve => require(['@/components/daletou/selectNumber.vue'], resolve)
      },
      // 大乐走势图
      {
        path: '/lottery/daletou/runchart',
        name: 'runchart',
        component: resolve => require(['@/components/daletou/runChart'], resolve)
      },
      // 大乐投注确认
      {
          path: '/lottery/daletou/touZhuConfirm',
          name: 'touZhuConfirm',
          component: resolve => require(['@/components/daletou/touZhuConfirm.vue'], resolve)
      },
      // 大乐方案详情
      {
          path: '/daletou/programmeDetails',
          name: 'programmeDetails',
          component: resolve => require(['@/components/daletou/programmeDetails.vue'], resolve)
      },
      // 胆拖介绍
      {
          path: '/daletou/whatDantuo',
          name: 'whatDantuo',
          component: resolve => require(['@/components/daletou/whatDantuo.vue'], resolve)
      },
      // 玩法帮助
      {
          path: '/daletou/playHelp',
          name: 'playHelp',
          component: resolve => require(['@/components/daletou/playHelp.vue'], resolve)
      },
      // 出票方案
      {
          path: '/daletou/ticketScheme',
          name: 'ticketScheme',
          component: resolve => require(['@/components/daletou/ticketScheme.vue'], resolve)
      },
  ]
})

NProgress.configure({ showSpinner: false });

router.beforeEach(async(to, from, next) => {
	if(to.fullPath.indexOf('#')!=-1){
		next(
			{
				path: to.fullPath.replace('/#','')
			}
		)
    }
    let toPath = to.path
    //落地页区分马甲包
    if(toPath=='/activity/wheel'&&(to.query.fr=='c039'||to.query.fr=='c239')){
        document.title = '必中彩';
    }
    // if(to.meta.title&&wxPd()) {
    //     if(toPath=='/freebuy/singleNote'){
    //         let noteTitle = (id) => {
    //             switch (id){
    //                 case '2' : return "胜平负";
    //                 case '1' : return "让球胜平负";
    //                 case '4' : return "总进球";
    //                 case '5' : return "半全场";
    //                 case '3' : return "比分";
    //                 case '7' : return "2选1";
    //                 case '6' : return "混合投注";
    //             }
    //         }
    //         document.title = '彩小秘·'+noteTitle(to.query.id);
    //     }else{
    //         document.title = '彩小秘·'+to.meta.title;
    //     }
    // }
    NProgress.start(); // 开启Progress
    // 进入详情页时需要记录滚动条距离头部距离
    if(toPath === '/index/consult'&&(from.path==='/'||from.path==='/find')){
        router.app.consultScrolltop = $('#content').scrollTop()
        from.meta.keepAlive = true
    }else{
        if((from.path=='/'||from.path==='/find')&&toPath!='/index/consult'){
            from.meta.keepAlive = false
        }
    }
	next()
})

router.afterEach(async(to, from) => {
    let toPath = to.path
    NProgress.done(); // 结束Progress
    MessageBox.close(false);
    // // 页面跳转时滚动到页面顶部
    if(toPath!='/'||toPath!='/find'){
        document.getElementById('content').scrollTop = 0
    }
});


export default router