import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './Login'
import Students from "./Students";
import Dashboard from "./Dashboard";
import StudentRoom from './StudentRoom';
import Answer from './Answer';
export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/students">
                    <Students />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/room/:id">
                    <StudentRoom />
                </Route>
                <Route path="/answer/:id">
                    <Answer />
                </Route>
            </Switch>
        </Router>
    )
}
