import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Firebase設定ファイル
import LoginPage from "./pages/LoginPage"; // ログインページ
import TopPage from "./pages/TopPage"; // トップページ
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // ユーザーが存在すればログイン状態
    });
    return () => unsubscribe(); // クリーンアップ
  }, []);

  if (isLoggedIn === null) {
    // ログイン状態がまだ確認されていない場合、ローディングを表示
    return <div>Loading...</div>;
  }

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        {/* ログイン済みの場合のみトップページにアクセス可能 */}
        <Route
          path="/top"
          element={isLoggedIn ? <TopPage /> : <Navigate to="/login" replace />}
        />
        {/* 未ログインの場合にログインページを表示 */}
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/top" replace />}
        />

        
        {/* 存在しないURLは404ページにリダイレクト */}
        <Route path="*" element={<Navigate to="/error/404" replace />} />
        <Route path="/error/:statusCode" element={<ErrorPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
