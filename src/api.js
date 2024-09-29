// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection
} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe6YwNQoE5BvOGXAvz82PvJeRNmsSR3Ww",
  authDomain: "portfolio-project-f30af.firebaseapp.com",
  projectId: "portfolio-project-f30af",
  storageBucket: "portfolio-project-f30af.appspot.com",
  messagingSenderId: "590350751686",
  appId: "1:590350751686:web:19364662e28252b0c484c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return projects
}