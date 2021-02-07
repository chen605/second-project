import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCS4IadSqhLmUNJOX3CDI-cwA1Tr05_X2A",
  authDomain: "crwn-db-71333.firebaseapp.com",
  projectId: "crwn-db-71333",
  storageBucket: "crwn-db-71333.appspot.com",
  messagingSenderId: "1084206013440",
  appId: "1:1084206013440:web:da624e326d811d29f08ce5",
  measurementId: "G-GL2NPEJ8DM",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
