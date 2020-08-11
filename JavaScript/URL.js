/**
 * 统一资源定位模块
 */
var JC;
(function (JC) {
    var URL;
    (function (URL) {
        /**
         * 根据当前页面链接返回合适的链接前缀
         */
        function autoHttps() {
            if (window.location.href.startsWith("https")) {
                return "https://";
            }
            else {
                return "http://";
            }
        }
        URL.autoHttps = autoHttps;
        /**
         * 查询当前页面链接的参数值
         * @param key 参数名
         */
        function queryUrlParam(key) {
            var entryStr = window.location.search.substring(1);
            var entrySet = entryStr.split('&');
            for (var _i = 0, entrySet_1 = entrySet; _i < entrySet_1.length; _i++) {
                var entry = entrySet_1[_i];
                var keyValue = entry.split('=');
                if (keyValue[0] == key) {
                    return keyValue[1];
                }
            }
            return undefined;
        }
        URL.queryUrlParam = queryUrlParam;
    })(URL = JC.URL || (JC.URL = {}));
})(JC || (JC = {}));
