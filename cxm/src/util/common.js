const expUrl = 'http://192.168.31.205:8080'
// const expUrl = 'http://t1.caixiaomi.net:9805'
//  var expUrl = ''
// if(location.href.indexOf('.cn')!=-1){
//     expUrl = 'http://a1.caixiaomi.cn'
// }else{
//     expUrl = 'https://m.caixiaomi.net'
// }
var moment = require('moment');
//app h5页面分享
export let isShare = (arg, text, url, thumbUrl) => {
    let obj = {}
    window.getCxmShare = function () {
        obj.title = arg
        obj.description = text
        obj.thumbUrl = expUrl + thumbUrl
        obj.url = expUrl + url
        return obj
    }
}

//调用app方法
export let nativeApp = (obj)=>{
	if(isWebview()){
		if(window.webkit){
			return window.webkit.messageHandlers.appNative.postMessage(obj);
		}
		if(typeof test==='object'){
			test.appNative(JSON.stringify(obj))
		}
	}
}
//app mjb渠道区分
export let channel = (str,s)=>{
    let channelObj = {
        channelNmae: '彩小秘',
        color: '#ea5504'
    }
    if(str=='c26013'){
        channelObj.channelNmae='乐得体育'
        channelObj.color='#f78f14'
    }else if(str=='c26014'){
        channelObj.channelNmae='多多体育'
        channelObj.color='#da5f55'
	}else if(str.indexOf('c25')!=-1){
		channelObj.channelNmae='多多体育'
	}else if(str.indexOf('c27')!=-1){
		channelObj.channelNmae='人人体育'
	}else if(str.indexOf('c10')!=-1){
		channelObj.channelNmae='彩小秘'
	}else if(str.indexOf('c20')!=-1){
		channelObj.channelNmae='必中彩'
	}else if(str.indexOf('c22')!=-1){
		channelObj.channelNmae='天天体育'
	}else if(str.indexOf('c23')!=-1){
		channelObj.channelNmae='天空体育'
	}
    return channelObj;
}
//app h5方法
export let means = (arg) => {
    const appMeans = {
        //支付
        paydata: window.paydata = function () {
            return arg
        },
        //app title
        isTitle: window.getCxmTitle = function () {
            return '彩小秘·' + arg
        }
    }
    return appMeans
}

export let getCsUrl = () => {
    return expUrl;
}

//判断苹果系统和安卓系统
export let detect = () => {
    var equipmentType = "";
    var agent = navigator.userAgent.toLowerCase();
    var android = agent.indexOf("android");
    var iphone = agent.indexOf("iphone");
    var ipad = agent.indexOf("ipad");
    if (android != -1) {
        equipmentType = "android";
    }
    if (iphone != -1 || ipad != -1) {
        equipmentType = "ios";
    }
    return equipmentType;
}
//判断是否在webview打开h5
export let isWebview = () => {
    var agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf('ios&')==-1&&agent.indexOf('android&')==-1){
        return false;
    }else{
        return true;
    }
}
//获取url key
export let getUrlStr = function (name, url) {
    /**
     * 获取地址栏参数
     */
    let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(url)) {
        return unescape(RegExp.$2.replace(/\+/g, " "))
    }
    return undefined
}
//判断浏览器是否位wx
export let wxPd = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
// 将日期格式化成星期
export let weekTime = (data) => {
    return weekFn(moment(data).format('YYYY-MM-DD dddd'));

    function weekFn(dataed) {
        var yes = dataed.substr(0, 10)
        var wek = dataed.substr(11, dataed.length - 10) + ""
        switch (wek) {
            case "Monday":
                return yes + " 周一"
                break;
            case "Tuesday":
                return yes + " 周二"
                break;
            case "Wednesday":
                return yes + " 周三"
                break;
            case "Thursday":
                return yes + " 周四"
                break;
            case "Friday":
                return yes + " 周五"
                break;
            case "Saturday":
                return yes + " 周六"
                break;
            case "Sunday":
                return yes + " 周日"
                break;
            default:
                "星期格式化的时候错误啦！"
        }
    }
}
// 转化成 11：45
export let hour = (data) => {
    return moment(new Date(data)).format('hh:mm:ss')
}
export let nowDataYYYYMMDD = () => {
    return moment().format('YYYY-MM-DD')
}
// 大乐透 标准选号注数计算 n=5 m为红球个数， n=2 m为篮球个数
export let getCombinationCount = (m, n) => {
    n = (n < m - n) ? n : (m - n)
    let a = 1
    for (let i = 1; i <= n; i++) {
        a = a * m--/ i
    }
    return parseInt(a, 0)
}
// 大乐透 胆拖选号注数计算
export let danTuoCount = (a, b, c, d) => {
    // a = 胆红
    // b = 拖红
    // c = 胆蓝
    // d = 拖蓝
    return (numOne(b, 5 - a) * numOne(d, 2 - c))

    function numOne(m, n) {
        n = (n < m - n) ? n : (m - n)
        let a = 1
        for (let i = 1; i <= n; i++) {
            a = a * m--/ i
        }
        return parseInt(a, 0)
    }

}
//机选
export let getArrayItems = (arr, num) => {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}

//大小排序
export let sortFn = (Arr) => {
    let min;
    for (var i = 0; i < Arr.length; i++) {
        for (var j = i; j < Arr.length; j++) {
            if (Arr[i] > Arr[j]) {
                min = Arr[j];
                Arr[j] = Arr[i];
                Arr[i] = min;
            }
        }
    }
    return Arr
}
//大乐透投注信息处理
export let saveDtInfo = (list) => {
    let arr = []
    list.forEach(item => {
        let arrRed = [],
            arrBlue = [],
            tuoarrRed = [],
            tuoarrBlue = [],
            betInfo = ''
        if (item.ballType == 'dantuo') {
            item.ballList.forEach(data => {
                if (data.type == 'danRedBall') {
                    arrRed.push(data.num)
                }
                if (data.type == 'tuoRedBall') {
                    tuoarrRed.push(data.num)
                }
                if (data.type == 'danBlueBall') {
                    arrBlue.push(data.num)
                }
                if (data.type == 'tuoBlueBall') {
                    tuoarrBlue.push(data.num)
                }
            })
            betInfo = `${arrRed.join(',')}$${tuoarrRed.join(',')}|${arrBlue.length>0?arrBlue.join(',')+'$':''}${tuoarrBlue.join(',')}`
        } else {
            item.ballList.forEach(data => {
                if (data.type == 'redBall') {
                    arrRed.push(data.num)
                }
                if (data.type == 'blueBall') {
                    arrBlue.push(data.num)
                }
            })
            betInfo = arrRed.join(',') + '|' + arrBlue.join(',')
        }
        let objinfos = {
            betNum: parseInt(item.msg.zhuNum),
            playType: item.ballType == 'dantuo' ? 2 : item.msg.danFn == '单式' ? 0 : 1,
            amount: item.msg.money,
            betInfo: betInfo
        }
        arr.push(objinfos)
    })
    return arr;
}