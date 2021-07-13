import { databaseRef } from "../reducers/firebaseConfig";
import { ADD_TODO, TOGGLE_TODO, CHANGE_FILTER, LOADING, DELETE, DISABLED } from "./action_types";

export let addTodo = (text, complete, id) => ({
    type: ADD_TODO,
    completed: complete,
    id: id,
    payload: text
})

export let toggleTodo = (text) => ({
    type: TOGGLE_TODO,
    payload: text
})
export let changeFilter = (text) => ({
    type: CHANGE_FILTER,
    payload: text
})

export let loading = () => ({
    type: LOADING
})

export let deleting = (text) => ({
    type: DELETE,
    payload: text
})

export let disabled = (text) => ({
    type: DISABLED,
    payload: text
})

export let getTodo = () => {
    return async (dispatch) => {
        try {
            let response = await databaseRef.collection("TODOS").get()
            response.docs.forEach(doc => {
                dispatch(addTodo(doc.data().content, doc.data().completed, doc.id));
            })
            dispatch(loading());
        } catch (e) {
            console.alert("Error Fetching document: ", e);
        };

    }
}
export let changeTodo = (props) => {
    return async (dispatch) => {
        try {
            await databaseRef.collection('TODOS').doc(props.id).set({ content: props.content, completed: !props.completed, id: props.id, createdDate: new Date().toLocaleDateString() });
            dispatch(toggleTodo(props.index));
        } catch (e) {
            console.alert("Error removing document: ", e);
        }
    }
}

export let deletingTodo = (props) => {
    return async (dispatch) => {
        try {
            await databaseRef.collection("TODOS").doc(props.id).delete();
            dispatch(deleting(props.index));
        } catch (e) {
            console.alert("Error removing document: ", e);
        }
    }
}

export let addingTodo = (value) => {
    return async (dispatch) => {
        try {
            let response = await databaseRef.collection("TODOS").add({
                content: value,
                completed: false,
                created_at: new Date()
            });
            dispatch(addTodo(value, false, response.id));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}