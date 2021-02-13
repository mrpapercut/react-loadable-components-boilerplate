export const LOADER_IS_LOADING = 'LOADER_IS_LOADING';
export const isLoading = bool => ({
    type: LOADER_IS_LOADING,
    isLoading: bool
});
