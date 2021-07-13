import { useSelector } from "react-redux";
import ToDoItem from "./ToDoItem";

export default function ToDoList({ props }) {
    let filter = useSelector(state => state)
    let todos = filter.todos;
    if (!filter.loading) {
        return (
            <div className="list">
                <ul className="todo-items">
                    {todos.map((todo, index) => {
                        if (filter.filter === "Active" && todo.completed) return null;
                        else if (filter.filter === "Completed" && !todo.completed) return null;
                        return <ToDoItem content={todo.content} completed={todo.completed} key={index} index={index} id={todo.id} />
                    })}
                </ul>
            </div>

        )
    }
    else {
        return (
            <div className="list">
                <h4>Loading...</h4>
            </div>
        )
    }
}