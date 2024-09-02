importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAXT7qWjquc_SFkuQu48vQwdcsui9llXT8",
  authDomain: "testingnotification-1bad3.firebaseapp.com",
  projectId: "testingnotification-1bad3",
  storageBucket: "testingnotification-1bad3.appspot.com",
  messagingSenderId: "963432986155",
  appId: "1:963432986155:web:70076e9e4f8e28411c9c6e",
  measurementId: "G-WHFWE0PGJX",
  vpaidKey:"BPudnqHtnd-ErHRvNRazVU-mrp5tI2LVdSToxwF87qGUKJR42pvtsj7_r9Sm5cPxUqe_3pBiAW8f-aEEQUmLoYA"
  });

  const messaging = firebase.messaging();