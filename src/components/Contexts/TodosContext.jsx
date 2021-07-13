import { createContext, useReducer } from "react";


let TodosContext = createContext();

export default TodosContext;

export function TodosContextProvider(props) {
    let initialValue = {
        show: "All",
        allTodos: []
    }
    function addTodo(state, action) {
        switch (action.type) {
            case "Add":
                let newTodos = JSON.parse(JSON.stringify(state.allTodos));
                let value = { completed: false };
                value.content = action.value;
                newTodos.push(value);
                return { allTodos: newTodos, show: state.show };
            case "Change":
                let changedTodo = JSON.parse(JSON.stringify(state.allTodos));
                changedTodo[action.value]["completed"] = changedTodo[action.value]["completed"] ? false : true;
                return { allTodos: changedTodo, show: state.show };
            case "Show":
                return { allTodos: state.allTodos, show: action.value }
            default:
                throw new Error("Hello this is an error");
        }
    }
    let [state, dispatch] = useReducer(addTodo, initialValue);

    return (
        <TodosContext.Provider value={{
            state, dispatch
        }}>
            {props.children}
        </TodosContext.Provider>
    )
}