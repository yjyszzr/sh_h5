import Vue from 'vue'
import Router from 'vue-router'
import {
    Toast,
    MessageBox
} from 'mint-ui'
import {
    wxPd,isdeal
} from '../util/common'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
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
            meta: {
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
            cname: '找回密码',
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
            path: '/user/bounsrule',
            name: 'bounsrule',
            meta: {
                title: '卡券规则'
            },
            component: resolve => require(['@/components/user/bounsRule/index.vue'], resolve)
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
            cname: '单注页面',
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
            cname: '支付订单',
            meta: {
                requireAuth: true,
                title: '支付订单'
            },
            component: resolve => require(['@/components/freebuy/payment/index.vue'], resolve)
        },
        {
            path: '/users/freebuy/ewmPay',
            name: 'ewmPay',
            cname: '二维码支付',
            meta: {
                requireAuth: true,
                title: '微信支付'
            },
            component: resolve => require(['@/components/freebuy/ewmPay.vue'], resolve)
        },
        {
            path: '/users/freebuy/ewmAliPay',
            name: 'ewmAliPay',
            cname: '二维码支付',
            meta: {
                requireAuth: true,
                title: '支付宝支付'
            },
            component: resolve => require(['@/components/freebuy/ewmAliPay.vue'], resolve)
        },
        {
            path: '/users/freebuy/ewmYinLianPay',
            name: 'ewmYinLianPay',
            cname: '二维码支付',
            meta: {
                requireAuth: true,
                title: '银联支付'
            },
            component: resolve => require(['@/components/freebuy/ewmYinLianPay.vue'], resolve)
        },
        {
            path: '/users/bankList',
            name: 'appubey',
            cname: '银行列表',
            meta: {
                requireAuth: true,
                title: '银行列表'
            },
            component: resolve => require(['@/components/freebuy/bankList.vue'], resolve)
        },
        {
            path: '/users/unionpay',
            name: 'unionPay',
            cname: '银联支付',
            component: resolve => require(['@/components/freebuy/unionPay.vue'], resolve)
        },
        {
            path: '/users/unionpaystatus',
            name: 'unionPayStatus',
            cname: '银联支付状态',
            component: resolve => require(['@/components/freebuy/unionPayStatus.vue'], resolve)
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
        //推广赚钱活动首页
        {
            path: '/user/activity/protomakemoeny',
            name: 'protomakemoeny',
            component: resolve => require(['@/components/activity/protomakemoeny/index'], resolve)
        },
        //推广赚钱活动总收益
        {
            path: '/user/activity/mygrossincome',
            name: 'mygrossincome',
            component: resolve => require(['@/components/activity/protomakemoeny/mygrossincome'], resolve)
        },
        //推广赚钱活动受邀人数
        {
            path: '/user/activity/invitedfriends',
            name: 'mygrossincome',
            component: resolve => require(['@/components/activity/protomakemoeny/invitedFriends'], resolve)
        },
        //推广赚钱活动二维码
        {
            path: '/user/activity/ercode',
            name: 'mygrossincome',
            component: resolve => require(['@/components/activity/protomakemoeny/erCode'], resolve)
        },
        //篮彩投注
        {
            path: '/touzhu/lctz/list',
            name: 'lctz',
            component: resolve => require(['@/components/lc/lctz'], resolve)
        },
        //篮彩帮助
        {
            path: '/touzhu/lcbz',
            name: 'lcbz',
            component: resolve => require(['@/components/lc/lcbz'], resolve)
        },
        //篮彩下单
        {
            path: '/touzhu/savebet',
            name: 'savebet',
            component: resolve => require(['@/components/lc/lancaibetting'], resolve)
        },
    ]
})

NProgress.configure({
    showSpinner: false
});

router.beforeEach(async (to, from, next) => {
	//资讯交易版
    isdeal();
	//app老版webview内去掉#
    if (to.fullPath.indexOf('#') != -1) {
        next({
            path: to.fullPath.replace('/#', '')
        })
    }
    let toPath = to.path
    //落地页区分马甲包
    if (toPath == '/activity/wheel' && (to.query.fr == 'c039' || to.query.fr == 'c239')) {
        document.title = '必中彩';
    }
    NProgress.start(); // 开启Progress
    // 进入详情页时需要记录滚动条距离头部距离
    if (toPath === '/index/consult' && (from.path === '/' || from.path === '/find')) {
        router.app.consultScrolltop = $('#content').scrollTop()
        from.meta.keepAlive = true
    } else {
        if ((from.path == '/' || from.path === '/find') && toPath != '/index/consult') {
            from.meta.keepAlive = false
        }
    }
    next()
})

router.afterEach(async (to, from) => {
    let toPath = to.path
    NProgress.done(); // 结束Progress
    MessageBox.close(false);
    // // 页面跳转时滚动到页面顶部
    if (toPath != '/' || toPath != '/find') {
        document.getElementById('content').scrollTop = 0
    }
});


export default router