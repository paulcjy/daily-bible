// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: atob(process.env.API_KEY),
  authDomain: atob(process.env.AUTH_DOMAIN),
  projectId: atob(process.env.PROJECT_ID),
  storageBucket: atob(process.env.STORAGE_BUCKET),
  messagingSenderId: atob(process.env.MESSAGING_SENDER_ID),
  appId: atob(process.env.APP_ID),
  measurementId: atob(process.env.MEASUREMENT_ID),
  databaseURL: atob(process.env.DATABASE_URL),
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(atob(process.env.RECAPTCHA_SITE_KEY)),
//   isTokenAutoRefreshEnabled: true,
// })
const initializeAppCheckAsync = async (app) => {
  await new Promise((resolve) =>
    document.addEventListener('DOMContentLoaded', resolve)
  )
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
    isTokenAutoRefreshEnabled: true,
  })
}

initializeAppCheckAsync(app)
const analytics = isSupported(app)
export const db = getDatabase(app)
export const auth = getAuth(app)
