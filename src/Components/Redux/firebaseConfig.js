import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDD7MK8irnh_NYW6DtUPqfGRgbe3RLwgqU",
  authDomain: "capstone-project-86f7b.firebaseapp.com",
  projectId: "capstone-project-86f7b",
  storageBucket: "capstone-project-86f7b.appspot.com",
  messagingSenderId: "65006816338",
  appId: "1:65006816338:web:9ef5fbaf3a61e90083e38b",
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
export { provider, db };
