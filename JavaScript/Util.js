/**
 * 工具模块
 */
var JC;
(function (JC) {
    var Util;
    (function (Util) {
        /**
         * 对数组进行洗牌式排序
         * @param arr 任意数组
         */
        function shuffleSort(arr) {
            var _a;
            var n = arr.length;
            while (n--) {
                var index = Math.floor(Math.random() * n);
                _a = [arr[n], arr[index]], arr[index] = _a[0], arr[n] = _a[1];
            }
        }
        Util.shuffleSort = shuffleSort;
        /**
         * 对象属性更新
         * @param oldObject 旧对象
         * @param newObject 新对象
         */
        function updateObject(oldObject, newObject) {
            for (var p in newObject) {
                oldObject[p] = newObject[p];
            }
        }
        Util.updateObject = updateObject;
        /**
         * 对象属性覆盖
         * @param oldObject 旧对象
         * @param newObject 新对象
         */
        function coverObject(oldObject, newObject) {
            for (var p in oldObject) {
                delete oldObject[p];
            }
            for (var p in newObject) {
                oldObject[p] = newObject[p];
            }
        }
        Util.coverObject = coverObject;
        /**
         * 32位通用唯一识别码
         */
        function uuid() {
            var arr = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                arr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            arr[14] = "4";
            arr[19] = hexDigits.substr((arr[19] & 0x3) | 0x8, 1);
            arr[8] = arr[13] = arr[18] = arr[23] = "";
            return arr.join("");
        }
        Util.uuid = uuid;
        /**
         * 获取日期字符串
         */
        function getDateStr() {
            var date = new Date();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            month = month < 10 ? ('0' + month) : month;
            day = day < 10 ? ('0' + day) : day;
            var dateStr = date.getFullYear() + '-' + month + '-' + day;
            return dateStr;
        }
        Util.getDateStr = getDateStr;
    })(Util = JC.Util || (JC.Util = {}));
})(JC || (JC = {}));
