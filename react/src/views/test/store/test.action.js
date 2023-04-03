import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'test'

export const fetchTest = createAsyncThunk('test/fetchTest', async () => {
    const response = await axios.get(`/${endPoint}`)
    const test = await response.data
    return test
})

export const addTest = createAsyncThunk(
    'test/addTest',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const test = await response.data
        thunkAPI.dispatch(showSuccess('Test added successfully'))
        return test
    }
)

export const editTest = createAsyncThunk(
    'test/editTest',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const test = await response.data
        thunkAPI.dispatch(showSuccess('Test updated successfully'))
        return test
    }
)

export const deleteTest = createAsyncThunk(
    'test/deleteTest',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected test deleted successfully.')
            )
            return data.id
        }
    }
)
