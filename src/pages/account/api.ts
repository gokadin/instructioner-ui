import {API, Auth} from "aws-amplify";

const API_NAME = 'userSettingsApi'
const USER_SETTINGS_API_PATH = 'user-settings'

export interface SignInPayload {
    username: string,
    password: string
}

export const amplifyCurrentUser = () => {
    Auth.currentSession()
        .then((x) => {
            console.log('cs', x)
        })
        .catch((x) => {
            console.log('cs err', x)
        })

    return Auth.currentAuthenticatedUser()
}

export const amplifySignIn = (payload: SignInPayload) => {
    return Auth.signIn(payload);
}

export interface SignUpPayload {
    username: string,
    password: string
}

export const amplifySignUp = (payload: SignUpPayload) => {
    return Auth.signUp({
        ...payload,
        attributes: {
            email: payload.username
        }
    });
}

export const amplifySignOut = () => {
    return Auth.signOut();
}

export interface PutUserSettingsPayload {
    colorScheme: string
}

export const putUserSettings = (payload: PutUserSettingsPayload) => {
    return API.put(API_NAME, `/${USER_SETTINGS_API_PATH}`, {body: payload})
}

export const getUserSettings = () => {
    return API.get(API_NAME, `/${USER_SETTINGS_API_PATH}/object`, null)
}
