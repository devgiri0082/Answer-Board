import { Container, Grid, makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveChanges, syncing } from './Redux/Action/Actions';
import { db } from './Redux/firebaseConfig';


const useStyles = makeStyles((theme) => ({
    addPadding: {
        padding: "70px 0"
    },
    changeTextArea: {
        padding: "15px",
        "font-family": "sans-serif",
        "font-size": "18px",
        "resize": "none"
    }
}))
export default function Answer() {
    let valueRef = useRef();
    let history = useHistory();
    let { id } = useParams();
    let state = useSelector(state => state);
    let currentStudent = useSelector(state => state.currentStudent);
    let syncingStatus = useSelector(state => state.syncingStatus);
    let teacher = useSelector(state => state.teacherEmail);
    let classes = useStyles();
    let dispatch = useDispatch();
    useEffect(() => {
        console.log("useEffect")
        if (currentStudent === undefined) history.push(`/room/${id}`);
        else listenForChange();
        // eslint-disable-next-line
    }, [])
    async function listenForChange() {
        console.log("am I even here")
        await db
            .collection(teacher.split(".").join("_"))
            .doc(teacher.split(".").join("_"))
            .collection("studentsMessage")
            .doc("studentsMessage")
            .onSnapshot((doc) => {
                console.log(doc.data(), "data");
                let data = doc.data()[currentStudent];
                valueRef.current.value = data;
            })
    }
    if (currentStudent) {
        return (
            <Container maxWidth="md" p={4} className={classes.addPadding}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{currentStudent}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">My Answer</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Enter your answer below. This text is visible to the teacher.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize ref={valueRef} onChange={(e) => setChange(e.target.value)} aria-label="maximum height" minRows={13} size="large" className={classes.changeTextArea} style={{ width: "75%" }} />
                    </Grid>
                    <Typography variant="subtitle1" color="primary">{syncingStatus}</Typography>
                </Grid>
            </Container>
        )
    }
    else {
        return (
            <div>Invalid User</div>
        )
    }
    async function setChange(text) {
        try {
            dispatch(syncing("Syncing..."))
            await dispatch(saveChanges(teacher, currentStudent, text));
            dispatch(syncing("Sync Complete"));
        } catch (err) {
            console.log(err);
        }
    }
}
