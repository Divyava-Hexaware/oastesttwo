import { configureStore } from '@reduxjs/toolkit'
import PlanDetailReducer from '../views/PlanDetail/store/PlanDetailSlice'
import testReducer from '../views/test/store/testSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        test: testReducer,
        PlanDetail: PlanDetailReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
