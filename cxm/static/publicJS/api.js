$(window).resize(function () {
	if (document.activeElement.tagName === 'INPUT') {
		document.activeElement.scrollIntoView({
			behavior: "smooth"
		})
	}
});
var baseUrl = 'http://94.191.113.169:8765/api/'  //正式
//var baseUrl = 'http://49.232.65.109:8765/api/'  //测试