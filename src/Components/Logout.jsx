import { Avatar, Grid } from '@material-ui/core'
import React from 'react'
import firebase from "firebase";
import { useHistory } from "react-router-dom";

export default function Logout() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let history = useHistory();
    return (
        <Grid item style={{ position: "absolute", right: "3%", top: "1.5%" }} onClick={signOut}>
            <Avatar alt={currentUser && currentUser.displayName} src={currentUser && currentUser.photoURL} style={{ cursor: "pointer" }} />
        </Grid>
    )
    async function signOut() {
        console.log("Hello");
        try {
            if (firebase.auth().currentUser) await firebase.auth().signOut();
            localStorage.removeItem("currentUser");
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    }
}
