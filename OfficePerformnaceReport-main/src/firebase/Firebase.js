import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDmwRtFVhhLZFK49Y7Vo8xjo7IEf_7ahTI",
  authDomain: "officemanagement-1d969.firebaseapp.com",
  projectId: "officemanagement-1d969",
  storageBucket: "officemanagement-1d969.appspot.com",
  messagingSenderId: "160295308660",
  appId: "1:160295308660:web:9f523ea078e840fa2a3021"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }