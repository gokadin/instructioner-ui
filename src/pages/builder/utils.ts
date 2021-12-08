import {VariableEntity} from "../../models/variable.entity";

const VARIABLE_SYMBOL = '@var'
const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`

export const formatContent = (content: string) => {
    const regex = buildVariableRegex()
    let formatted = content.replace(regex, (match) => {
        return `<mark class='highlight'>${match}</mark>`
    })
    return formatted.replaceAll('\n', '<br>')
}

export const parseVariables = (content: string): VariableEntity[] => {
    const regex = buildVariableRegex()
    let variables: VariableEntity[] = []
    let match
    while ((match = regex.exec(content)) !== null) {
        const variable: VariableEntity = {
            name: match[1],
            type: 'integer',
            rangeStart: '0',
            rangeEnd: '9',
            default: '5'
        }
        variables.push(variable)
    }
    return variables
}

const buildVariableRegex = () => {
    return new RegExp(VARIABLE_REGEX, 'gm')
}
