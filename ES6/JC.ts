export module JC {

    /**
     * 格式校验模块
     */
    export module FormatCheck {
        
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

    /**
     * 工具模块
     */
    module Util {

        /**
         * 对数组进行洗牌式排序
         * @param arr 任意数组
         */
        export function shuffleSort(arr: any[]) {
            let n = arr.length;
            while(n--) {
                let index = Math.floor(Math.random() * n);
                [arr[index], arr[n]] = [arr[n], arr[index]];
            }
        }

        /**
         * 对象属性更新
         * @param oldObject 旧对象
         * @param newObject 新对象
         */
        export function updateObject(oldObject: any, newObject: any) {
            for (let p in newObject) {
                oldObject[p] = newObject[p];
            }
        }

        /**
         * 对象属性覆盖
         * @param oldObject 旧对象
         * @param newObject 新对象
         */
        export function coverObject(oldObject: any, newObject: any) {
            for (let p in oldObject) {
                delete oldObject[p];
            }
            for (let p in newObject) {
                oldObject[p] = newObject[p];
            }
        }

        /**
         * 32位通用唯一识别码
         */
        export function uuid(): string {
            let arr = [];
            let hexDigits = "0123456789abcdef";
            for (let i = 0; i < 36; i++) {
                arr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            arr[14] = "4";
            arr[19] = hexDigits.substr((arr[19] & 0x3) | 0x8, 1);
            arr[8] = arr[13] = arr[18] = arr[23] = "";
            return arr.join("");
        }

        /**
         * 获取日期字符串
         */
        export function getDateStr(): string {
            let date = new Date();
            let month: any = date.getMonth() + 1;
            let day: any = date.getDate();
            month = month < 10 ? ('0' + month) : month;  
            day = day < 10 ? ('0' + day) : day;
            let dateStr = date.getFullYear() + '-' + month + '-' + day;
            return dateStr;
        }
    }

    /**
     * 统一资源定位模块
     */
    export module URL {
        
        /**
         * 根据当前页面链接返回合适的链接前缀
         */
        export function autoHttps(): string {
            if ((window.location.href as any).startsWith("https")) {
                return "https://";
            } else {
                return "http://";
            }
        }

        /**
         * 查询当前页面链接的参数值
         * @param key 参数名
         */    
        export function queryUrlParam(key: string): string | undefined {
            let entryStr = window.location.search.substring(1);
            let entrySet = entryStr.split('&');
            for (let entry of entrySet) {
                let keyValue = entry.split('=');
                if (keyValue[0] == key) {
                    return keyValue[1];
                } 
            }
            return undefined;
        }
    }
    
    /**
     * 超文本传输协议模块
     */
    export module HTTP {
        
        /**
         * AJAX 通过 XMLHttpRequest 对象向服务器发送请求
         * @param requestObject 请求对象信息配置
         */
        export function request(requestObject: RequestObject) {
            requestObject.async = (requestObject.async == undefined ? true : requestObject.async);
            requestObject.method = (requestObject.method == undefined ? RequestMethod.GET : requestObject.method);
            requestObject.data = (requestObject.data == undefined ? {} : requestObject.data);
            requestObject.dataType = (requestObject.dataType == undefined ? DataType.FORM : requestObject.dataType);
            requestObject.responeType = (requestObject.responeType == undefined ? ResponeType.Object : requestObject.responeType);
            requestObject.debug = (requestObject.debug == undefined ? false : requestObject.debug);

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (requestObject.debug) {
                    console.warn(
                        "request_url: ", requestObject.url, 
                        "request_readyState: ", xhr.readyState,
                        "request_status: ", xhr.status,
                    );
                }
                if (xhr.readyState < 4) {
                    return;
                }
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (requestObject.success instanceof Function) {
                        if (requestObject.responeType == ResponeType.Object) {
                            if (requestObject.debug) {
                                console.warn("request_url: ", requestObject.url, "result will parse to json");
                            }
                            let result = undefined;
                            try {
                                result = JSON.parse(xhr.responseText);
                                if (requestObject.debug) {
                                    console.warn("request_url: ", requestObject.url, "result parse to json success", result);
                                }
                            } catch {
                                result = xhr.responseText;
                                if (requestObject.debug) {
                                    console.error("request_url: ", requestObject.url, "result can not parse to json", result);
                                }
                            }
                            requestObject.success(result);
                        } else if (requestObject.responeType == ResponeType.String) {
                            let result = xhr.responseText;
                            if (requestObject.debug) {
                                console.warn("request_url: ", requestObject.url, "result parse to text", result);
                            }
                            requestObject.success(result);
                        }
                    }
                } else {
                    if (requestObject.fail instanceof Function) {
                        requestObject.fail();
                    }
                }
            };

            let getUrlForm = function(dataObject:any, startChar:string, centerChar:string): string {
                let str = ""; 
                if (dataObject) {
                    let paramIndex = -1;
                    for (let key in dataObject) {
                        paramIndex++;
                        str += (paramIndex == 0 ? startChar : centerChar);
                        str += key + '=' + encodeURIComponent(dataObject[key]);
                    }
                }
                return str;
            }

            if (requestObject.method == RequestMethod.GET) {
                xhr.open("GET", requestObject.url += getUrlForm(requestObject.data, '?', '&'), requestObject.async);
                xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
                xhr.send();
            } else if (requestObject.method == RequestMethod.POST) {
                xhr.open("POST", requestObject.url, requestObject.async);
                if (requestObject.dataType == DataType.FORM) {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send(getUrlForm(requestObject.data, '', '&'));
                } else if (requestObject.dataType == DataType.JSON) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify(requestObject.data));
                }
            }
        }

        /**
         * 用于配置请求信息的对象
         */
        export interface RequestObject {
            /** 请求地址 */
            url: string; 
            /** 调试输出 */
            debug?: boolean;
            /** 异步请求 */
            async?: boolean;
            /** 请求方法类型 */
            method?: RequestMethod;
            /** 请求数据 */
            data?: any;
            /** 请求数据类型 */
            dataType?: DataType;
            /** 返回数据类型 */
            responeType?: ResponeType;
            /** 请求成功回调函数 */
            success?: Function;
            /** 请求失败回调函数 */
            fail?: Function;
        }

        /**
         * 请求数据类型
         */
        export enum DataType {FORM, JSON}

        /**
         * 请求方法类型
         */
        export enum RequestMethod {GET, POST}

        /**
         * 返回数据类型
         */
        export enum ResponeType {Object, String}
    }

    /**
     * 事件传递-订阅发布模式
     */
    export module Event {

        export class EventBox {
            private eventMap: Map<number | string, EventTarget[]> = new Map();
            /**这是事件目标数组锁，应用于在处理emit的内部循环操作时，如果执行的目标函数内出现移除操作，不能直接移除，而是给它打上失效标记 */
            private eventTargetsLock: EventTarget[] = null;
            /**在加锁后，出现多少次移除操作 */
            private removeCountOnLock: number = 0;
        
            public on(event: number | string, context: any, method: Function, once: boolean = false) {
                let eventTargets = this.eventMap.get(event);
                if (eventTargets) {
                    let eventTarget: EventTarget = {context: context, method: method, isValid: true, once: once};
                    eventTargets.push(eventTarget);
                } else {
                    let eventTarget: EventTarget = {context: context, method: method, isValid: true, once: once};
                    this.eventMap.set(event, [eventTarget]); 
                }
            }
        
            public once(event: number | string, context: any, method: Function) {
                this.on(event, context, method, true);
            }
        
            public off(event: number | string, context?: any, method?: Function) {
                let eventTargets = this.eventMap.get(event);
                if (eventTargets) {
                    if (event && !context && !method) {
                        if (eventTargets.length > 0) {
                            if (eventTargets == this.eventTargetsLock) {
                                for (let eventTarget of eventTargets) {
                                    eventTarget.isValid = false;
                                    this.removeCountOnLock++;
                                }
                            } else {
                                eventTargets.splice(0, eventTargets.length);
                            }
                        }
                    }
                    if (event && context && !method) {
                        for (let i = eventTargets.length - 1; i >= 0; i--) {
                            let eventTarget = eventTargets[i];
                            if (eventTarget.context == context) {
                                eventTargets == this.eventTargetsLock ? (eventTarget.isValid = false, this.removeCountOnLock++) : eventTargets.splice(i, 1);
                            }
                        } 
                    }
                    if (event && context && method) {
                        for (let i = eventTargets.length - 1; i >= 0; i--) {
                            let eventTarget = eventTargets[i];
                            if (eventTarget.context == context && eventTarget.method == method) {
                                eventTargets == this.eventTargetsLock ? (eventTarget.isValid = false, this.removeCountOnLock++) : eventTargets.splice(i, 1);
                            }
                        } 
                    }
                }
            }
        
            public emit(event: number | string, args?: any[]) {
                let eventTargets = this.eventMap.get(event);
                if (eventTargets) {
                    //上锁，后面循环处理的函数中如果出现移除注册事件操作，不能直接移除，应该打上失效标记
                    this.eventTargetsLock = eventTargets;
                    //循环处理目标函数
                    for (let eventTarget of eventTargets) {
                        try {
                            eventTarget.method.apply(eventTarget.context, args);
                        } catch (e) {}
                        if (eventTarget.once) {
                            eventTarget.isValid = false;
                            this.removeCountOnLock++;
                        }
                    }
                    //解锁
                    this.eventTargetsLock = null;
                    //移除失效的注册事件
                    if (this.removeCountOnLock > 0) {
                        for (let i = eventTargets.length - 1; i >= 0; i--) {
                            if (!eventTargets[i].isValid) {
                                eventTargets.splice(i, 1);
                            }
                        }
                        this.removeCountOnLock = 0;
                    }
                }
            }
        }
        
        interface EventTarget {
            context: any;
            method: Function;
            isValid: boolean;
            once: boolean;
        }
    }
}