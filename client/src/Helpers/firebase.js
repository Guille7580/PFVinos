import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, FacebookAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD6L7UZWrDcgE_dwVDgSF7ouBaoa3s-Gpg',
  authDomain: 'las-moritas.firebaseapp.com',
  projectId: 'las-moritas',
  storageBucket: 'las-moritas.appspot.com',
  messagingSenderId: '415442284058',
  appId: '1:415442284058:web:a8b970dac3cfc029e12ba3',
  measurementId: 'G-SMBB82RH7M'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()
const faceProvider = new FacebookAuthProvider()
export { provider, auth }
