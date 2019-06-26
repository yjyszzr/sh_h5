import axios from 'axios'
import qs from 'qs'
import {
    Toast
} from 'mint-ui'
import {
    Indicator
} from 'mint-ui'
import router from '../router/index'
import {getUrlStr} from '../util/common'
// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'https://api.caixiaomi.net/api';
// axios.defaults.baseURL = 'http://yf.caixiaomi.net/api';
 axios.defaults.baseURL = 'http://39.106.18.39:8765/api';
//拦截 token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = `${localStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//POST传参序列化
// axios.interceptors.request.use((config) => {
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// },(error) =>{
//     //  _.toast("错误的传参", 'fail');
//     return Promise.reject(error);
// });
//返回状态错误处理
axios.interceptors.response.use((res) => {
    if (res.config.url.indexOf('payment/query') == -1) {
        if (res.data.code >= 30000 && res.data.code <= 310000) {
            if(router.history.current.path!='/activity/one'){
                Toast(res.data.msg)
            }
        } else if (res.data.code == 600) {
            if(getUrlStr('from',location.href)=='app'||getUrlStr('cfrom',location.href)=='app'){
                location.href = 'http://m.caixiaomi.net?cxmxc=scm&type=5'
            }else{
                localStorage.clear()
                if(res.config.url.indexOf('match/queryMatchResultNew') != -1||res.config.url.indexOf('recharge/countUserRecharge') != -1||res.config.url.indexOf('collect/add') != -1||res.config.url.indexOf('match/nSaveBetInfo') != -1||res.config.url.indexOf('lotto/saveBetInfo') != -1){
                    router.push({
                        path: '/user/sms',
                    })
                }else{
                    router.replace({
                        path: '/user/sms',
                    })
                }
            }
        }
        Indicator.close()
    }
    return res;
}, (error) => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break

            case 401:
                error.message = '未授权，请登录'
                break

            case 403:
                error.message = '拒绝访问'
                break

            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break

            case 408:
                error.message = '请求超时'
                break

            case 500:
                error.message = '服务器内部错误'
                break

            case 501:
                error.message = '服务未实现'
                break

            case 502:
                error.message = '网关错误'
                break

            case 503:
                error.message = '服务不可用'
                break

            case 504:
                error.message = '网关超时'
                break

            case 505:
                error.message = 'HTTP版本不受支持'
                break

            default:
                '请求超时'
        }
        setTimeout(() => {
            Indicator.close()
            Toast('出问题了程序猿小哥哥正在修复');
        }, 3000)
    } else {
        Toast('网络错误,请重试');
        Indicator.close()
    }

    return Promise.reject(error);
});

//设备信息
const device = {
    plat: 'h5',
    apiv: 1,
    appv: '2.1.1',
    appid: '',
    mac: '',
    w: window.screen.availWidth,
    h: window.screen.availHeight,
    os: '',
    mid: '',
    brand: '',
    build: '',
    channel: 'h5',
    net: '',
    token: ''
}
export function fetchPost(url, body) {
    if(getUrlStr('fr', location.href)){
        device.channel = getUrlStr('fr', location.href)
    }else{
        device.channel = 'h5'
    }
    return new Promise((resolve, reject) => {
        axios.post(url, {
                device,
                body
            })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                Indicator.close()
                reject(error)
            })
    })
}

