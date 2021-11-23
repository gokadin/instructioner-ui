import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectUser = createSelector(
    (state: RootState) => state.account,
    (state) => state.user
)

export const selectIsLoaded = createSelector(
    (state: RootState) => state.account,
    (state) => state.isUserLoaded
)

export const selectIsLoggedIn = createSelector(
    (state: RootState) => state.account,
    (state) => state.user.email !== ''
)

export const selectIsLoggingIn = createSelector(
    (state: RootState) => state.account,
    (state) => state.isLoggingIn
)

export const selectIsUserLoading = createSelector(
    (state: RootState) => state.account,
    (state) => state.isUserLoading
)

export const selectLoginError = createSelector(
    (state: RootState) => state.account,
    (state) => state.loginError
)

export const selectIsSigningUp = createSelector(
    (state: RootState) => state.account,
    (state) => state.isSigningUp
)

export const selectSignUpError = createSelector(
    (state: RootState) => state.account,
    (state) => state.signUpError
)

export const selectIsSignUpSuccess = createSelector(
    (state: RootState) => state.account,
    (state) => state.isSignUpSuccess
)
