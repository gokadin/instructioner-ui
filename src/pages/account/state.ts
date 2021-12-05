import {UserEntity} from "../../models/user.entity";
import {LoadState} from "../../utils/loadState";

export interface AccountState {
    user: UserEntity
    userLoadState: LoadState
    userLoginState: LoadState
    userSignUpState: LoadState
}

export const initialState: AccountState = {
    user: {email: ''},
    userLoadState: LoadState.getInitialState(),
    userLoginState: LoadState.getInitialState(),
    userSignUpState: LoadState.getInitialState(),
}
