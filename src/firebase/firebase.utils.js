import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBC0wZhYTbq4HgOGvjTcJAHEGGdi9BYNAc",
    authDomain: "crown-db-424ad.firebaseapp.com",
    databaseURL: "https://crown-db-424ad.firebaseio.com",
    projectId: "crown-db-424ad",
    storageBucket: "crown-db-424ad.appspot.com",
    messagingSenderId: "955008051027",
    appId: "1:955008051027:web:2fbd6a9ee369b3221763a6",
    measurementId: "G-0RSEGS8NLL"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData          
        }
        )
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }    

    return userRef;
  }

  firebase.initializeApp(config);

  // used for authentication
  export const auth = firebase.auth();  
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
  

   