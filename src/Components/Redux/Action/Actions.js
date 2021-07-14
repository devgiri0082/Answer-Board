import { db } from "../firebaseConfig";
import { ERROR, LOADING, SESSION_INFO, STUDENTS } from "./ActionType";

export let loading = () => ({
  type: LOADING,
});
export let error = (value) => ({
  type: ERROR,
  payload: value,
});
export let setStudents = (allStudents) => ({
  type: STUDENTS,
  payload: allStudents,
});
export let sessionInfo = (value) => ({
  type: SESSION_INFO,
  payload: value,
});

export const getStudents = (email) => {
  return async (dispatch) => {
    console.log("I am here");
    try {
      let response = await db
        .collection(email.split(".").join("_"))
        .doc(email.split(".").join("_"))
        .get();
      //console.log(response);
      if (!response.exists) return;
      let data = await response.data();
      // console.log(data);
      await dispatch(setStudents(data.students));
      // dispatch(loading());
    } catch (err) {
      // console.log(err);
      dispatch(error(err));
    }
  };
};

export const endSession = (email) => {
  return async (dispatch) => {
    try {
      console.log("deleting value");
      dispatch(sessionInfo("exiting"));
      await db
        .collection(email.split(".").join("_"))
        .doc(email.split(".").join("_"))
        .delete();
      dispatch(setStudents([]));
      dispatch(error(""));
      dispatch(sessionInfo("exited"));
    } catch (err) {
      console.log(err);
      dispatch(error(err));
      dispatch(sessionInfo("error", err));
    }
  };
};
