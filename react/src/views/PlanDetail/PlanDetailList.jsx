import React, { useEffect } from 'react'
import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePlanDetail, fetchPlanDetail } from './store/PlanDetail.action'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import { CircularProgress, IconButton } from '@mui/material'
import { Button, Icon } from '@mui/material'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const PlanDetailList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.PlanDetail)
    const loading = useSelector((state) => state.PlanDetail.loading)

    const handleDelete = (id) => {
        dispatch(deletePlanDetail({ id }))
    }

    const handleEdit = (id) => {
        navigate(`/PlanDetail/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/PlanDetail/add`)
    }

    useEffect(() => {
        dispatch(fetchPlanDetail())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        {
            field: 'pharmacyCostType',
            headerName: 'PharmacyCostType',
            width: 200,
        },
        { field: 'drugTier', headerName: 'DrugTier', width: 200 },
        { field: 'drugTierCaption', headerName: 'DrugTierCaption', width: 200 },
        { field: 'daysSupply', headerName: 'DaysSupply', width: 200 },
        { field: 'costAmount', headerName: 'CostAmount', width: 200 },
        { field: 'costPercentage', headerName: 'CostPercentage', width: 200 },
        { field: 'minAmount', headerName: 'MinAmount', width: 200 },
        { field: 'maxAmount', headerName: 'MaxAmount', width: 200 },
        { field: 'is31DaySupply', headerName: 'Is31DaySupply', width: 200 },
        { field: 'drugCategory', headerName: 'DrugCategory', width: 200 },
        { field: 'subCategory', headerName: 'SubCategory', width: 200 },
        {
            field: 'Actions',
            width: 200,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                handleEdit(cellValues.row.id)
                            }}
                            aria-label="Example"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                handleDelete(cellValues.row.id)
                            }}
                            aria-label="Example"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            },
        },
    ]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Entities', path: '/PlanDetail' },
                        { name: 'PlanDetail' },
                    ]}
                />
            </div>

            <Button
                onClick={() => {
                    handleAdd()
                }}
                color="primary"
                variant="contained"
            >
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                    Add PlanDetail
                </Span>
            </Button>

            <SimpleCard title="PlanDetail">
                {loading ? (
                    <div
                        title="loading"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress className="progress" />
                    </div>
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                )}
            </SimpleCard>
        </Container>
    )
}

export default PlanDetailList
