export const isStringfyArrayStr = (str: string) => {
    // 判断是否是字符串化的数组
    let result: boolean = true
    try {
        result = Array.isArray(eval(str))
    } catch(err) {
        result  = false
    }
    return result
}