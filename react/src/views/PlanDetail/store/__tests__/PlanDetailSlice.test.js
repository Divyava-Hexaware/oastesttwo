import store from 'store/store'
import {
    planDetailAdded,
    planDetailDeleted,
    planDetailUpdated,
} from '../planDetailSlice'

describe('testing planDetail redux store reducers', () => {
    test('add planDetail to store test', () => {
        let state = store.getState().planDetail
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 7,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 7,
            CostPercentage: 62,
            MinAmount: 76,
            MaxAmount: 79,
            Is31DaySupply: false,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        }
        store.dispatch(planDetailAdded(initialInput))
        state = store.getState().planDetail
        expect(state.entities).toHaveLength(1)
    })

    test('update planDetail from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 49,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 23,
            CostPercentage: 56,
            MinAmount: 59,
            MaxAmount: 66,
            Is31DaySupply: false,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        }
        store.dispatch(planDetailAdded(initialInput))
        let state = store.getState().planDetail
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 32,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 28,
            CostPercentage: 43,
            MinAmount: 45,
            MaxAmount: 65,
            Is31DaySupply: true,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        }
        store.dispatch(planDetailUpdated(updatedInput))
        state = store.getState().planDetail
        let changedPlanDetail = state.entities.find((p) => p.id === 2)
        expect(changedPlanDetail).toStrictEqual(updatedInput)
    })

    test('delete planDetail from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 2,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 78,
            CostPercentage: 20,
            MinAmount: 23,
            MaxAmount: 76,
            Is31DaySupply: true,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        }
        store.dispatch(planDetailAdded(initialInput))
        let state = store.getState().planDetail
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            planDetailDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().planDetail
        expect(state.entities).toHaveLength(2)
    })
})
