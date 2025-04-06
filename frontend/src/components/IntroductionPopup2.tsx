import React, { useEffect, useState } from "react";
import { getMessage } from "../utils/messageUtils";
import InputError from "./InputError";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { showToast } from "../utils/toastifyUtils";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { axiosFunction } from "../utils/axiosUtil";

type Inputs = {
  icon: string;
  userName: string;
  uid: string;
};

interface IconAndUserNameRegisterFormProps {
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}
const IconAndUserNameRegisterForm: React.FC<
  IconAndUserNameRegisterFormProps
> = ({ setDisabled, disabled }) => {
  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(
    null
  ); // プレビュー画像
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisabled(true);
  }, [setDisabled]);

  // react-hook-formを使ってフォームのバリデーションを行う場合は、以下のように使う
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // 写真プレビュー関数
  const previewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 画像ファイルを取得
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewSrc(fileReader.result); // プレビュー画像を更新
      };
      fileReader.readAsDataURL(file); // 画像ファイルをData URLに変換
    } else {
      setPreviewSrc(null); // ファイルが選択されていない場合、プレビュー画像を非表示
    }
  };

  const onSubmit = (data: Inputs) => {
    setLoading(true);
    data.icon = previewSrc as string;
    data.uid = Cookies.get("uid") as string;
    registerIConAndUserName(data);
  };

  const registerIConAndUserName = async (data: Inputs) => {
    // サーバーにデータを送信
    try {
      //await axios.post("/api/registerIConAndUserName", data);
      axiosFunction({
        api: "api/user",
        data: data,
        setResult: () => {},
        method: "put",
      });
      // console.log(response);
      setLoading(false);
      showToast("success", getMessage("BS0001", { do: "登録" }));
      setDisabled(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setDisabled(false);
      if (axios.isAxiosError(error)) {
        showToast("error", getMessage("BE0007"));
      } else {
        showToast("error", getMessage("BE0007"));
      }
    }
  };

  const onError = () => {
    console.log(errors);
  };

  if (loading) {
    return <Loading message="処理中" />;
  }

  return (
    <>
      {disabled ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            encType="multipart/form-data"
            className=" w-full"
          >
            <h3>ユーザーネームを登録（ほかのユーザーにも表示されます）</h3>
            アイコン
            {/* プレビュー画像 */}
            {previewSrc ? (
              <div className="flex z-0flex-col relative items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg">
                <img
                  id="preview"
                  src={previewSrc as string} // 画像URLを指定
                  alt="icon"
                  className="object-cover w-full h-full rounded-lg"
                  decoding="async"
                />
                <CloseIcon
                  onClick={() => setPreviewSrc(null)}
                  className="absolute z-10 top-2 right-2 cursor-pointer"
                />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*" // 画像ファイルのみ選択できるように制限
                  onChange={previewFile} // ファイル選択時にプレビュー更新
                />
              </label>
            )}
            {/* ユーザーネーム入力フォーム */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mt-4">
              ユーザーネーム
              <input
                type="text"
                placeholder="ユーザーネーム"
                required
                className="w-full p-2 border rounded"
                {...register("userName", {
                  required: {
                    value: true,
                    message: getMessage("IE0001"),
                  },
                  minLength: {
                    value: 1,
                    message: getMessage("IE0002", { min: "1" }),
                  },
                })}
              />
            </label>
            <InputError message={errors.userName?.message || ""} />
            <button
              type="submit"
              className="w-full my-4 bg-blue-600 flex items-center justify-center text-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium dark:text-white hover:opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              登録
            </button>
          </form>
        </>
      ) : (
        <>tugi</>
      )}
    </>
  );
};

export default IconAndUserNameRegisterForm;
