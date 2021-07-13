import { Grid, makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logout from './Logout'
import { getStudents } from './Redux/Action/Actions';
let useStyles = makeStyles((themes) => ({
    addPadding: {
        padding: "70px"
    },
    textareaStyle: {
        width: "350px",
        outline: "none",
        "border": "2px solid rgb(63,81,181)",
        "border-radius": "5px",
        padding: "5px",
        "resize": "none"
    }
}))
export default function Dashboard() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let students = useSelector(state => state.students);
    let history = useHistory();
    let dispatch = useDispatch();
    if (!currentUser) history.push("/");
    let classes = useStyles();
    return (
        <Fragment>
            <Grid container spacing={0} className={classes.addPadding}>
                <Logout />
                <Grid item xs={12}>
                    <Typography variant="h3">Dashboard</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Student Link:http://localhost:300/#/123456789</Typography>
                </Grid>
                {students.map((elem) => {
                    return <Grid item xs>
                        <Typography valiant="subtitle1" color="primary">{elem}</Typography>
                        <TextareaAutosize minRows={10} size="large" className={classes.textareaStyle}></TextareaAutosize>
                    </Grid>
                })}
            </Grid>
        </Fragment>
    )
}
