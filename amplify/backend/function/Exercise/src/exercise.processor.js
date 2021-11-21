// import * as math from "mathjs";
//
// const VARIABLE_SYMBOL = '@var'
// const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`
//
// const SOLVE_SYMBOL = '@solve'
// const SOLVE_REGEX = `${SOLVE_SYMBOL}\\(([0-9+\\-_*\\/%^\\s,a-zA-Z]+)\\)`
//
// export const processExercise = (exercise) => {
//     let variables = resolveVariables(exercise.variables)
//
//     return {
//         ...exercise,
//         question: parseContent(exercise.question, variables),
//         answerFields: shuffleArray(exercise.answerFields.map(answerField => {
//             return {
//                 ...answerField,
//                 content: parseContent(answerField.content, variables)
//             }
//         })),
//         hints: exercise.hints.map(hint => {
//             return {
//                 ...hint,
//                 content: parseContent(hint.content, variables)
//             }
//         })
//     }
// }
//
// const resolveVariables = (variables) => {
//     let resolved = {}
//     variables.forEach(variable => {
//         resolved[variable.name] = variable.default.toString()
//     })
//     return resolved
// }
//
// export const parseContent = (content, variables) => {
//     const variableRegex = new RegExp(VARIABLE_REGEX, 'gm')
//     let result = content.replace(variableRegex, (match, contents) => {
//         return variables[contents]
//     })
//
//     const solveRegex = new RegExp(SOLVE_REGEX, 'gm')
//     result = result.replace(solveRegex, (match, contents) => {
//         return math.evaluate(contents)
//     })
//
//     return result
// }
//
// const shuffleArray = (a) => {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]]
//     }
//     return a
// }
//
// module.exports = processExercise
