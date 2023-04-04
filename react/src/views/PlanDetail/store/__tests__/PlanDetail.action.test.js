import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchPlanDetail,
    addPlanDetail,
    editPlanDetail,
    deletePlanDetail,
} from '../planDetail.action'

const getPlanDetailListResponse = [
    {
        id: 1,
        PharmacyCostType: 'PharmacyCostType',
        DrugTier: 45,
        DrugTierCaption: 'DrugTierCaption',
        DaysSupply: 'DaysSupply',
        CostAmount: 86,
        CostPercentage: 62,
        MinAmount: 45,
        MaxAmount: 18,
        Is31DaySupply: false,
        DrugCategory: 'DrugCategory',
        SubCategory: 'SubCategory',
    },
]

const addPlanDetailListResponse = (data) => {
    return { id: 2, ...data }
}
const editPlanDetailListResponse = (data) => {
    return data
}

describe('should test PlanDetail redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'planDetail'
    test('Should be able to fetch the planDetail list and update planDetail redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getPlanDetailListResponse)
        const result = await store.dispatch(fetchPlanDetail())
        const planDetailList = result.payload
        expect(result.type).toBe('planDetail/fetchPlanDetail/fulfilled')
        expect(planDetailList).toEqual(getPlanDetailListResponse)

        const state = store.getState().planDetail
        expect(state.entities).toEqual(planDetailList)
    })

    test('Should be able to add new planDetail to list and make post api and update planDetail redux store', async () => {
        const body = {
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 38,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 67,
            CostPercentage: 14,
            MinAmount: 93,
            MaxAmount: 95,
            Is31DaySupply: true,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addPlanDetailListResponse(body)
        )
        const result = await store.dispatch(addPlanDetail(body))
        const planDetailItem = result.payload
        expect(result.type).toBe('planDetail/addPlanDetail/fulfilled')
        expect(planDetailItem).toEqual(addPlanDetailListResponse(body))

        const state = store.getState().planDetail
        expect(state.entities).toContainEqual(addPlanDetailListResponse(body))
    })

    test('Should be able to edit planDetail in list and make put api call and update planDetail redux store', async () => {
        const body = {
            id: 1,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 45,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 30,
            CostPercentage: 5,
            MinAmount: 55,
            MaxAmount: 13,
            Is31DaySupply: false,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editPlanDetailListResponse(body)
        )
        const result = await store.dispatch(editPlanDetail(body))
        const planDetailItem = result.payload
        expect(result.type).toBe('planDetail/editPlanDetail/fulfilled')
        expect(planDetailItem).toEqual(editPlanDetailListResponse(body))

        const state = store.getState().planDetail
        let changedPlanDetail = state.entities.find((p) => p.id === body.id)
        expect(changedPlanDetail.name).toEqual(body.name)
    })

    test('Should be able to delete planDetail in list and update planDetail redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().planDetail
        const initialLength = state.entities.length
        const result = await store.dispatch(deletePlanDetail(input))
        const deletId = result.payload
        expect(result.type).toBe('planDetail/deletePlanDetail/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().planDetail
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
