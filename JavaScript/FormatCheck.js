/**
 * 格式校验模块
 */
var JC;
(function (JC) {
    var FormatCheck;
    (function (FormatCheck) {
        /**
         * 检测字符串是否包含中文
         * @param str 待检测字符串
         */
        function hasChinese(str) {
            for (var i = 0; i < str.length; i++) {
                var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
                if (patrn.exec(str[i])) {
                    return true;
                }
            }
            return false;
        }
        FormatCheck.hasChinese = hasChinese;
        /**
         * 检测字符串是否为全中文
         * @param str 待检测字符串
         */
        function isFullChinese(str) {
            for (var i = 0; i < str.length; i++) {
                var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
                if (!patrn.exec(str[i])) {
                    return false;
                }
            }
            return true;
        }
        FormatCheck.isFullChinese = isFullChinese;
        /**
         * 检测字符串是否为字母或数字
         * @param str 待检测字符串
         */
        function isLetterOrNum(str) {
            return /^[\d\w]+$/.test(str);
        }
        FormatCheck.isLetterOrNum = isLetterOrNum;
        /**
         * 检测字符串是否为日期
         * @param str 待检测字符串
         * @param separator 分隔符
         */
        function checkDate(str, separator) {
            var dateArray = str.split(separator);
            if (dateArray.length < 3) {
                return false;
            }
            for (var _i = 0, dateArray_1 = dateArray; _i < dateArray_1.length; _i++) {
                var elem = dateArray_1[_i];
                if (isNaN(elem)) {
                    return false;
                }
            }
            var year = Number(dateArray[0]);
            var month = Number(dateArray[1]);
            var day = Number(dateArray[2]);
            var dateObj = new Date(year, month - 1, day), nYear = dateObj.getFullYear(), nMonth = dateObj.getMonth() + 1, nDay = dateObj.getDate();
            if (year == nYear && month == nMonth && day == nDay) {
                return true;
            }
            else {
                return false;
            }
        }
        FormatCheck.checkDate = checkDate;
        /**
         * 检测字符串是否为邮箱
         * @param str 待检测字符串
         */
        function checkEmail(str) {
            var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if (reg.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }
        FormatCheck.checkEmail = checkEmail;
        /**
        * 检测字符串是否为手机号
        * @param str 待检测字符串
        */
        function checkPhone(str) {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(str)) {
                return false;
            }
            else {
                return true;
            }
        }
        FormatCheck.checkPhone = checkPhone;
        /**
        * 检测字符串是否为身份证
        * @param str 待检测字符串
        */
        function checkIdCard(str) {
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }
        FormatCheck.checkIdCard = checkIdCard;
    })(FormatCheck = JC.FormatCheck || (JC.FormatCheck = {}));
})(JC || (JC = {}));
