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
const processExercise = (exercise) => {
    let variables = resolveVariables(exercise.variables)

    return {
        ...exercise,
        question: parseContent(exercise.question, variables),
        answerFields: shuffleArray(exercise.answerFields.map(answerField => {
            return {
                ...answerField,
                content: parseContent(answerField.content, variables)
            }
        })),
        hints: exercise.hints.map(hint => {
            return {
                ...hint,
                content: parseContent(hint.content, variables)
            }
        })
    }
}

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

test('process exercise', () => {
    const exercise = {
        "subtopicId": "b146e06b-812a-4610-bc00-8efeafcbd26a",
        "id": "acc47691-e66e-48ee-a736-e3ca10ef8d88",
        "question": "Find the derivative of:\n$$f(x) = @var(a)x^@var(b)$$",
        "hints": [
            {
                "content": "Apply the power rule:\n$$f^\prime(x) = ax^{a-1}$$"
            }
        ],
        "answerFields": [
            {
                "content": "$@solve(@var(a)*@var(b))x^{@solve(@var(b)-1)}$",
                "isCorrect": true
            },
            {
                "content": "$@solve(@var(a)*@var(b))x^{@solve(@var(b)+1)}$",
                "isCorrect": false
            },
            {
                "content": "$@solve(@var(a)*@var(b)-1)x^{@var(b)}$",
                "isCorrect": false
            },
            {
                "content": "$@solve(@var(a)*@var(b)-1)x$",
                "isCorrect": false
            }
        ],
        "variables": [
            {
                "name": "a",
                "default": "3",
                "rangeStart": "2",
                "type": "integer",
                "rangeEnd": "5"
            },
            {
                "name": "b",
                "default": "3",
                "rangeStart": "2",
                "type": "integer",
                "rangeEnd": "6"
            }
        ],
        "difficulty": 1,
        "name": "simple (2)"
    }
    const result = processExercise(exercise)

    expect(result.question).toBe('Find the derivative of:\n$$f(x)=x+15-6$$');
})

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

const SIMPL_FRAC_REGEX = '\\\\frac\\s*{\\s*(-?\\d+)\\s*}\\s*{\\s*(-?\\d+)\\s*}'
const simplifyFractions = (content) => {
    const regex = new RegExp(SIMPL_FRAC_REGEX, 'gm')
    return content.replace(regex, (match, numerator, denominator) => {
        const gcd = greaterCommonDenominator(Math.abs(numerator), Math.abs(denominator))
        numerator /= gcd
        denominator /= gcd
        if (numerator < 0 && denominator < 0) {
            numerator *= -1
            denominator *= -1
        }
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

test('simplifyFractions for valid expression with negative number', () => {
    expect(simplifyFractions('\\frac{-6}{18}')).toBe('\\frac{-1}{3}')
})

test('simplifyFractions for valid expression with two negative numbers', () => {
    expect(simplifyFractions('\\frac{-6}{-18}')).toBe('\\frac{1}{3}')
})

test('simplifyFractions for valid expression of large numbers', () => {
    expect(simplifyFractions('\\frac{1024}{4}')).toBe('256')
})

test('simplifyFractions with lots of whitespaces', () => {
    expect(simplifyFractions('\\frac {  1024 } { 4 }')).toBe('256')
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

const resolveVariables = (variables) => {
    let resolved = {}
    variables.forEach(variable => {
        const min = Math.ceil(variable.rangeStart)
        const max = Math.floor(variable.rangeEnd)
        resolved[variable.name] = Math.floor(Math.random() * (max - min + 1) + min)
    })
    return resolved
}

test('resolve variables', () => {
    const variables = [
        {
            "name": "a",
            "default": "3",
            "rangeStart": "2",
            "type": "integer",
            "rangeEnd": "6"
        }
    ]

    expect(resolveVariables(variables).a).toBe(3)
})

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
    expect(parseContent('$\\frac{@solve(@var(a)*@var(b))}{@var(c)}x^{\\frac{@solve(@var(b)-@var(c))}{@var(c)}}$', {
        a: 4,
        b: 6,
        c: 4
    }))
        .toBe('$6x^{\\frac{1}{2}}$')
})
