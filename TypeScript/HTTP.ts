/**
 * 超文本传输协议模块
 */
module JC.HTTP {
    
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