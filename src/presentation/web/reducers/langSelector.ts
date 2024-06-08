import { createSlice } from '@reduxjs/toolkit'
import {LANG_EN} from "../../../constants/languages";


export const langSelector = createSlice({
    name: 'langSelector',
    initialState: {
        value: LANG_EN,
    },
    reducers: {
        setCurrentLang: (state, action) => {
            state.value = action.payload
        },
    },
})


// Action creators are generated for each case reducer function
export const { setCurrentLang } = langSelector.actions


export default langSelector.reducer
