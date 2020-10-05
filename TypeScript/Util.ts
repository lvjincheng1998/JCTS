/**
 * 工具模块
 */
module JC.Util {

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
}