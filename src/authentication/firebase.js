import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD_gGk0x0J9Q1VDLCn9f5E2xKjgpsQnBg",
  authDomain: "react-login-e07d0.firebaseapp.com",
  databaseURL: "https://react-login-e07d0.firebaseio.com",
  projectId: "react-login-e07d0",
  storageBucket: "react-login-e07d0.appspot.com",
  messagingSenderId: "653646216670",
  appId: "1:653646216670:web:1268b4372a950b81be314f"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, password } = user;
    try {
      await userRef.set({
        displayName,
        email,
        password,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

// set up google login
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

// set up facebok login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => {
  auth.signInWithPopup(facebookProvider);
};