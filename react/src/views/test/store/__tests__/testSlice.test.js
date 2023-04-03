import store from 'store/store'
import { testAdded, testDeleted, testUpdated } from '../testSlice'

describe('testing test redux store reducers', () => {
    test('add test to store test', () => {
        let state = store.getState().test
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            uname: 'uname',
            pwd: 'pwd',
            confirm: true,
        }
        store.dispatch(testAdded(initialInput))
        state = store.getState().test
        expect(state.entities).toHaveLength(1)
    })

    test('update test from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            uname: 'uname',
            pwd: 'pwd',
            confirm: false,
        }
        store.dispatch(testAdded(initialInput))
        let state = store.getState().test
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            uname: 'uname',
            pwd: 'pwd',
            confirm: true,
        }
        store.dispatch(testUpdated(updatedInput))
        state = store.getState().test
        let changedTest = state.entities.find((p) => p.id === 2)
        expect(changedTest).toStrictEqual(updatedInput)
    })

    test('delete test from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            uname: 'uname',
            pwd: 'pwd',
            confirm: false,
        }
        store.dispatch(testAdded(initialInput))
        let state = store.getState().test
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            testDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().test
        expect(state.entities).toHaveLength(2)
    })
})
