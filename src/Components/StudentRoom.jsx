import { Button, Container, Grid, LinearProgress, makeStyles, NativeSelect, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { currentStudent, findTeacher, getStudents } from "./Redux/Action/Actions";

const useStyles = makeStyles((theme) => ({
    addPadding: {
        padding: "70px 0"
    },
    nativeSelectStyle: {
        width: "300px",
        height: "30px",
        background: "rgb(242,242,242)",
        "margin-top": "10px",
        "font-size": "20px",
        padding: "5px"
    }
}))
export default function StudentRoom() {
    let [student, setStudent] = useState();
    let history = useHistory();
    let classes = useStyles();
    let { id } = useParams();
    let dispatch = useDispatch();
    let { teacherExist, teacherEmail, students } = useSelector(state => state);
    useEffect(() => {
        dispatch(findTeacher(id));
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (teacherExist === true) {
            dispatch(getStudents(teacherEmail));
        }
        // eslint-disable-next-line
    }, [teacherEmail])
    useEffect(() => {
        if (students.length > 0) setStudent(students[0]);
    }, [students])
    if (teacherExist === undefined) {
        return (
            <Container maxWidth="md" p={4} className={classes.addPadding}>
                <Typography variant="h4">Loading...</Typography>
                <LinearProgress />
            </Container>
        )
    }
    if (teacherExist === false) {
        return (
            <Container maxWidth="md" p={4} className={classes.addPadding}>
                <Typography variant="h4">Invalid room id</Typography>
            </Container>
        )
    }
    if (teacherExist === true) {
        return (
            <Container maxWidth="md" p={4} className={classes.addPadding}>
                <Typography variant="h4">Select your name</Typography>
                <NativeSelect className={classes.nativeSelectStyle}
                    defaultValue={students[0]}
                    onChange={(e) => setStudent(e.target.value)}
                >
                    {students.map(elem => <option value={elem}>{elem}</option>)}
                </NativeSelect>
                <Grid item xs={12} style={{ "margin-top": "20px" }}>
                    <Button onClick={answerPage} variant="contained" color="primary">
                        Continue
                    </Button>
                </Grid>
            </Container>
        )
    }
    function answerPage() {
        dispatch(currentStudent(student));
        history.push(`/answer/${id}`)
    }
}
