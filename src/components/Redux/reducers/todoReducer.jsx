import { ADD_TODO, TOGGLE_TODO, CHANGE_FILTER, LOADING, DELETE, DISABLED } from "../action/action_types";

let initialState = {
    todos: [
    ],
    filter: "All",
    loading: true,
    disabled: false
}

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            let newTodos = JSON.parse(JSON.stringify(state.todos));
            let value = { completed: action.completed, id: action.id };
            value.content = action.payload;
            newTodos.push(value);
            console.log(state);
            return { ...state, todos: newTodos }
        case TOGGLE_TODO:
            let changedTodo = JSON.parse(JSON.stringify(state.todos));
            changedTodo[action.payload]["completed"] = changedTodo[action.payload]["completed"] ? false : true;
            return { ...state, todos: changedTodo }
        case CHANGE_FILTER:
            return { ...state, filter: action.payload }
        case LOADING:
            return { ...state, loading: false }
        case DELETE:
            let deletedTodo = [...state.todos.slice(0, action.payload), ...state.todos.slice(action.payload + 1)];
            return { ...state, todos: deletedTodo }
        case DISABLED:

            return { ...state, disabled: action.payload }
        default:
            console.log(state);
            return state;

    }
}