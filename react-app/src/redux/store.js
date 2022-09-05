import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
    optionsSlicer,
} from './slicers';

const rootReducer = combineReducers({
    options: optionsSlicer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;