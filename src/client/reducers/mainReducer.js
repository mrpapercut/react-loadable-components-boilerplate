import {LOADER_IS_LOADING} from '~/actions/mainActions';

const initialState = {
    isLoading: false
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });

        default:
            return state;
    }
};

export default mainReducer;
