/**
 * 工具模块
 */
declare module JC.Util {
    /**
     * 对数组进行洗牌式排序
     * @param arr 任意数组
     */
    function shuffleSort(arr: any[]): void;
    /**
     * 对象属性更新
     * @param oldObject 旧对象
     * @param newObject 新对象
     */
    function updateObject(oldObject: any, newObject: any): void;
    /**
     * 对象属性覆盖
     * @param oldObject 旧对象
     * @param newObject 新对象
     */
    function coverObject(oldObject: any, newObject: any): void;
    /**
     * 32位通用唯一识别码
     */
    function uuid(): string;
}
