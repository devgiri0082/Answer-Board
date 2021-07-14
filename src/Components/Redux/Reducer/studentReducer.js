import { SET_TEACHER, USER_EXISTS } from "../Action/ActionType";

let initialState = {
  teacherExist: undefined,
  teacherEmail: undefined,
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_EXISTS:
      return { ...state, teacherExist: action.payload };
    case SET_TEACHER:
      return { ...state, teacherEmail: action.payload };
    default:
      return state;
  }
};
