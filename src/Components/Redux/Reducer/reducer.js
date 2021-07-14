import {
  CURRENT_STUDENT,
  ERROR,
  LOADING,
  SESSION_INFO,
  SET_TEACHER,
  STUDENTS,
  STUDENT_LINK,
  USER_EXISTS,
} from "../Action/ActionType";

let initialState = {
  loading: false,
  students: [],
  error: "",
  sessionInfo: "",
  studentLink: "",
  teacherExist: undefined,
  teacherEmail: undefined,
  currentStudent: undefined,
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
    case STUDENT_LINK:
      return { ...state, studentLink: action.payload };
    case USER_EXISTS:
      return { ...state, teacherExist: action.payload };
    case SET_TEACHER:
      return { ...state, teacherEmail: action.payload };
    case CURRENT_STUDENT:
      return { ...state, currentStudent: action.payload };
    default:
      return state;
  }
}
