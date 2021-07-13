import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './Login'
import Students from "./Students";
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
            </Switch>
        </Router>
    )
}
