// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpYyv3Dl_9W3GHuqiRxJsAOBh52KcMWIQ',
  authDomain: 'daily-bible-11e5a.firebaseapp.com',
  projectId: 'daily-bible-11e5a',
  storageBucket: 'daily-bible-11e5a.appspot.com',
  messagingSenderId: '783764023979',
  appId: '1:783764023979:web:36d8826e6e538ce608a5ee',
  measurementId: 'G-9G8S03QQP4',
  databaseURL: 'https://daily-bible-11e5a-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = isSupported(app)
export const db = getDatabase(app)
export const auth = getAuth(app)
