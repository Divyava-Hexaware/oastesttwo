import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editTest, fetchTest } from './store/test.action'
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

const EditTest = () => {
    const { id: testId } = useParams()

    const test = useSelector((state) =>
        state.test.entities.find(
            (test) => test.id.toString() === testId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [uname, setUname] = useState(test.uname)

    const [pwd, setPwd] = useState(test.pwd)

    const [confirm, setConfirm] = useState(test.confirm)

    const handleUname = (e) => setUname(e.target.value)
    const handlePwd = (e) => setPwd(e.target.value)
    const handleConfirm = (e) => setConfirm(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editTest({
                id: testId,
                uname,
                pwd,
                confirm,
            })
        ).then(() => {
            dispatch(fetchTest())
        })
        navigate('/test')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditTest', path: '/test' },
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
                                name="uname"
                                id="unameInput"
                                onChange={handleUname}
                                value={uname}
                                validators={['required']}
                                label="Uname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="pwd"
                                id="pwdInput"
                                onChange={handlePwd}
                                value={pwd}
                                validators={['required']}
                                label="Pwd"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={confirm}
                                onChange={handleConfirm}
                                select
                                id="confirmInput"
                                label="Confirm"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
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

export default EditTest
