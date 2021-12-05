import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectUser = createSelector(
    (state: RootState) => state.account,
    (state) => state.user
)

export const selectUserLoadState = createSelector(
    (state: RootState) => state.account,
    (state) => state.userLoadState
)

export const selectUserLoginState = createSelector(
    (state: RootState) => state.account,
    (state) => state.userLoginState
)

export const selectUserSignUpState = createSelector(
    (state: RootState) => state.account,
    (state) => state.userSignUpState
)
