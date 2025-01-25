import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Firebase設定ファイル
import TopPage from "./pages/TopPage"; // トップページ
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import LoginPage from "./pages/LoginPage";
import Loading from "./components/Loading";
import TierPage from "./pages/TierPage";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // ユーザーが存在すればログイン状態
    });
    return () => unsubscribe(); // クリーンアップ
  }, []);

  if (isLoggedIn === null) {
    // ログイン状態がまだ確認されていない場合、ローディングを表示
    return <Loading message="Loading" />;
  }

  return (
    <div className="container">
      <ToastContainer />

      <div className="main min-h-dvh bg-gray-100">
        <Router>
          <div className="header">
            <Header setIsMenuOpen={setIsMenuOpen} isLoggedIn={isLoggedIn} />
          </div>

          {isMenuOpen && (
            <div className="side-menu z-50">
              <SideMenu setIsMenuOpen={setIsMenuOpen} />
            </div>
          )}

          <Routes>
            {/* ログイン済みの場合のみトップページにアクセス可能 */}
            <Route
              path="/" // ルートパス
              element={<TopPage />} // トップページを表示
            />
            {/* ログインページ*/}
            <Route path="/login" element={<LoginPage />} />

            {/* ティアページ */}
            <Route path="tier" element={<TierPage />} />

            {/* 存在しないURLは404ページにリダイレクト */}
            <Route path="*" element={<Navigate to="/error/404" replace />} />
            <Route path="/error/:statusCode" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
