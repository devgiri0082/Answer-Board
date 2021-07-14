import Container from '@material-ui/core/Container'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { db } from './Redux/firebaseConfig';
import firebase from "firebase";
import { useHistory } from 'react-router-dom';
import Logout from './Logout';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, loading, setStudents, studentLink } from './Redux/Action/Actions';
import LinearProgress from "@material-ui/core/LinearProgress";
import { v4 as uuidv4 } from "uuid";
const useStyles = makeStyles((theme) => ({
    addPadding: {
        padding: "70px 0"
    },
    changeTextArea: {
        padding: "15px",
        "font-family": "sans-serif",
        "font-size": "18px",
        "resize": "none"
    },
    buttonStyle: {
        "color": "white",
        "background": "rgb(62,81,180)",
        "width": "90px"
    },
}))
export default function Students() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);
    let history = useHistory();
    let dispatch = useDispatch();
    let { loading: loadingState, error, students } = useSelector(state => state);
    let state = useSelector(state => state);
    console.log(state);
    // let state = useSelector(state => state);
    let namesRef = useRef();
    let [submitState, setSubmitState] = useState("notSubmitted");
    let classes = useStyles();
    if (!currentUser) history.push("/");
    let checkingState = async () => {
        await dispatch(getStudents(currentUser.email));
        dispatch(loading())
        console.log(students, "checking the students");

    };
    useEffect(() => {
        if (students.length > 0) {
            console.log("I am going in", students.length);
            history.push("/dashboard");
        }
        // eslint-disable-next-line
    }, [students]);
    useEffect(() => {
        dispatch(loading());
        checkingState();
        // eslint-disable-next-line
    }, []);
    // console.log(state, "checking the state");
    if (error !== "") {
        return (
            <Container maxWidth="md" p={4} className={classes.addPadding}>
                <Typography variant="h4">{error}</Typography>
            </Container>
        )
    }
    if (!loadingState) {
        return (
            <Fragment>
                <Container maxWidth="md" p={4} className={classes.addPadding}>
                    <Grid container m={4} spacing={3} >
                        <Logout />
                        <Grid item md={12}>
                            <Typography variant="h3">My Students</Typography>
                        </Grid>
                        <Grid item md={9}>
                            <Typography variant="h6">Enter the name of the each person who will answer your questions, separated by comma or new line</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <TextareaAutosize aria-label="maximum height" minRows={13} placeholder="eg. David, Kim, Dev" size="large" className={classes.changeTextArea} ref={namesRef} style={{ width: "75%" }} />
                        </Grid>
                        <Grid item md={2}>
                            <Button variant="contained" className={classes.buttonStyle} onClick={submitForm}>Submit</Button>
                        </Grid>
                        <Grid item md={1}>
                            <Typography variant="subtitle1">{submitState === "submitting" ? "submitting..." : submitState === "error" ? "error" : ""}</Typography>
                        </Grid>
                    </Grid>

                </Container>
            </Fragment>
        )
    } else {
        return (
            <Container maxWidth="md" p={4} className={classes.addPadding}>
                <Typography variant="h4">Loading...</Typography>
                <LinearProgress />
            </Container>
        )

    }
    async function submitForm() {
        if (submitState === "submitting") return;
        let names = namesRef.current.value.split(/,|\n/).map((elem) => elem.trim());
        names = names.filter(elem => elem !== "");
        // console.log(names);
        if (names.length === 0) return alert("at least 1 student has to be present");
        let nameSet = new Set();
        let duplicateExist = names.some(elem => {
            if (nameSet.has(elem)) return true;
            nameSet.add(elem);
            return false;
        })
        if (duplicateExist) return alert("there is duplicate name present");
        // console.log("submitting");
        setSubmitState("submitting");
        names.sort();
        try {
            let studentId = uuidv4();
            await db.collection(firebase.auth().currentUser.email.split(".").join("_")).doc(firebase.auth().currentUser.email.split(".").join("_")).set({ students: names, link: studentId });
            dispatch(setStudents(names));
            await dispatch(studentLink(studentId, currentUser.email));
            setSubmitState("submitted");
            history.push("/dashboard");
        } catch (err) {
            console.log(err);
            setSubmitState("error");

        }
    }
}
