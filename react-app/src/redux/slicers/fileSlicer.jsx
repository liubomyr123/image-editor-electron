import { createSlice } from '@reduxjs/toolkit'

export const defaultFileState = {
    fileUrl: require('./../../assets/png/preview-icon-bright.png'),
    fileObj: {},
    isDefault: true
};

const fileSlicer = createSlice({
    name: 'file',
    initialState: {
        file: defaultFileState
    },
    reducers: {
        resetFile(state) {
            state.file = defaultFileState;
        },
        updateFileUrl(state, action) {
            const { fileUrl } = action.payload;

            state.file.fileUrl = fileUrl;
        },
        updateFile(state, action) {
            const { file } = action.payload;

            state.file = file;
        },
    }
})

export const {
    resetFile,
    updateFileUrl,
    updateFile
} = fileSlicer.actions

export default fileSlicer.reducer