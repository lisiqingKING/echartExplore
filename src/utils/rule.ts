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

export const isStringArrayOrStringObject = (str: string) => {
      // 判断是否是字符串化的数组
      let result: boolean = true
      try {
          result = typeof eval(str) === 'object'
      } catch(err) {
          result  = false
      }
      return result
}