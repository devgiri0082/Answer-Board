import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { IoPersonCircle } from "react-icons/io5";
import firebase from "firebase";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

let GoogleButton = styled.div`
    /* width: 150px; */
    height: 30px;
    border-radius: 5px;
    align-items: center;
    background: rgb(224,225,225);
    display: flex;
    padding: 0 7px;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background: #babbbb;
        transition: all 0.2s ease-in-out;
    }
    img {
        height:27px;
        width: 27px;
        margin-right: 10px;
    }
`
const useStyles = makeStyles((theme) => ({
    addPadding: {
        "padding-top": "100px",
    }
}))
export default function Login() {
    let [buttonDisabled, setButtonDisabled] = useState(false);
    let history = useHistory();
    let classes = useStyles();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // Dispatch the success action
                    history.push("/students")// update state. isAuthenticated=true, user=currentUser
                }
            }
        });
        // eslint-disable-next-line
    }, [])
    if (JSON.parse(localStorage.getItem("currentUser"))) history.push("/students");
    return (
        <Fragment>
            <CssBaseline>
                <Grid className={classes.addPadding} container m={4} spacing={4} direction="column" alignItems="center" justify="center">
                    <Typography variant="h3">Everyone answer</Typography>
                    <Typography variant="h6">Welcome, Please sign in.</Typography>
                    <Typography variant="h1"> <IoPersonCircle style={{ color: "rgb(224,225,225)" }} /></Typography>
                    <GoogleButton style={{ "pointer-events": buttonDisabled && "none" }} onClick={signIn}>
                        <img src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png" alt="colorful google logo" />
                        <div className="text">Sign in with google</div>
                    </GoogleButton>
                </Grid>
            </CssBaseline>
        </Fragment>
    )
    async function signIn() {
        try {
            setButtonDisabled(true);
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            var provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            console.log(firebase.auth().currentUser.email);
            // localStorage.setItem("currentUser", JSON.stringify(firebase.auth().currentUser))
            setButtonDisabled(false);
            // history.push("/students")
        } catch (err) {
            console.log(err);
        }
    }
}
