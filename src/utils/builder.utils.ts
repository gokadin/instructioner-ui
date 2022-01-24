import {evaluate} from "mathjs";

const VARIABLE_SYMBOL = '@var'
const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`

const SOLVE_SYMBOL = '@solve'
const SOLVE_REGEX = `${SOLVE_SYMBOL}\\(([0-9+\\-_*\\/%^\\s,\\.()]+)\\)`

export const parsePreviewContent = (content: string, variables: any) => {
    const variableRegex = new RegExp(VARIABLE_REGEX, 'gm')
    let result = content.replace(variableRegex, (match, contents) => {
        return variables[contents]
    })

    const solveRegex = new RegExp(SOLVE_REGEX, 'gm')
    result = result.replace(solveRegex, (match, contents) => {
        try {
            contents = removeExtraBrackets(contents)
            return evaluate(contents)
        } catch (error) {
            console.log('error in parsing', error)
            return contents
        }
    })

    return applyMathPostProcesses(result)
}

const removeExtraBrackets = (contents: string) => {
    let bracketCount = 0
    for (let i = 0; i < contents.length; i++) {
        if (contents[i] === '(') {
            bracketCount++
        } else if (contents[i] === ')') {
            bracketCount--
        }
    }

    while (bracketCount < 0) {
        let lastIndex = contents.lastIndexOf(')')
        contents = contents.slice(0, lastIndex) + contents.slice(lastIndex + 1)
        bracketCount++
    }

    return contents
}

const MATH_EXPRESSION_REGEX = '(\\$)([^$]+)(\\$)'
const applyMathPostProcesses = (content: string) => {
    const regex = new RegExp(MATH_EXPRESSION_REGEX, 'gm')
    return content.replace(regex, (match, openingSymbol, mathContent, closingSymbol) => {
        mathContent = simplifyFractions(mathContent)
        mathContent = removeUnitExp(mathContent)
        mathContent = removeConflictingOperators(mathContent)
        return `${openingSymbol}${mathContent}${closingSymbol}`
    })
}

const removeConflictingOperators = (content: string) => {
    content = content.replaceAll('+-', '-')
    return content.replaceAll('--', '+')
}

const UNIT_EXP_REGEX = '\\^1|\\^{[1]}'
const removeUnitExp = (content: string) => {
    const regex = new RegExp(UNIT_EXP_REGEX, 'gm')
    return content.replace(regex, '')
}

const SIMPL_FRAC_REGEX = '\\\\frac\\s*{\\s*(-?\\d+)\\s*}\\s*{\\s*(-?\\d+)\\s*}'
const simplifyFractions = (content: string) => {
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

const greaterCommonDenominator = (a: number, b: number): any => {
    return b ? greaterCommonDenominator(b, a % b) : a
}
