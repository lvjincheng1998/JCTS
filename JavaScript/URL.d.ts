/**
 * 统一资源定位模块
 */
declare module JC.URL {
    /**
     * 根据当前页面链接返回合适的链接前缀
     */
    function autoHttps(): string;
    /**
     * 查询当前页面链接的参数值
     * @param key 参数名
     */
    function queryUrlParam(key: string): string | undefined;
}
