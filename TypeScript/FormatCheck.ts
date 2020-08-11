/**
 * 格式校验模块
 */
module JC.FormatCheck {
    
    /**
     * 检测字符串是否包含中文
     * @param str 待检测字符串
     */
    export function hasChinese(str: string): boolean {
		for (let i = 0; i < str.length; i++) {
			let patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
			if (patrn.exec(str[i])){
				return true;
			}
		}	
		return false;
    }
    
    /**
     * 检测字符串是否为全中文
     * @param str 待检测字符串
     */
    export function isFullChinese(str: string): boolean {
		for (let i = 0; i < str.length; i++) {
			let patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
			if (!patrn.exec(str[i])){
				return false;
			}
		}	
		return true;
    }
    
    /**
     * 检测字符串是否为字母或数字
     * @param str 待检测字符串
     */
    export function isLetterOrNum(str: string) {
        return /^[\d\w]+$/.test(str);
    }

    /**
     * 检测字符串是否为日期
     * @param str 待检测字符串
     * @param separator 分隔符
     */
    export function checkDate(str: string, separator: string): boolean {
        let dateArray = str.split(separator);
        if (dateArray.length < 3) {
            return false;
        }
        for (let elem of dateArray) {
            if (isNaN((elem as any))) {
                return false;
            }
        }
        let year = Number(dateArray[0]);
        let month = Number(dateArray[1]);
        let day = Number(dateArray[2]);
        let dateObj = new Date(year, month - 1, day),
            nYear = dateObj.getFullYear(),
            nMonth = dateObj.getMonth() + 1,
            nDay = dateObj.getDate();
        if (year == nYear && month == nMonth && day == nDay) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 检测字符串是否为邮箱
     * @param str 待检测字符串
     */
    export function checkEmail(str: string): boolean {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

     /**
     * 检测字符串是否为手机号
     * @param str 待检测字符串
     */
    export function checkPhone(str: string): boolean {
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!reg.test(str)) {
		    return false;
		} else {
		    return true;
		}
    }
    
     /**
     * 检测字符串是否为身份证
     * @param str 待检测字符串
     */
    export function checkIdCard(str: string): boolean {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }
}