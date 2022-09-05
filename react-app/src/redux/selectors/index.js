import { createSelector } from 'reselect';

export const selectOptions = (state) => state.options;
export const selectFile = (state) => state.file;

export const optionsSelector = createSelector(
    [selectOptions],
    (options) => options?.options
);

export const fileSelector = createSelector(
    [selectFile],
    (file) => file?.file
);

export const fileUrlSelector = createSelector(
    [selectFile],
    (file) => file?.file?.fileUrl
);
