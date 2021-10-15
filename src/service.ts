export const testApi = () => {
    return fetch('https://63fv3x678i.execute-api.us-west-2.amazonaws.com/staging/test', {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
}
