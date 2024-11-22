import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeAPP({
    apiKey: "AIzaSyDDEr9CP4vtNcd_hslRhlNkpGQGWSkQT58",
    authDomain: "stadi-a1ee5.firebaseapp.com",
    databaseURL: "https://stadi-a1ee5-default-rtdb.firebaseio.com",
    projectId: "stadi-a1ee5",
    storageBucket: "stadi-a1ee5.firebasestorage.app",
    messagingSenderId: "490558228128",
    appId: "1:490558228128:web:ce72b48143e595c247ebc5"
});



export { firebaseConfig as firebase };