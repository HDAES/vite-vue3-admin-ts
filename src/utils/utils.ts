/**
 * @description: 首字母大写
 * @param {*}
 * @return {*}
 */
 export function firstLetterToUpperCase(str: string | null){
    if(str == null || str == ''){
        return str
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}