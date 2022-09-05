import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
    optionsSlicer,
    fileSlicer
} from './slicers';

const rootReducer = combineReducers({
    options: optionsSlicer,
    file: fileSlicer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;