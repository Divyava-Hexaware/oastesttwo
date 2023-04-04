import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'PlanDetail'

export const fetchPlanDetail = createAsyncThunk(
    'PlanDetail/fetchPlanDetail',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const PlanDetail = await response.data
        return PlanDetail
    }
)

export const addPlanDetail = createAsyncThunk(
    'PlanDetail/addPlanDetail',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const PlanDetail = await response.data
        thunkAPI.dispatch(showSuccess('PlanDetail added successfully'))
        return PlanDetail
    }
)

export const editPlanDetail = createAsyncThunk(
    'PlanDetail/editPlanDetail',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const PlanDetail = await response.data
        thunkAPI.dispatch(showSuccess('PlanDetail updated successfully'))
        return PlanDetail
    }
)

export const deletePlanDetail = createAsyncThunk(
    'PlanDetail/deletePlanDetail',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected PlanDetail deleted successfully.')
            )
            return data.id
        }
    }
)
