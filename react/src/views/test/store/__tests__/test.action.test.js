import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchTest, addTest, editTest, deleteTest } from '../test.action'

const getTestListResponse = [
    {
        id: 1,
        uname: 'uname',
        pwd: 'pwd',
        confirm: false,
    },
]

const addTestListResponse = (data) => {
    return { id: 2, ...data }
}
const editTestListResponse = (data) => {
    return data
}

describe('should test Test redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'test'
    test('Should be able to fetch the test list and update test redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getTestListResponse)
        const result = await store.dispatch(fetchTest())
        const testList = result.payload
        expect(result.type).toBe('test/fetchTest/fulfilled')
        expect(testList).toEqual(getTestListResponse)

        const state = store.getState().test
        expect(state.entities).toEqual(testList)
    })

    test('Should be able to add new test to list and make post api and update test redux store', async () => {
        const body = {
            uname: 'uname',
            pwd: 'pwd',
            confirm: false,
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addTestListResponse(body))
        const result = await store.dispatch(addTest(body))
        const testItem = result.payload
        expect(result.type).toBe('test/addTest/fulfilled')
        expect(testItem).toEqual(addTestListResponse(body))

        const state = store.getState().test
        expect(state.entities).toContainEqual(addTestListResponse(body))
    })

    test('Should be able to edit test in list and make put api call and update test redux store', async () => {
        const body = {
            id: 1,
            uname: 'uname',
            pwd: 'pwd',
            confirm: true,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editTestListResponse(body)
        )
        const result = await store.dispatch(editTest(body))
        const testItem = result.payload
        expect(result.type).toBe('test/editTest/fulfilled')
        expect(testItem).toEqual(editTestListResponse(body))

        const state = store.getState().test
        let changedTest = state.entities.find((p) => p.id === body.id)
        expect(changedTest.name).toEqual(body.name)
    })

    test('Should be able to delete test in list and update test redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().test
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteTest(input))
        const deletId = result.payload
        expect(result.type).toBe('test/deleteTest/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().test
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
