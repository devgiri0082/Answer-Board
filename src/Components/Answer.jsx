import { Container, Grid, makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


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
    let history = useHistory();
    let { id } = useParams();
    let currentStudent = useSelector(state => state.currentStudent);
    let classes = useStyles();
    useEffect(() => {
        if (currentStudent === undefined) history.push(`/room/${id}`);
        // eslint-disable-next-line
    }, [])
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
                        <TextareaAutosize aria-label="maximum height" minRows={13} size="large" className={classes.changeTextArea} style={{ width: "75%" }} />
                    </Grid>
                </Grid>
            </Container>
        )
    }
    else {
        return (
            <div>Invalid User</div>
        )
    }
}
