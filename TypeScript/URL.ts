/**
 * 统一资源定位模块
 */
module JC.URL {
    
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