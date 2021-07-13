import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addingTodo, getTodo } from "./Redux/action/action";

export default function AddToDo(props) {
    let inputRef = useRef();
    let dispatch = useDispatch();
    let disableState = useSelector(state => state.disabled);
    useEffect(() => {
        dispatch(getTodo());
        // eslint-disable-next-line
    }, [])
    return (
        <div className="add-todo">
            <input ref={inputRef} type="text" disabled={disableState} />
            <button onClick={(e) => {
                dispatch(addingTodo(inputRef.current.value));
                inputRef.current.value = "";
            }}>Add</button>
        </div>
    )
}