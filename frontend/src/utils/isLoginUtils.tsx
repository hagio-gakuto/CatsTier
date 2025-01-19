import Cookies from "js-cookie";

export const isUserLoggedIn = () => {
  const token = Cookies.get("authToken");
  return !!token; // トークンが存在すればログイン済み
};
