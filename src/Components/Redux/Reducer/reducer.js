import { ERROR, LOADING, SESSION_INFO, STUDENTS } from "../Action/ActionType";

let initialState = {
  loading: false,
  students: [],
  error: "",
  sessionInfo: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: !state.loading };
    case STUDENTS:
      return { ...state, students: action.payload };
    case ERROR:
      return { ...state, error: action.payload };
    case SESSION_INFO:
      return { ...state, sessionInfo: action.payload };
    default:
      return state;
  }
}
