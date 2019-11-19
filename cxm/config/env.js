/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */
let baseUrl = '';
const routerMode = 'history';
let DEBUG = false;
const cancleHTTP = [];
if (process.env.NODE_ENV == 'development') {
    baseUrl = "https://api.caixiaomi.net/api";
}else if(process.env.NODE_ENV == 'testing'){
    baseUrl = "http://t1.caixiaomi.net:8765/api";
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "https://api.caixiaomi.net/api";
}
export{
    baseUrl,
    routerMode,
    DEBUG,
    cancleHTTP
}
