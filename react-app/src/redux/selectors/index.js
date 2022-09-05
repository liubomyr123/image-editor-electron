import { createSelector } from 'reselect';

export const selectOptions = (state) => state.options;

export const optionsSelector = createSelector(
    [selectOptions],
    (options) => options?.options
);
