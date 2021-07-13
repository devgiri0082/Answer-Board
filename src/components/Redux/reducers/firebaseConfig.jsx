import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBpltvwLLU9cL6-1LwKYTSBd4sSCEUOx1c",
    authDomain: "react-todoapp-a6683.firebaseapp.com",
    projectId: "react-todoapp-a6683",
    storageBucket: "react-todoapp-a6683.appspot.com",
    messagingSenderId: "1051877151782",
    appId: "1:1051877151782:web:b823291f02bfcaef10c2e7"
};

firebase.initializeApp(firebaseConfig);
export const databaseRef = firebase.firestore()