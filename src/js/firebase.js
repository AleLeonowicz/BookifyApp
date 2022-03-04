import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD7WwLtqpA3MQbG_VKHXypOxLI41uvxFVo',
  authDomain: 'bookify-aleleonowicz.firebaseapp.com',
  projectId: 'bookify-aleleonowicz',
  storageBucket: 'bookify-aleleonowicz.appspot.com',
  messagingSenderId: '88661068138',
  appId: '1:88661068138:web:9f05b25d7165685561fd13',
  measurementId: 'G-9VJ54WV6LW',
};
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Other config options...
});

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      console.log('authResult', authResult);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url./
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged in', user);
  } else {
    // User is not signed in.
    console.log('logged out');
  }
});

export const initAuth = () => {
  ui.start('#firebaseui-auth-container', uiConfig);
};
