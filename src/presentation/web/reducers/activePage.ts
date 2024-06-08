import { createSlice } from '@reduxjs/toolkit'
import {ACTIVE_PAGE} from "../../../constants/pages";


export const activePage = createSlice({
    name: 'activePage',
    initialState: {
        value: ACTIVE_PAGE.HOME,
    },
    reducers: {
        setActivePage: (state, action) => {
            state.value = action.payload
        },
    },
})


// Action creators are generated for each case reducer function
export const { setActivePage } = activePage.actions


export default activePage.reducer
