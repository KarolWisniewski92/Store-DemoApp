import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAGMyjI_dS3Ki2MfPK8XEYzhx-EXqUzCvQ",
    authDomain: "store-demoapp.firebaseapp.com",
    databaseURL: "https://store-demoapp-default-rtdb.firebaseio.com",
    projectId: "store-demoapp",
    storageBucket: "store-demoapp.appspot.com",
    messagingSenderId: "777721115399",
    appId: "1:777721115399:web:d57298bac31f6f6d0b0ba2"

});

const fbase = Rebase.createClass(firebaseApp.database());

export { fbase, firebaseApp };