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
    baseUrl = "http://94.191.113.169:8765/api";
}else if(process.env.NODE_ENV == 'testing'){
    baseUrl = "http://49.232.65.109:8765/api";
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "http://94.191.113.169:8765/api";
}
export{
    baseUrl,
    routerMode,
    DEBUG,
    cancleHTTP
}
