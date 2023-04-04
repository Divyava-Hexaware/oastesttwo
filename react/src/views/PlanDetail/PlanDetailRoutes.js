import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const PlanDetailList = Loadable(lazy(() => import('./PlanDetailList')))
const EditPlanDetail = Loadable(lazy(() => import('./EditPlanDetail')))
const AddPlanDetail = Loadable(lazy(() => import('./AddPlanDetail')))

const PlanDetailRoutes = [
    {
        path: '/PlanDetail',
        element: <PlanDetailList />,
    },
    {
        path: '/PlanDetail/edit/:id',
        element: <EditPlanDetail />,
    },
    {
        path: '/PlanDetail/add',
        element: <AddPlanDetail />,
    },
]

export default PlanDetailRoutes
