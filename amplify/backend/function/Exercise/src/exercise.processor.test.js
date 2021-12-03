// import {parseContent} from "./app";

// test('variable is replaced', () => {
//     const result = parseContent('@var(a) and @var(b)', {a: 5, b: 6})
//
//     expect(result).toBe('5 and 6');
// })
//
// test('solve is evaluated', () => {
//     const result = parseContent('@solve(@var(a) + @var(b))', {a: 5, b: 6})
//
//     expect(result).toBe('11');
// })
//
// test('process exercise', () => {
//     const exercise = {
//         "subtopicId": "e8b5c90f-8058-453b-b20c-186526630e0a",
//         "id": "d2277b0f-f636-4fd2-a324-a8646ffbebb4",
//         "question": "Find the derivative of:\n$$f(x)=x+@var(a)-@var(b)$$",
//         "hints": [
//             {
//                 "content": "$$f\\'(x)=\\lim_{h \\\\to \\\\infty} \\\\frac{f(x+h)-f(x)}{h}$$"
//             },
//             {
//                 "content": "$$f(x)=x+@solve(@var(a)-@var(b))$$ and $$f(x+h)=x+@solve(@var(a)-@var(b))+h$$\n$$=\\\\lim_{h \\\\to \\\\infty} \\\\frac{x+@solve(@var(a)-@var(b))+h-(x+@solve(@var(a)-@var(b))}{h}$$"
//             }
//         ],
//         "answerFields": [
//             {
//                 "content": "$1$",
//                 "isCorrect": true
//             },
//             {
//                 "content": "$x$",
//                 "isCorrect": false
//             },
//             {
//                 "content": "$@solve(@var(a)+@var(b))$",
//                 "isCorrect": false
//             },
//             {
//                 "content": "$0$",
//                 "isCorrect": false
//             }
//         ],
//         "variables": [
//             {
//                 "name": "a",
//                 "default": "15",
//                 "rangeStart": "11",
//                 "type": "integer",
//                 "rangeEnd": "20"
//             },
//             {
//                 "name": "b",
//                 "default": "6",
//                 "rangeStart": "1",
//                 "type": "integer",
//                 "rangeEnd": "9"
//             }
//         ],
//         "name": "1st degree (2)"
//     }
//
//     const result = processExercise(exercise)
//
//     expect(result.question).toBe('Find the derivative of:\n$$f(x)=x+15-6$$');
// })

const {evaluate} = require("mathjs");
const UNIT_EXP_REGEX = '\\^1|\\^{[1]}'
const removeUnitExp = (content) => {
    const unitExpRegex = new RegExp(UNIT_EXP_REGEX, 'gm')
    return content.replace(unitExpRegex, '')
}

test('removeUnitExp with braces', () => {
    expect(removeUnitExp('x^{1}')).toBe('x')
})

test('removeUnitExp without braces', () => {
    expect(removeUnitExp('x^1')).toBe('x')
})

const SIMPL_FRAC_REGEX = '\\\\frac{(\\d+)}{(\\d+)}'
const simplifyFractions = (content) => {
    const regex = new RegExp(SIMPL_FRAC_REGEX, 'gm')
    return content.replace(regex, (match, numerator, denominator) => {
        const gcd = greaterCommonDenominator(numerator, denominator)
        numerator /= gcd
        denominator /= gcd
        return denominator > 1 ? `\\frac{${numerator}}{${denominator}}` : numerator
    })
}

const greaterCommonDenominator = (a, b) => {
    return b ? greaterCommonDenominator(b, a % b) : a
}

test('simplifyFractions for valid expression', () => {
    expect(simplifyFractions('\frac{6}{4}')).toBe('\frac{3}{2}')
})

test('simplifyFractions for valid expression with greater denominator', () => {
    expect(simplifyFractions('\frac{6}{18}')).toBe('\frac{1}{3}')
})

test('simplifyFractions for valid expression of large numbers', () => {
    expect(simplifyFractions('\frac{1024}{4}')).toBe('256')
})

test('simplifyFractions for invalid expression', () => {
    expect(simplifyFractions('\frac{x}{4}')).toBe('\frac{x}{4}')
})

const MATH_EXPRESSION_REGEX = '(\\$)([^$]+)(\\$)'
const applyMathPostProcesses = (content) => {
    const regex = new RegExp(MATH_EXPRESSION_REGEX, 'gm')
    return content.replace(regex, (match, openingSymbol, mathContent, closingSymbol) => {
        mathContent = removeUnitExp(mathContent)
        mathContent = simplifyFractions(mathContent)
        return `${openingSymbol}${mathContent}${closingSymbol}`
    })
}

test('applyMathPostProcesses transforms only math expressions', () => {
    expect(applyMathPostProcesses('$\frac{6}{4}$')).toBe('$\frac{3}{2}$')
})

test('applyMathPostProcesses transforms only math expressions with double symbols', () => {
    expect(applyMathPostProcesses('$$\frac{6}{4} + x^1$$')).toBe('$$\frac{3}{2} + x$$')
})

test('applyMathPostProcesses transforms multiple expressions', () => {
    expect(applyMathPostProcesses('some $x^1$$$\frac{6}{4} + x^1$$ $$x^1$$')).toBe('some $x$$$\frac{3}{2} + x$$ $$x$$')
})

const VARIABLE_SYMBOL = '@var'
const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`

const SOLVE_SYMBOL = '@solve'
const SOLVE_REGEX = `${SOLVE_SYMBOL}\\(([0-9+\\-_*\\/%^\\s,a-zA-Z()]+)\\)`
const parseContent = (content, variables) => {
    const variableRegex = new RegExp(VARIABLE_REGEX, 'gm')
    let result = content.replace(variableRegex, (match, contents) => {
        return variables[contents]
    })

    const solveRegex = new RegExp(SOLVE_REGEX, 'gm')
    result = result.replace(solveRegex, (match, contents) => {
        return evaluate(contents)
    })

    return applyMathPostProcesses(result)
}

test('parseContent transforms multiple expressions', () => {
    expect(parseContent('$\\frac{@solve(@var(a)*@var(b))}{@var(c)}x^{\\frac{@solve(@var(b)-@var(c))}{@var(c)}}$', {a: 4, b: 6, c: 4}))
        .toBe('$6x^{\\frac{1}{2}}$')
})
