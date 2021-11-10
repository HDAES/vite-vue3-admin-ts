/**
 * @description: 首字母大写
 * @param {*}
 * @return {*}
 */
export function firstLetterToUpperCase(str: string | null) {
    if (str == null || str == '') {
        return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description: 全部大写
 * @param {*}
 * @return {*}
 */
export function allUpperCase(str: string | null) {
    if (str == null || str == '') {
        return str
    }
    return str.toUpperCase()
}

/**
 * @description: 手机号码的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const phoneReg: RegExp = /^[1][3456789][0-9]{9}$/

export function isPhone(num: any): boolean {
    return phoneReg.test(num)
}

/**
 * @description: 身份证的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const idCardReg: RegExp  = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

export function isIdCard(num: any): boolean {
    return idCardReg.test(num)
}

/**
 * @description: 邮箱的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

export function isEmail(num: any): boolean {
    return emailReg.test(num)
}

/**
 * @description: URL的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const urlReg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

export function isURL(num: any): boolean {
    return urlReg.test(num)
}

/**
 * @description: IPv4的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const ipv4Reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export function isIpv4(num: any): boolean {
    return ipv4Reg.test(num)
}

/**
 * @description: 16进制颜色的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const color16Reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

export function isColor16(num: any): boolean {
    return color16Reg.test(num)
}

/**
 * @description: 日期 YYYY-MM-DD
 * @param {num: any}
 * @return {Boolean}
 */
export const dateReg = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/

export function isDateReg(num: any): boolean {
    return dateReg.test(num)
}

/**
 * @description: 整数的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const intReg = /^[-+]?\d*$/

export function isInt(num: any): boolean {
    return intReg.test(num)
}

/**
 * @description: 小数的校验
 * @param {num: any}
 * @return {Boolean}
 */
export const floatReg = /^[-\+]?\d+(\.\d+)?$/

export function isFloat(num: any): boolean {
    return floatReg.test(num)
}

/**
* @description: 邮政编号的校验
* @param {num: any}
* @return {Boolean}
*/
export const postalNoReg = /^\d{6}$/

export function isPostalNo(num: any): boolean {
    return postalNoReg.test(num)
}

/**
* @description: 微信号的校验
* @param {num: any}
* @return {Boolean}
*/
export const wxReg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/

export function isWx(num: any): boolean {
    return wxReg.test(num)
}

/**
* @description: 车牌号的校验
* @param {num: any}
* @return {Boolean}
*/
export const carNoReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

export function isCarNo(num: any): boolean {
    return carNoReg.test(num)
}

/**
* @description: 密码强度的校验
* @param {num: any}
* @return {Boolean}
说明：密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符
*/
export const passwordReg = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/

export function isPassword(num: any): boolean {
    return passwordReg.test(num)
}


/**
* @description: 文件拓展名的校验
* @param {filename: string }文件名
* @param {arr: [] } 文件扩展名
* @return {Boolean}
*/
export function checkFileName (filename: string,arr: string[]): boolean {
    let arrString : string = arr.map(name => `.${name}`).join('|')
    let reg: RegExp =  new RegExp(`(${arrString})$`)
    return reg.test(filename)
 }


