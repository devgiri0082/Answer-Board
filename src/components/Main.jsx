import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "./Redux/action/action";

export default function Main({ props }) {
    const dispatch = useDispatch();
    let [currentSelection, setCurrentSelection] = useState('All');
    let updateSelection = (newItem) => setCurrentSelection(newItem);

    return (
        <div className="container">
            <h2>Get it done!</h2>
            <AddToDo />
            <ToDoList />
            <div className="filter-container">
                Show:
                <FilterItem updateSelection={updateSelection} text={'All'} currentSelection={currentSelection} show={"All"} dispatch={dispatch} />
                <FilterItem updateSelection={updateSelection} text={'Active'} currentSelection={currentSelection} show={"Active"} dispatch={dispatch} />
                <FilterItem updateSelection={updateSelection} text={'Completed'} currentSelection={currentSelection} show={"Completed"} dispatch={dispatch} />
            </div>
        </div>
    )

}

function FilterItem({ text, currentSelection, updateSelection, show, dispatch }) {
    return (
        <li onClick={(e) => {
            dispatch(changeFilter(show))
            updateSelection(text)
        }} className={currentSelection === text ? 'active' : ''}>{text}</li>
    )
}