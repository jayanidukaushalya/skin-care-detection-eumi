import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { environment } from "./env.config"

const firebaseConfig = {
  apiKey: environment.firebaseAPIKey,
  authDomain: environment.firebaseAuthDomain,
  projectId: environment.firebaseProjectId,
  storageBucket: environment.firebaseStorageBucket,
  messagingSenderId: environment.firebaseMessagingSenderId,
  appId: environment.firebaseAppID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
