import firebase from "firebase";
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCUUEoAGDVIBf2nuIPjHfgAqcZCNWfJvnc",
    authDomain: "just-ask-b48e8.firebaseapp.com",
    databaseURL: "https://just-ask-b48e8.firebaseio.com",
    projectId: "just-ask-b48e8",
    storageBucket: "just-ask-b48e8.appspot.com",
    messagingSenderId: "487736181651",
    appId: "1:487736181651:web:e1b6d1961185cdb3871e66"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);