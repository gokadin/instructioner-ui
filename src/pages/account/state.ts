import {UserEntity} from "../../models/user.entity";

export interface AccountState {
    user: UserEntity
    isLoggingIn: boolean
    loginError: string
    isSigningUp: boolean
    signUpError: string
    isSignUpSuccess: boolean
}

export const initialState: AccountState = {
    user: {id: '', email: ''},
    isLoggingIn: false,
    loginError: '',
    isSigningUp: false,
    signUpError: '',
    isSignUpSuccess: false
}
