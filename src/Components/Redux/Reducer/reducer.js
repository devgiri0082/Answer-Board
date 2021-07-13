import { LOADING } from "../Action/Action";

let initialState = {
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...initialState, loading: !state.loading };
    default:
      return state;
  }
}
