import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editPlanDetail, fetchPlanDetail } from './store/PlanDetail.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

const EditPlanDetail = () => {
    const { id: PlanDetailId } = useParams()

    const PlanDetail = useSelector((state) =>
        state.PlanDetail.entities.find(
            (PlanDetail) => PlanDetail.id.toString() === PlanDetailId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [PharmacyCostType, setPharmacyCostType] = useState(
        PlanDetail.PharmacyCostType
    )

    const [DrugTier, setDrugTier] = useState(PlanDetail.DrugTier)

    const [DrugTierCaption, setDrugTierCaption] = useState(
        PlanDetail.DrugTierCaption
    )

    const [DaysSupply, setDaysSupply] = useState(PlanDetail.DaysSupply)

    const [CostAmount, setCostAmount] = useState(PlanDetail.CostAmount)

    const [CostPercentage, setCostPercentage] = useState(
        PlanDetail.CostPercentage
    )

    const [MinAmount, setMinAmount] = useState(PlanDetail.MinAmount)

    const [MaxAmount, setMaxAmount] = useState(PlanDetail.MaxAmount)

    const [Is31DaySupply, setIs31DaySupply] = useState(PlanDetail.Is31DaySupply)

    const [DrugCategory, setDrugCategory] = useState(PlanDetail.DrugCategory)

    const [SubCategory, setSubCategory] = useState(PlanDetail.SubCategory)

    const handlePharmacyCostType = (e) => setPharmacyCostType(e.target.value)
    const handleDrugTier = (e) => setDrugTier(parseInt(e.target.value))
    const handleDrugTierCaption = (e) => setDrugTierCaption(e.target.value)
    const handleDaysSupply = (e) => setDaysSupply(e.target.value)
    const handleCostAmount = (e) => setCostAmount(parseInt(e.target.value))
    const handleCostPercentage = (e) =>
        setCostPercentage(parseInt(e.target.value))
    const handleMinAmount = (e) => setMinAmount(parseInt(e.target.value))
    const handleMaxAmount = (e) => setMaxAmount(parseInt(e.target.value))
    const handleIs31DaySupply = (e) => setIs31DaySupply(e.target.value)
    const handleDrugCategory = (e) => setDrugCategory(e.target.value)
    const handleSubCategory = (e) => setSubCategory(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editPlanDetail({
                id: PlanDetailId,
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
            })
        ).then(() => {
            dispatch(fetchPlanDetail())
        })
        navigate('/PlanDetail')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditPlanDetail', path: '/PlanDetail' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="PharmacyCostType"
                                id="pharmacyCostTypeInput"
                                onChange={handlePharmacyCostType}
                                value={pharmacyCostType}
                                validators={['required']}
                                label="PharmacyCostType"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="DrugTier"
                                id="drugTierInput"
                                onChange={handleDrugTier}
                                value={drugTier || ''}
                                validators={['required']}
                                label="DrugTier"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="DrugTierCaption"
                                id="drugTierCaptionInput"
                                onChange={handleDrugTierCaption}
                                value={drugTierCaption}
                                validators={['required']}
                                label="DrugTierCaption"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="DaysSupply"
                                id="daysSupplyInput"
                                onChange={handleDaysSupply}
                                value={daysSupply}
                                validators={['required']}
                                label="DaysSupply"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="CostAmount"
                                id="costAmountInput"
                                onChange={handleCostAmount}
                                value={costAmount || ''}
                                validators={['required']}
                                label="CostAmount"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="CostPercentage"
                                id="costPercentageInput"
                                onChange={handleCostPercentage}
                                value={costPercentage || ''}
                                validators={['required']}
                                label="CostPercentage"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="MinAmount"
                                id="minAmountInput"
                                onChange={handleMinAmount}
                                value={minAmount || ''}
                                validators={['required']}
                                label="MinAmount"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="MaxAmount"
                                id="maxAmountInput"
                                onChange={handleMaxAmount}
                                value={maxAmount || ''}
                                validators={['required']}
                                label="MaxAmount"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={is31DaySupply}
                                onChange={handleIs31DaySupply}
                                select
                                id="is31DaySupplyInput"
                                label="Is31DaySupply"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>

                            <TextField
                                type="text"
                                name="DrugCategory"
                                id="drugCategoryInput"
                                onChange={handleDrugCategory}
                                value={drugCategory}
                                validators={['required']}
                                label="DrugCategory"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="SubCategory"
                                id="subCategoryInput"
                                onChange={handleSubCategory}
                                value={subCategory}
                                validators={['required']}
                                label="SubCategory"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditPlanDetail
