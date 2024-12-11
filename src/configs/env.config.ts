import { ENVIRONMENTS } from "@/constants"

export const environment = {
  env: process.env.NODE_ENV as ENVIRONMENTS,
  packageName: process.env.NEXT_PUBLIC_PACKAGE_NAME as string,
  apiURL: process.env.NEXT_PUBLIC_API_URL as string,

  firebaseAPIKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  firebaseAuthDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  firebaseStorageBucket: process.env
    .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  firebaseMessagingSenderId: process.env
    .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  firebaseAppID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  firebaseMeasurementId: process.env
    .NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
}
