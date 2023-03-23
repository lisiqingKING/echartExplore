export function ObjectStringfy (strs: string): string {
    let v: string = ''
    const toNewLineChar: string = '\n'
    const blankChar: string = '    '
    let blankUnit: number = 0
    let curIndex: number = 0
    
   
    const toNewLineAndAddBlank = ['[', '{']
    const toNewLineAndDecaseBlank = [']','}']
    const toNewLine = [',']
    const produceBlankStrs = (): string => {
        return new Array(blankUnit).fill(blankChar).join('')
    }
    while(strs.length > curIndex) {
        let c = strs[curIndex]
        if (toNewLineAndAddBlank.includes(c)) {
            blankUnit += 1
            v += c + toNewLineChar + produceBlankStrs()
        } else if (toNewLine.includes(c)) {
            v += c + toNewLineChar + produceBlankStrs()
        } else if (toNewLineAndDecaseBlank.includes(c)) {
            blankUnit -= 1
            v += (toNewLineChar + produceBlankStrs()) + c
        } else {
            v += c
        }

        curIndex += 1
    }

    return v
}

// let v = ObjectStringfy(JSON.stringify(
//     {name:'aa', info:{}, test:[1,2,3,333], age: {age:100, info:{hh: [1,2,3,5,{ ZYS: { name: 'zzz', asset:['a','b'] }}]}}})
// )
// console.log('结果', '\n')
// console.log(v)

