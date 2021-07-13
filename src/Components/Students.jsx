import Container from '@material-ui/core/Container'
import React, { Fragment, useRef, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Avatar, Button } from '@material-ui/core';
import { db } from './Redux/firebaseConfig';
import firebase from "firebase";
import { useHistory } from 'react-router-dom';
import Logout from './Logout';
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
    console.log(firebase.auth().currentUser);
    let history = useHistory();
    let namesRef = useRef();
    let [submitState, setSubmitState] = useState("notSubmitted");
    let classes = useStyles();
    if (!currentUser) history.push("/");
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
    async function submitForm() {
        if (submitState === "submitting") return;
        let names = namesRef.current.value.split(/,|\n/).map((elem) => elem.trim());
        names = names.filter(elem => elem !== "");
        console.log(names);
        if (names.length === 0) return alert("at least 1 student has to be present");
        let nameSet = new Set();
        let duplicateExist = names.some(elem => {
            if (nameSet.has(elem)) return true;
            nameSet.add(elem);
            return false;
        })
        if (duplicateExist) return alert("there is duplicate name present");
        console.log("submitting");
        setSubmitState("submitting");
        names.sort();
        try {
            await db.collection(firebase.auth().currentUser.email.split(".").join("_")).doc(firebase.auth().currentUser.email.split(".").join("_")).set({ students: names });
            setSubmitState("submitted");
            console.log("success");
            history.push("/dashboard");
        } catch (err) {
            console.log(err);
            setSubmitState("error");

        }
    }
}
