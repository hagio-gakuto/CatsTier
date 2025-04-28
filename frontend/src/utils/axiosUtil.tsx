import axios from "axios";
import { showToast } from "../utils/toastifyUtils";
import { getMessage } from "./messageUtils";

// データの型定義（汎用的に使えるように）
interface Data {
  [key: string]: unknown;
}

// ジェネリック型Tを受け取る関数
export const axiosFunction = async <T,>({
  setResult,
  data,
  api,
  method,
}: {
  setResult: React.Dispatch<React.SetStateAction<T>>; // setResultはジェネリック型Tを受け取る
  data: Data; // APIに送信するデータ
  api: string; // APIエンドポイント
  method: string;
}) => {
  try {
    let response; // レスポンスの型をジェネリック型Tに設定
    if (method === "get") {
      response = await axios.get(api, { params: data });
    } else if (method === "post") {
      response = await axios.post(api, data);
    } else if (method === "put") {
      response = await axios.put(api, data);
    } else if (method === "delete") {
      response = await axios.delete(api, { data });
    }

    if (response && response.data) {
      setResult(response.data); // 成功時に取得したデータをセット
    }
    // else {
    //   console.log("No data received");
    // }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMsg = error.response.data.errorMsg; // エラーの詳細をコンソールに出力
      if (errorMsg) {
        showToast("error", errorMsg.common); // エラーハンドリング
      }
    } else {
      showToast("error", getMessage("BE0007")); // エラーハンドリング
    }
  }
};
