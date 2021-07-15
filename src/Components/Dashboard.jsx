import { Button, Grid, makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Logout from './Logout'
import { clearStudentsFields, endSession, sessionInfo } from './Redux/Action/Actions';
import { db } from './Redux/firebaseConfig';
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
        "resize": "none",
        "font-family": "sans-serif"
    }
}))
export default function Dashboard() {
    let [values, setValues] = useState({});
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let students = useSelector(state => state.students);
    let sessionState = useSelector(state => state.sessionInfo);
    let studentId = useSelector(state => state.studentLink);
    let history = useHistory();
    let dispatch = useDispatch();
    useEffect(() => {
        if (students.length === 0) history.push("/");
        dispatch(sessionInfo(""));
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (sessionState === "ended") history.push("/students");
        // eslint-disable-next-line
    }, [sessionState]);
    useEffect(() => {
        if (students.length > 0) {
            listenForChanges();
        }
        // eslint-disable-next-line
    }, [students]);
    async function listenForChanges(settingValues) {
        await db
            .collection(currentUser.email.split(".").join("_"))
            .doc(currentUser.email.split(".").join("_"))
            .collection("studentsMessage")
            .doc("studentsMessage")
            .onSnapshot((doc) => {
                let data = doc.data();
                console.log(data);
                setValues(data);
            })
    }
    if (!currentUser) history.push("/");
    let classes = useStyles();
    async function clearAnswers() {
        console.log("clearing the answer");
        dispatch(sessionInfo("Clearing answers..."));
        await dispatch(clearStudentsFields(students, currentUser.email))
        dispatch(sessionInfo(""));
    }
    if (students.length > 0) {
        return (
            <Fragment>
                <Grid container spacing={0} className={classes.addPadding}>
                    <Logout />
                    <Grid item xs={3}>
                        <Typography variant="h3">Dashboard</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" color="primary" onClick={clearAnswers}>Clear Answer</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1">{sessionState}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={() => dispatch(endSession(currentUser.email, studentId, students))}>End Session</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Student Link:<Link to={`/room/${studentId}`}>https://practical-meitner-a9e959.netlify.app/room/{studentId}</Link></Typography>
                    </Grid>
                    {students.map((elem) => {
                        return <Grid item xs>
                            <Typography valiant="subtitle1" color="primary">{elem}</Typography>
                            <TextareaAutosize value={values && values[elem]} minRows={10} size="large" className={classes.textareaStyle}></TextareaAutosize>
                        </Grid>
                    })}
                </Grid>
            </Fragment >
        )
    } else {
        return (<div></div>)
    }

}
