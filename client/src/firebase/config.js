import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd3GigXcjnr3jxOIqbwuavLvZV-hrVHRI",

  authDomain: "las-flores-pasteleria.firebaseapp.com",

  projectId: "las-flores-pasteleria",

  storageBucket: "las-flores-pasteleria.appspot.com",

  messagingSenderId: "61692384670",

  appId: "1:61692384670:web:684ae5d7030fd3cca4b28f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default function iniFirebase() {
  return app;
}
