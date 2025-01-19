import { createUserWithEmailAndPassword, signInWithEmailAndPassword,   signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

// ユーザー登録
export const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// ユーザーログイン
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error: unknown) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// ゲストログイン
export const guestLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      console.log("Guest login successful:", userCredential.user);
      return userCredential.user;
    } catch (error: unknown) {
      console.error("Error during guest login:", error);
      throw error; // エラーは上位で処理
    }
  };
