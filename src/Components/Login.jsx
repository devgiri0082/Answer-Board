import React, { Fragment } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { IoPersonCircle } from "react-icons/io5";
import { provider } from './Redux/firebaseConfig';
import firebase from "firebase";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {

})
export default function Login() {
    let history = useHistory();
    let classes = useStyles();
    return (
        <Fragment>
            <CssBaseline>
                <Grid container m={4} spacing={3} direction="column" alignItems="center" justify="center">
                    <Typography variant="h3">Everyone answer</Typography>
                    <Typography variant="h6">Welcome. Please sign in.</Typography>
                    <Typography variant="h1"> <IoPersonCircle /></Typography>
                    <button onClick={signIn}>Google sign in</button>
                </Grid>
            </CssBaseline>
        </Fragment>
    )
    async function signIn() {
        try {
            await firebase.auth()
                .signInWithPopup(provider);
            console.log(firebase.auth().currentUser.email);
            history.push("/students")
        } catch (err) {
            console.log(err);
        }
    }
}
