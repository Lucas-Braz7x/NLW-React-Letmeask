import firebase from 'firebase/app';

//Importando os recursos que vão ser utilizados do firebase
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

/* const firebaseConfig = {
  apiKey: "AIzaSyCI9Yki_hrNFdq9_lP2wvcz_99D06x2NxU",
  authDomain: "letmeask-e9763.firebaseapp.com",
  databaseURL: "https://letmeask-e9763-default-rtdb.firebaseio.com",
  projectId: "letmeask-e9763",
  storageBucket: "letmeask-e9763.appspot.com",
  messagingSenderId: "730941750023",
  appId: "1:730941750023:web:5ce930342995a43e8a63a2"
}; */

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

