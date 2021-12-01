import {evaluate} from "mathjs";

const VARIABLE_SYMBOL = '@var'
const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`

const SOLVE_SYMBOL = '@solve'
const SOLVE_REGEX = `${SOLVE_SYMBOL}\\(([0-9+\\-_*\\/%^\\s,a-zA-Z()]+)\\)`

export const parsePreviewContent = (content: string, variables: any) => {
    const variableRegex = new RegExp(VARIABLE_REGEX, 'gm')
    let result = content.replace(variableRegex, (match, contents) => {
        return variables[contents]
    })

    const solveRegex = new RegExp(SOLVE_REGEX, 'gm')
    result = result.replace(solveRegex, (match, contents) => {
        try {
            return evaluate(contents)
        } catch (error) {
            return contents
        }
    })

    return result
}
