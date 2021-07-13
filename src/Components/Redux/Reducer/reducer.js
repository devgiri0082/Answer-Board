import { LOADING, STUDENTS } from "../Action/ActionType";

let initialState = {
  loading: false,
  students: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...initialState, loading: !state.loading };
    case STUDENTS:
      return { ...initialState, students: action.payload };
    default:
      return state;
  }
}
