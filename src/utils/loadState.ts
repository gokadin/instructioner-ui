export class LoadState {
    private _isLoaded: boolean
    private _isLoading: boolean
    private _isFailed: boolean
    private _error: string

    public constructor() {
        this._isLoaded = false
        this._isLoading = false
        this._isFailed = false
        this._error = ''
    }

    public shouldLoad = (): boolean => {
        return (!this._isLoaded && !this._isLoading) || this.hasFailed()
    }

    public isLoading = (): boolean => {
        return this._isLoading
    }

    public isReady = (): boolean => {
        return this._isLoaded && !this._isLoading && !this._isFailed
    }

    public hasFailed = (): boolean => {
        return this._isFailed
    }

    public getFailureMessage = (): string => {
        return this._error
    }

    public static getLoadState = (): LoadState => {
        const state = new LoadState()
        state._isLoading = true
        state._isLoaded = false
        state._isFailed = false
        state._error = ''
        return state
    }

    public static getRejectStae = (error: string = ''): LoadState => {
        const state = new LoadState()
        state._isLoaded = true
        state._isLoading = false
        state._isFailed = true
        state._error = error
        return state
    }

    public static getSucceedState = (): LoadState => {
        const state = new LoadState()
        state._isLoaded = true
        state._isLoading = false
        state._isFailed = false
        state._error = ''
        return state
    }
}
