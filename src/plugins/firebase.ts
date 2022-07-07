import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyASgdUa2EcTgXgsOz6eZguzLs1v9r-MujA",
  authDomain: "collection-355516.firebaseapp.com",
  projectId: "youtubecollection-355516",
  storageBucket: "youtubecollection-355516.appspot.com",
  messagingSenderId: "423033788338",
  appId: "1:423033788338:web:fdccfd24d3ef16bc56b6ab",
  measurementId: "G-93LBP1R2Q4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);

export { db, analytics };