export default {
    //统计点击次数
    clickNum(params) {
        return fetchPost('member/xqdActivity/clickNum', params)
    },
    // 密码登录
    LoginByPass(params) {
        return fetchPost('member/login/loginByPass', params)
    },
    //短信登录
    loginBySms(params) {
        return fetchPost('member/login/loginBySms', params)
    },
    //注册
    Register(params) {
        return fetchPost('member/user/register', params)
    },
    //验证码
    SendSmsCode(params) {
        return fetchPost('member/sms/sendSmsCode', params)
    },
    //校验手机号
    validateMobile(params) {
        return fetchPost('member/user/validateMobile', params)
    },
    //修改密码
    updateLoginPass(params) {
        return fetchPost('member/user/updateLoginPass', params)
    },
    //退出登录
    logout(params) {
        return fetchPost('member/login/logout', params)
    },
    //查询用户个人信息
    userInfoExceptPass(params) {
        return fetchPost('member/user/userInfoExceptPass', params)
    },
    //实名认证
    realNameAuth(params) {
        return fetchPost('member/user/real/realNameAuth', params)
    },
    //消息中心
    newlist(params) {
        return fetchPost('member/user/message/list', params)
    },
    //查询银行卡
    queryUserBankList(params) {
        return fetchPost('member/user/bank/queryUserBankList', params)
    },
    //设置默认银行卡
    updateUserBankDefault(params) {
        return fetchPost('member/user/bank/updateUserBankDefault', params)
    },
    //删除银行卡
    deleteUserBank(params) {
        return fetchPost('member/user/bank/deleteUserBank', params)
    },
    //添加银行卡
    addBankCard(params) {
        return fetchPost('member/user/bank/addBankCard', params)
    },
    //提现界面数据
    queryWithDrawShow(params) {
        return fetchPost('member/user/bank/queryWithDrawShow', params)
    },
    //账户明细列表
    getUserAccountList(params) {
        return fetchPost('/member/user/account/getUserAccountListAndCountTotal', params)
    },
    // //合计
    // countMoneyCurrentMonth(params) {
    //     return fetchPost('member/user/account/countMoneyCurrentMonth', params)
    // },
    //红包列表
    queryBonusListByStatus(params) {
        return fetchPost('member/user/bonus/queryBonusListByStatus', params)
    },
    //查询订单列表状态
    getOrderInfoList(params) {
        return fetchPost('order/order/ngetOrderInfoList', params)
    },
    //查询订单详情
    getOrderDetail(params) {
        return fetchPost('order/order/getOrderDetail', params)
    },
    //查询出票方案
    getTicketScheme(params) {
        return fetchPost('order/order/getTicketScheme', params)
    },
    //获取大厅数据
    getHallData(params) {
        return fetchPost('lottery/lottery/hall/getAllLotteryInHallMixData', params)
    },
    //获取比赛列表
    getMatchList(params) {
        return fetchPost('lottery/lottery/match/getMatchList', params)
    },
    //获取筛选条件列表
    filterConditions(params) {
        return fetchPost('lottery/lottery/match/filterConditions', params)
    },
    //支付订单
    nSaveBetInfo(params) {
        return fetchPost('lottery/lottery/match/nSaveBetInfo', params)
    },
    //计算投注信息
    getBetInfo(params) {
        return fetchPost('lottery/lottery/match/getBetInfo', params)
    },
    //下单
    nUnifiedOrder(params) {
        return fetchPost('payment/payment/nUnifiedOrder', params)
    },
    //比赛结果
    queryMatchResult(params) {
        return fetchPost('lottery/lottery/match/queryMatchResultNew', params)
    },
    //比赛阵容
    lineupinfo(params) {
        return fetchPost('lottery/match/lineup/info', params)
    },
    //赛事详情分析弹窗
    matchTeamInfosSum(params) {
        return fetchPost('lottery/lottery/match/matchTeamInfosSum', params)
    },
    //球队分析详情信息
    matchTeamInfos(params) {
        return fetchPost('lottery/lottery/match/matchTeamInfos', params)
    },
    //资讯首页
    dllist(params) {
        return fetchPost('lottery/dl/article/list', params)
    },
    //资讯详情
    articleDetail(params) {
        return fetchPost('lottery/dl/article/detail', params)
    },
    //发现
    findList(params) {
        return fetchPost('lottery/dl/article/findList', params)
    },
    //收藏列表
    collectList(params) {
        return fetchPost('member/user/collect/list', params)
    },
    //删除列表
    collectdelete(params) {
        return fetchPost('member/user/collect/delete', params)
    },
    //添加收藏
    collectAdd(params) {
        return fetchPost('member/user/collect/add', params)
    },
    //资讯列表,查看更多
    relatedArticles(params) {
        return fetchPost('lottery/dl/article/relatedArticles', params)
    },
    //系统可用第三方支付
    allPayment(params) {
        return fetchPost('payment/payment/allPayment', params)
    },
    //先锋支付识别银行卡类型
    getBankType(params) {
        return fetchPost('payment/payment/xianfeng/getBankType', params)
    },
    //先锋支付获取短信验证码
    xfsms(params) {
        return fetchPost('payment/payment/xianfeng/sms', params)
    },
    //先锋支付请求 
    xfapp(params) {
        return fetchPost('payment/payment/xianfeng/app', params)
    },
    //先锋支付确认
    xfappConfirm(params) {
        return fetchPost('payment/payment/xianfeng/appConfirm', params)
    },
    //先锋支付银行卡列表 
    appCfg(params) {
        return fetchPost('payment/payment/xianfeng/appCfg', params)
    },
    //先锋支付银行卡列表获取验证码 
    appBankListPay(params) {
        return fetchPost('payment/payment/xianfeng/appBankListPay', params)
    },
    //先锋支付删除银行卡
    bankremove(params) {
        return fetchPost('payment/payment/xianfeng/bank/remove', params)
    },
    //轮回查询
    query(params) {
        return fetchPost('payment/payment/query', params)
    },
    //投诉建议
    complainAdd(params) {
        return fetchPost('member/dl/complain/add', params)
    },
    //提现
    withdraw(params) {
        return fetchPost('payment/cash/withdraw', params)
    },
    //充值
    recharge(params) {
        return fetchPost('payment/payment/recharge', params)
    },
    //提现进程
    withdrawList(params) {
        return fetchPost('/payment/payment/withdraw/list', params)
    },
    //赛事结果筛选
    getFilterConditionsSomeDay(params) {
        return fetchPost('/lottery/lottery/match/getFilterConditionsSomeDay', params)
    },
    //一期活动 api
    //我的推广
    extension(params) {
        return fetchPost('/member/dl/channelConsumer/myRecommendation', params)
    },
    //我的推广收入
    income(params) {
        return fetchPost('/member/dl/channelConsumer/myPromotionIncome', params)
    },
    //我的二维码
    mycode(params) {
        return fetchPost('/member/dl/channelConsumer/myQRCode', params)
    },
    //收入明细
    incomedetail(params) {
        return fetchPost('/member/dl/channelConsumer/incomeDetails', params)
    },
    //充值送红包
    toRechange(params) {
        return fetchPost('/member/donation/rechargeCard/list', params)
    },
    //pa
    countUser(params) {
        return fetchPost('/payment/payment/recharge/countUserRecharge', params)
    },
    allPaymentWithRecharge(params) {
        return fetchPost('/payment/payment/allPaymentWithRecharge', params)
    },
    //领取随机红包 
    rechargeSucReiceiveBonus(params) {
        return fetchPost('/member/user/bonus/rechargeSucReiceiveBonus', params)
    },
    //喜报列表
    getWinningList(params){
        return fetchPost('/member/dl/channelConsumer/getWinningList', params)
    },
    //店铺列表
    getChannelList(params){
        return fetchPost('/member/dl/channelConsumer/getChannelList', params)
    },
    //注册推广员
    registration(params){
        return fetchPost('/member/dl/channelConsumer/registToDistributor', params)
    },
    //注册推广员短信
    registSms(params){
        return fetchPost('/member/dl/channelConsumer/smsCodeForDistributor', params)
    },
    //设置用户登录密码
    setinglogin(params){
        return fetchPost('/member/user/setLoginPass', params)
    },
    //添加收藏比赛
    collectMatchId(params) {
        return fetchPost('/member/user/matchCollect/collectMatchId', params)
    },
    //取消收藏比赛
    cancle(params) {
        return fetchPost('/member/user/matchCollect/cancle', params)
    },
    //赛事比分的日期筛选条件调用接口
    giveMatchChooseDate(params) {
        return fetchPost('/lottery/lottery/match/giveMatchChooseDate', params)
    },
    //比赛赛况接口
    info(params) {
        return fetchPost('/lottery/match/live/info', params)
    },
    //答题竞猜体育
    guessingCompetitionDetails(params) {
        return fetchPost('/activity/dlQuestionsAndAnswersUser/guessingCompetitionDetails', params)
    },
    //答题竞猜提交答案
    add(params) {
        return fetchPost('/activity/dlQuestionsAndAnswersUser/add', params)
    },
    //我的竞猜纪录历史列表
    userAnswersList(params) {
        return fetchPost('/activity/dlQuestionsAndAnswersUser/userAnswersList', params)
    },
    //上期竞猜详情
    beforePeriodNote(params) {
        return fetchPost('/activity/dlQuestionsAndAnswersUser/beforePeriodNote', params)
    },
    //选号投注
    getTicketInfo(params) {
        return fetchPost('/lotto/lotto/getTicketInfo', params)
    },
    //保存投注信息
    saveBetInfoDlt(params) {
        return fetchPost('/lotto/lotto/saveBetInfo', params)
    },
    //走势图数据
    getChartData(params) {
        return fetchPost('/lotto/lotto/getChartData', params)
    },
    //方案详情
    getLottoOrderDetail(params) {
        return fetchPost('/order/order/getLottoOrderDetail', params)
    },
    //支付订单信息
    unifiedPayBefore(params) {
        return fetchPost('/payment/payment/unifiedPayBefore', params)
    },
    //出票方案
    getLottoTicketScheme(params) {
        return fetchPost('/order/order/getLottoTicketScheme', params)
    },
    //邀请人数和奖励
    invitationNumAndReward(params) {
        return fetchPost('/activity/dlOldBeltNew/invitationNumAndReward', params)
    },
    //新人注册（老带新）
    oldbeltnewregister(params) {
        return fetchPost('/activity/dlOldBeltNew/register', params)
    },
    //验证码(ldx)
    sendVerificationCode(params) {
        return fetchPost('/activity/dlOldBeltNew/sendVerificationCode', params)
    },
    //分享链接userId
    shareMyLinks(params) {
        return fetchPost('/activity/dlOldBeltNew/shareMyLinks', params)
    },
    //微信支付获取二维码
    base64Id(params) {
        return fetchPost('/payment/payment/urlBase64', params)
    },
    //查询活动资格
    queryActQF(params) {
        return fetchPost('/member/user/qualification/queryActQF', params)
    },
    //领取活动资格
    reaceiveActQF(params) {
        return fetchPost('/member/user/qualification/reaceiveActQF', params)
    },
    // //获取银行信息
    nUnifiedOrderUbey(params) {
        return fetchPost('/payment/payment/Ubey/nUnifiedOrderUbey', params)
    }
}


