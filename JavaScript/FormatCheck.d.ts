/**
 * 格式校验模块
 */
declare module JC.FormatCheck {
    /**
     * 检测字符串是否包含中文
     * @param str 待检测字符串
     */
    function hasChinese(str: string): boolean;
    /**
     * 检测字符串是否为全中文
     * @param str 待检测字符串
     */
    function isFullChinese(str: string): boolean;
    /**
     * 检测字符串是否为字母或数字
     * @param str 待检测字符串
     */
    function isLetterOrNum(str: string): boolean;
    /**
     * 检测字符串是否为日期
     * @param str 待检测字符串
     * @param separator 分隔符
     */
    function checkDate(str: string, separator: string): boolean;
    /**
     * 检测字符串是否为邮箱
     * @param str 待检测字符串
     */
    function checkEmail(str: string): boolean;
    /**
    * 检测字符串是否为手机号
    * @param str 待检测字符串
    */
    function checkPhone(str: string): boolean;
    /**
    * 检测字符串是否为身份证
    * @param str 待检测字符串
    */
    function checkIdCard(str: string): boolean;
}
