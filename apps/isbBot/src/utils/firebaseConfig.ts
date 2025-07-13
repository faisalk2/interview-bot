import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBY2z9QVDzmK4grdV2vMSPByYgt61fvtc8",
  authDomain: "ivi-isb.firebaseapp.com",
  projectId: "ivi-isb",
  storageBucket: "ivi-isb.firebasestorage.app",
  messagingSenderId: "1096259497490",
  appId: "1:1096259497490:web:c330bcbf0a16ccf12cb2cb",
  measurementId: "G-KPGBCS58SE",
};

let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { analytics };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBY2z9QVDzmK4grdV2vMSPByYgt61fvtc8",
//   authDomain: "ivi-isb.firebaseapp.com",
//   projectId: "ivi-isb",
//   storageBucket: "ivi-isb.firebasestorage.app",
//   messagingSenderId: "1096259497490",
//   appId: "1:1096259497490:web:c330bcbf0a16ccf12cb2cb",
//   measurementId: "G-KPGBCS58SE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
