import {Auth} from "aws-amplify";

export interface SignInPayload {
    username: string,
    password: string
}

export const amplifyCurrentUser = () => {
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
