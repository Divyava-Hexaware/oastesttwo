import { createSlice } from '@reduxjs/toolkit'
import { fetchTest } from './test.action'
import { addTest } from './test.action'
import { editTest } from './test.action'
import { deleteTest } from './test.action'

const fetchTestExtraReducer = {
    [fetchTest.pending]: (state, action) => {
        state.loading = true
    },
    [fetchTest.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchTest.rejected]: (state, action) => {
        state.loading = false
    },
}

const addTestExtraReducer = {
    [addTest.pending]: (state, action) => {
        state.loading = true
    },
    [addTest.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addTest.rejected]: (state, action) => {
        state.loading = false
    },
}

const editTestExtraReducer = {
    [editTest.pending]: (state, action) => {
        state.loading = true
    },
    [editTest.fulfilled]: (state, action) => {
        const { id, uname, pwd, confirm } = action.payload
        const existingTest = state.entities.find(
            (test) => test?.id?.toString() === id?.toString()
        )
        if (existingTest) {
            existingTest.uname = uname
            existingTest.pwd = pwd
            existingTest.confirm = confirm
        }
        state.loading = false
    },
    [editTest.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteTestExtraReducer = {
    [deleteTest.pending]: (state, action) => {
        state.loading = true
    },
    [deleteTest.fulfilled]: (state, action) => {
        const id = action.payload
        const existingTest = state.entities.find(
            (test) => test.id.toString() === id.toString()
        )
        if (existingTest) {
            state.entities = state.entities.filter((test) => test.id !== id)
        }
        state.loading = false
    },
    [deleteTest.rejected]: (state, action) => {
        state.loading = false
    },
}
const testSlice = createSlice({
    name: 'test',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        testAdded(state, action) {
            state.entities.push(action.payload)
        },
        testUpdated(state, action) {
            const { id, uname, pwd, confirm } = action.payload
            const existingTest = state.entities.find(
                (test) => test.id.toString() === id.toString()
            )
            if (existingTest) {
                existingTest.uname = uname
                existingTest.pwd = pwd
                existingTest.confirm = confirm
            }
        },
        testDeleted(state, action) {
            const { id } = action.payload
            const existingTest = state.entities.find(
                (test) => test.id.toString() === id.toString()
            )
            if (existingTest) {
                state.entities = state.entities.filter((test) => test.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchTestExtraReducer,
        ...addTestExtraReducer,
        ...editTestExtraReducer,
        ...deleteTestExtraReducer,
    },
})

export const { testAdded, testUpdated, testDeleted } = testSlice.actions

export default testSlice.reducer
