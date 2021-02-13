import thunk from 'redux-thunk';
import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';

import mainReducer from './mainReducer';

const combinedReducer = combineReducers({
    mainReducer
});

export default () => {
    return typeof window === 'undefined'
        ? createStore(combinedReducer, applyMiddleware(thunk))
        : createStore(combinedReducer, window.__PRELOADED_STATE__, applyMiddleware(thunk));
};
