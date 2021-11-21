import {parseContent, processExercise} from "./app";

test('variable is replaced', () => {
    const result = parseContent('@var(a) and @var(b)', {a: 5, b: 6})

    expect(result).toBe('5 and 6');
})

test('solve is evaluated', () => {
    const result = parseContent('@solve(@var(a) + @var(b))', {a: 5, b: 6})

    expect(result).toBe('11');
})

test('process exercise', () => {
    const exercise = {
        "subtopicId": "e8b5c90f-8058-453b-b20c-186526630e0a",
        "id": "d2277b0f-f636-4fd2-a324-a8646ffbebb4",
        "question": "Find the derivative of:\n$$f(x)=x+@var(a)-@var(b)$$",
        "hints": [
            {
                "content": "$$f\\'(x)=\\lim_{h \\\\to \\\\infty} \\\\frac{f(x+h)-f(x)}{h}$$"
            },
            {
                "content": "$$f(x)=x+@solve(@var(a)-@var(b))$$ and $$f(x+h)=x+@solve(@var(a)-@var(b))+h$$\n$$=\\\\lim_{h \\\\to \\\\infty} \\\\frac{x+@solve(@var(a)-@var(b))+h-(x+@solve(@var(a)-@var(b))}{h}$$"
            }
        ],
        "answerFields": [
            {
                "content": "$1$",
                "isCorrect": true
            },
            {
                "content": "$x$",
                "isCorrect": false
            },
            {
                "content": "$@solve(@var(a)+@var(b))$",
                "isCorrect": false
            },
            {
                "content": "$0$",
                "isCorrect": false
            }
        ],
        "variables": [
            {
                "name": "a",
                "default": "15",
                "rangeStart": "11",
                "type": "integer",
                "rangeEnd": "20"
            },
            {
                "name": "b",
                "default": "6",
                "rangeStart": "1",
                "type": "integer",
                "rangeEnd": "9"
            }
        ],
        "name": "1st degree (2)"
    }

    const result = processExercise(exercise)

    expect(result.question).toBe('Find the derivative of:\n$$f(x)=x+15-6$$');
})
