import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const TestList = Loadable(lazy(() => import('./TestList')))
const EditTest = Loadable(lazy(() => import('./EditTest')))
const AddTest = Loadable(lazy(() => import('./AddTest')))

const testRoutes = [
    {
        path: '/test',
        element: <TestList />,
    },
    {
        path: '/test/edit/:id',
        element: <EditTest />,
    },
    {
        path: '/test/add',
        element: <AddTest />,
    },
]

export default testRoutes
