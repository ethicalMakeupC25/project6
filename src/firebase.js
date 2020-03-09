// firebase.js
import firebase from "firebase";

// Initialize Firebase
// USE YOUR CONFIG OBJECT
const firebaseConfig = {
    apiKey: "AIzaSyCd2gqxrwZeTSOKYXliPvRpQK52kk_TVwc",
    authDomain: "ethicalmakeup-9f173.firebaseapp.com",
    databaseURL: "https://ethicalmakeup-9f173.firebaseio.com",
    projectId: "ethicalmakeup-9f173",
    storageBucket: "ethicalmakeup-9f173.appspot.com",
    messagingSenderId: "446242384772",
    appId: "1:446242384772:web:26fb2fdb2b7bc6716bcbd1"
};
firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;