import { db } from "../firebaseConfig";
import { LOADING, STUDENTS } from "./ActionType";

export let loading = () => ({
  type: LOADING,
});

export let setStudents = (allStudents) => ({
  type: STUDENTS,
  payload: allStudents,
});

export const getStudents = (email) => {
  return async (dispatch) => {
    try {
      let response = await db
        .collection(email.split(".").join("_"))
        .doc(email.split(".").join("_"))
        .get();
      let data = await response.data();
      console.log(data);
      await dispatch(setStudents(data.students));
    } catch (err) {
      console.log(err);
    }
  };
};
