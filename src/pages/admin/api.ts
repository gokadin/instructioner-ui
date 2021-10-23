import {API} from "aws-amplify";

export const testCreateSubject = () => {
    return API.post('topicsx', '/topicsx', JSON.stringify({
        id: '123',
        name: 'testSubject'
    }))
}
