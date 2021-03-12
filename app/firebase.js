  
import * as firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUnSGN_hiDmsZlCFyMdFUlBpoGKfMMbdg",
    authDomain: "logical-handler-247416.firebaseapp.com",
    projectId: "logical-handler-247416",
    storageBucket: "logical-handler-247416.appspot.com",
    messagingSenderId: "265755419167",
    appId: "1:265755419167:web:c0cfb557152aba7a3c6b2a",
    measurementId: "G-V13CFEVZPF"
  };

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

var firestore = firebase.firestore();

export default firestore