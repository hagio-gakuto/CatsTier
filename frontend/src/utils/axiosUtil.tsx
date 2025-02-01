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
}: {
  setResult: React.Dispatch<React.SetStateAction<T>>; // setResultはジェネリック型Tを受け取る
  data: Data; // APIに送信するデータ
  api: string; // APIエンドポイント
}) => {
  try {
    const response = await axios.post(api, data);

    if (response.data) {
      setResult(response.data); // 成功時に取得したデータをセット
    } else {
      console.log("No data received");
    }
  } catch (error) {
    showToast("error", getMessage("BE0007")); // エラーハンドリング
    console.error(error);
  }
};
