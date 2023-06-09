import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addTest, fetchTest } from './store/test.action'

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

const AddTest = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [uname, setUname] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirm, setConfirm] = useState('')

    const handleUname = (e) => setUname(e.target.value)
    const handlePwd = (e) => setPwd(e.target.value)
    const handleConfirm = (e) => setConfirm(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addTest({
                uname,
                pwd,
                confirm,
            })
        ).then(() => {
            dispatch(fetchTest())
        })
        navigate('/test')
    }

    useEffect(() => {
        return () => {
            setUname('')
            setPwd('')
            setConfirm('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddTest', path: '/test' },
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
                                name="uname"
                                id="unameInput"
                                onChange={handleUname}
                                value={uname}
                                label="Uname"
                            />

                            <TextField
                                type="text"
                                name="pwd"
                                id="pwdInput"
                                onChange={handlePwd}
                                value={pwd}
                                label="Pwd"
                            />

                            <TextField
                                value={confirm}
                                onChange={handleConfirm}
                                select
                                id="confirmInput"
                                label="Confirm"
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
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

export default AddTest
