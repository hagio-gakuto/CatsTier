// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJyhswa4m-gNeOC3nNCI6mDEo-UPY7qNg",
  authDomain: "catstier-cd7b5.firebaseapp.com",
  projectId: "catstier-cd7b5",
  storageBucket: "catstier-cd7b5.firebasestorage.app",
  messagingSenderId: "404031314787",
  appId: "1:404031314787:web:e9440cbc849ab64f715156",
  measurementId: "G-JM1MYCTR5Z",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Googleログイン処理（ポップアップ + リダイレクトフォールバック対応）
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result.user;
  } catch (error) {
    console.warn("Popup failed, fallback to redirect:", error);
    // ポップアップが失敗した場合、リダイレクトにフォールバック
    await signInWithRedirect(auth, provider);
  }
};

// リダイレクト結果の処理
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Redirect result:", result.user);
      return result.user;
    }
  } catch (error) {
    console.error("Error handling redirect result:", error);
  }
};

// ユーザーのログイン状態を監視
export const observeAuthState = (
  callback: (user: User | null) => void
): void => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// 新規ユーザー登録
export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// ログイン処理
export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
