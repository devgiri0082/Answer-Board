import { Button, Grid, makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Logout from './Logout'
import { endSession, sessionInfo } from './Redux/Action/Actions';
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
    let sessionState = useSelector(state => state.sessionInfo);
    let studentId = useSelector(state => state.studentLink);
    let history = useHistory();
    let dispatch = useDispatch();
    useEffect(() => {
        if (students.length === 0) history.push("/");
        dispatch(sessionInfo("going"));
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (sessionState === "exited") history.push("/students");
        // eslint-disable-next-line
    }, [sessionState])
    if (!currentUser) history.push("/");
    let classes = useStyles();
    console.log(students);
    if (students.length > 0) {
        return (
            <Fragment>
                <Grid container spacing={0} className={classes.addPadding}>
                    <Logout />
                    <Grid item xs={8}>
                        <Typography variant="h3">Dashboard</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1">{sessionState === "exiting" ? "Ending Session..." : sessionState !== "exited" && sessionState !== "going" ? `${sessionState}` : ""}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={() => dispatch(endSession(currentUser.email))}>End Session</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Student Link:<Link to={`/room/${studentId}`}>http://localhost:300/room/{studentId}</Link></Typography>
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
    } else {
        return (<div></div>)
    }

}
