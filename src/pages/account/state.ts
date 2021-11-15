import {UserEntity} from "../../models/user.entity";

export interface AccountState {
    user: UserEntity
    isUserLoading: boolean
    isUserLoaded: boolean
    isLoggingIn: boolean
    loginError: string
    isSigningUp: boolean
    signUpError: string
    isSignUpSuccess: boolean
}

export const initialState: AccountState = {
    user: {id: '', email: ''},
    isUserLoading: false,
    isUserLoaded: false,
    isLoggingIn: false,
    loginError: '',
    isSigningUp: false,
    signUpError: '',
    isSignUpSuccess: false
}
