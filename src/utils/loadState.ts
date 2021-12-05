export class LoadState {
    private readonly _isLoaded: boolean
    private readonly _isLoading: boolean
    private readonly _isFailed: boolean
    private readonly _error: string

    private constructor(isLoaded: boolean, isLoading: boolean, isFailed: boolean, error: string) {
        this._isLoaded = isLoaded
        this._isLoading = isLoading
        this._isFailed = isFailed
        this._error = error
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

    public static getInitialState = (): LoadState => {
        return new LoadState(false, false, false, '')
    }

    public static getLoadState = (): LoadState => {
        return new LoadState(false, true, false, '')
    }

    public static getRejectStae = (error: string = ''): LoadState => {
        return new LoadState(true, false, true, error)
    }

    public static getSucceedState = (): LoadState => {
        return new LoadState(true, false, false, '')
    }
}
