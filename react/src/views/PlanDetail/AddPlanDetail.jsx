import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPlanDetail, fetchPlanDetail } from './store/PlanDetail.action'

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

const AddPlanDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [pharmacyCostType, setPharmacyCostType] = useState('')
    const [drugTier, setDrugTier] = useState('')
    const [drugTierCaption, setDrugTierCaption] = useState('')
    const [daysSupply, setDaysSupply] = useState('')
    const [costAmount, setCostAmount] = useState('')
    const [costPercentage, setCostPercentage] = useState('')
    const [minAmount, setMinAmount] = useState('')
    const [maxAmount, setMaxAmount] = useState('')
    const [is31DaySupply, setIs31DaySupply] = useState('')
    const [drugCategory, setDrugCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')

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
            addPlanDetail({
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

    useEffect(() => {
        return () => {
            setPharmacyCostType('')
            setDrugTier('')
            setDrugTierCaption('')
            setDaysSupply('')
            setCostAmount('')
            setCostPercentage('')
            setMinAmount('')
            setMaxAmount('')
            setIs31DaySupply('')
            setDrugCategory('')
            setSubCategory('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddPlanDetail', path: '/PlanDetail' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="PharmacyCostType"
                                id="pharmacyCostTypeInput"
                                onChange={handlePharmacyCostType}
                                value={pharmacyCostType}
                                label="PharmacyCostType"
                            />

                            <TextField
                                type="number"
                                name="DrugTier"
                                id="drugTierInput"
                                onChange={handleDrugTier}
                                value={drugTier || ''}
                                label="DrugTier"
                            />

                            <TextField
                                type="text"
                                name="DrugTierCaption"
                                id="drugTierCaptionInput"
                                onChange={handleDrugTierCaption}
                                value={drugTierCaption}
                                label="DrugTierCaption"
                            />

                            <TextField
                                type="text"
                                name="DaysSupply"
                                id="daysSupplyInput"
                                onChange={handleDaysSupply}
                                value={daysSupply}
                                label="DaysSupply"
                            />

                            <TextField
                                type="number"
                                name="CostAmount"
                                id="costAmountInput"
                                onChange={handleCostAmount}
                                value={costAmount || ''}
                                label="CostAmount"
                            />

                            <TextField
                                type="number"
                                name="CostPercentage"
                                id="costPercentageInput"
                                onChange={handleCostPercentage}
                                value={costPercentage || ''}
                                label="CostPercentage"
                            />

                            <TextField
                                type="number"
                                name="MinAmount"
                                id="minAmountInput"
                                onChange={handleMinAmount}
                                value={minAmount || ''}
                                label="MinAmount"
                            />

                            <TextField
                                type="number"
                                name="MaxAmount"
                                id="maxAmountInput"
                                onChange={handleMaxAmount}
                                value={maxAmount || ''}
                                label="MaxAmount"
                            />

                            <TextField
                                value={is31DaySupply}
                                onChange={handleIs31DaySupply}
                                select
                                id="is31DaySupplyInput"
                                label="Is31DaySupply"
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
                                label="DrugCategory"
                            />

                            <TextField
                                type="text"
                                name="SubCategory"
                                id="subCategoryInput"
                                onChange={handleSubCategory}
                                value={subCategory}
                                label="SubCategory"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddPlanDetail
