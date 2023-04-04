import { createSlice } from '@reduxjs/toolkit'
import { fetchPlanDetail } from './PlanDetail.action'
import { addPlanDetail } from './PlanDetail.action'
import { editPlanDetail } from './PlanDetail.action'
import { deletePlanDetail } from './PlanDetail.action'

const fetchPlanDetailExtraReducer = {
    [fetchPlanDetail.pending]: (state, action) => {
        state.loading = true
    },
    [fetchPlanDetail.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchPlanDetail.rejected]: (state, action) => {
        state.loading = false
    },
}

const addPlanDetailExtraReducer = {
    [addPlanDetail.pending]: (state, action) => {
        state.loading = true
    },
    [addPlanDetail.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addPlanDetail.rejected]: (state, action) => {
        state.loading = false
    },
}

const editPlanDetailExtraReducer = {
    [editPlanDetail.pending]: (state, action) => {
        state.loading = true
    },
    [editPlanDetail.fulfilled]: (state, action) => {
        const {
            id,
            pharmacyCostType,
            drugTier,
            drugTierCaption,
            daysSupply,
            costAmount,
            costPercentage,
            minAmount,
            maxAmount,
            is31DaySupply,
            drugCategory,
            subCategory,
        } = action.payload
        const existingPlanDetail = state.entities.find(
            (PlanDetail) => PlanDetail?.id?.toString() === id?.toString()
        )
        if (existingPlanDetail) {
            existingPlanDetail.pharmacyCostType = pharmacyCostType
            existingPlanDetail.drugTier = drugTier
            existingPlanDetail.drugTierCaption = drugTierCaption
            existingPlanDetail.daysSupply = daysSupply
            existingPlanDetail.costAmount = costAmount
            existingPlanDetail.costPercentage = costPercentage
            existingPlanDetail.minAmount = minAmount
            existingPlanDetail.maxAmount = maxAmount
            existingPlanDetail.is31DaySupply = is31DaySupply
            existingPlanDetail.drugCategory = drugCategory
            existingPlanDetail.subCategory = subCategory
        }
        state.loading = false
    },
    [editPlanDetail.rejected]: (state, action) => {
        state.loading = false
    },
}

const deletePlanDetailExtraReducer = {
    [deletePlanDetail.pending]: (state, action) => {
        state.loading = true
    },
    [deletePlanDetail.fulfilled]: (state, action) => {
        const id = action.payload
        const existingPlanDetail = state.entities.find(
            (PlanDetail) => PlanDetail.id.toString() === id.toString()
        )
        if (existingPlanDetail) {
            state.entities = state.entities.filter(
                (PlanDetail) => PlanDetail.id !== id
            )
        }
        state.loading = false
    },
    [deletePlanDetail.rejected]: (state, action) => {
        state.loading = false
    },
}
const PlanDetailSlice = createSlice({
    name: 'PlanDetail',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        PlanDetailAdded(state, action) {
            state.entities.push(action.payload)
        },
        PlanDetailUpdated(state, action) {
            const {
                id,
                pharmacyCostType,
                drugTier,
                drugTierCaption,
                daysSupply,
                costAmount,
                costPercentage,
                minAmount,
                maxAmount,
                is31DaySupply,
                drugCategory,
                subCategory,
            } = action.payload
            const existingPlanDetail = state.entities.find(
                (PlanDetail) => PlanDetail.id.toString() === id.toString()
            )
            if (existingPlanDetail) {
                existingPlanDetail.pharmacyCostType = pharmacyCostType
                existingPlanDetail.drugTier = drugTier
                existingPlanDetail.drugTierCaption = drugTierCaption
                existingPlanDetail.daysSupply = daysSupply
                existingPlanDetail.costAmount = costAmount
                existingPlanDetail.costPercentage = costPercentage
                existingPlanDetail.minAmount = minAmount
                existingPlanDetail.maxAmount = maxAmount
                existingPlanDetail.is31DaySupply = is31DaySupply
                existingPlanDetail.drugCategory = drugCategory
                existingPlanDetail.subCategory = subCategory
            }
        },
        PlanDetailDeleted(state, action) {
            const { id } = action.payload
            const existingPlanDetail = state.entities.find(
                (PlanDetail) => PlanDetail.id.toString() === id.toString()
            )
            if (existingPlanDetail) {
                state.entities = state.entities.filter(
                    (PlanDetail) => PlanDetail.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchPlanDetailExtraReducer,
        ...addPlanDetailExtraReducer,
        ...editPlanDetailExtraReducer,
        ...deletePlanDetailExtraReducer,
    },
})

export const { PlanDetailAdded, PlanDetailUpdated, PlanDetailDeleted } =
    PlanDetailSlice.actions

export default PlanDetailSlice.reducer
