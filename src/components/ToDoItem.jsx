import { useDispatch } from "react-redux"
import { changeTodo, deletingTodo } from "./Redux/action/action"

export default function ToDoItem(props) {
    let dispatch = useDispatch();
    return (
        <div className={props.completed ? "todo-item completed" : "todo-item"}>
            <input type="checkbox" defaultChecked={props.completed} onClick={() => dispatch(changeTodo(props))} />
            <p className="content">{props.content}</p>
            <button onClick={() => dispatch(deletingTodo(props))}>del</button>
        </div>
    )

}