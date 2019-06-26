var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?add59b43ed799751ac06c40214d0b5b7";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
$(window).resize(function () {
	if (document.activeElement.tagName === 'INPUT') {
		document.activeElement.scrollIntoView({
			behavior: "smooth"
		})
	}
});
// var baseUrl = 'https://api.caixiaomi.net/api/'
// var baseUrl = 'http://yf.caixiaomi.net/api'
var baseUrl = 'http://39.106.18.39:8765/api/'