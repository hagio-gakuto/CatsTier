import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  registerWithEmailAndPassword,
  // guestLogin
} from "../authService";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getMessage } from "../utils/messageUtils";
import { showToast } from "../utils/toastifyUtils";
import InputError from "../components/InputError";
import Cookies from "js-cookie";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // react-hook-formを使ってフォームのバリデーションを行う場合は、以下のように使う
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleServerLogin = async (uid: string) => {
    const data = {
      uid: uid, // ユーザーID
    };

    // サーバーにログイン情報を送信
    try {
      const response = await axios.post("/api/login", data);
      console.log(response.data);
      return response.data;
    } catch {
      showToast("error", getMessage("BE0007"));
    }
  };

  // Googleログイン
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // FirebaseのIDトークンを取得
      // console.log(result.user.uid);
      const token = await result.user.getIdToken();

      const isNewUser = await handleServerLogin(result.user.uid);
      // Cookieに保存 (トークン)
      Cookies.set("authToken", token, { expires: 7, secure: true }); // 有効期限7日
      // 次の画面にisNewUserを渡す
      console.log(isNewUser);
      navigate("/", { state: { isNewUser: isNewUser } });
      // ログイン成功時の処理
      // console.log("Google Login successful:", result.user);
      showToast("success", "ログインしました！");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  // メール/パスワードでログインまたは登録
  const handleEmailAuth = async (data: Inputs) => {
    try {
      if (isRegistering) {
        // 新規登録
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // FirebaseのIDトークンを取得
        const token = await userCredential.user.getIdToken();
        const isNewUser = await handleServerLogin(userCredential.user.uid);
        // Cookieに保存 (トークン)
        Cookies.set("authToken", token, { expires: 7, secure: true }); // 有効期限7日
        showToast("success", "登録に成功しました！");
        // 次の画面にisNewUserを渡す
        navigate("/", { state: { isNewUser: isNewUser } });
        // console.log("Registered user:", userCredential.user);
      } else {
        // ログイン
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        // FirebaseのIDトークンを取得
        const token = await userCredential.user.getIdToken();
        const isNewUser = await handleServerLogin(userCredential.user.uid);
        // Cookieに保存 (トークン)
        Cookies.set("authToken", token, { expires: 7, secure: true }); // 有効期限7日
        // 次の画面にisNewUserを渡す
        navigate("/", { state: { isNewUser: isNewUser } });
        showToast("success", "ログインしました！");
        // console.log("Logged in user:", userCredential.user);
      }
    } catch (error) {
      console.error("Error during email auth:", error);
    }
  };

  // const handleGuestLogin = async () => {
  //   // setError(null);
  //   try {
  //     const user = await guestLogin();
  //     console.log("Logged in as guest:", user);
  //     alert("Guest login successful");
  //     // ここでトップページなどにリダイレクト
  //   } catch (err: unknown) {
  //     console.error("Error during guest login:", err);
  //     // setError(err.message);
  //   }
  // };

  //ユーザー登録
  const handleRegister = async (data: Inputs) => {
    try {
      await registerWithEmailAndPassword(data.email, data.password);
      console.log("Registration successful");
      navigate("/"); // 登録成功後にトップページにリダイレクト
      showToast("success", "登録に成功しました！");
    } catch (err: unknown) {
      // setError(err.message);
      console.error("Error during registration:", err);
    }
  };

  const onSubmit = async (data: Inputs) => {
    // console.log(data);
    if (isRegistering) {
      handleRegister(data);
    } else {
      handleEmailAuth(data);
    }
  };

  const onError = async () => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegistering ? "登録" : "ログイン"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            // onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
            {...register("email", {
              required: {
                value: true,
                message: getMessage("IE0001"),
              },
              minLength: {
                value: 6,
                message: getMessage("IE0002", { min: "8" }),
              },
            })}
          />
          <InputError message={errors.email?.message || ""} />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
            {...register("password", {
              required: {
                value: true,
                message: getMessage("IE0001"),
              },
              minLength: {
                value: 6,
                message: getMessage("IE0002", { min: "8" }),
              },
            })}
          />
          <InputError message={errors.password?.message || ""} />

          <button
            type="submit"
            className="w-full bg-blue-600 flex items-center justify-center text-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium dark:text-white hover:opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {isRegistering ? "登録" : "ログイン"}
          </button>
        </form>
        {!isRegistering && (
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    {" "}
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
              <span>Continue with Google</span>
            </button>
            {/* <button
              onClick={handleGuestLogin}
              className="w-full bg-gray-500 text-white py-2 rounded"
            >
              ゲストログイン
            </button> */}
          </div>
        )}

        <p className="text-sm text-center mt-4">
          {isRegistering
            ? " アカウントをお持ちですか?"
            : "アカウント登録はこちら"}{" "}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 cursor-pointer hover:opacity-50"
          >
            {isRegistering ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
