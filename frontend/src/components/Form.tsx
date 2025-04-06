import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getMessage } from "../utils/messageUtils";
import CloseIcon from "@mui/icons-material/Close";
import InputError from "./InputError";
import Cookies from "js-cookie";
import { axiosFunction } from "../utils/axiosUtil";

type options = {
  value: string;
  option: string;
  species?: string;
}[];
type formFieldType = {
  title: string;
  type: string;
  column: string;
  placeholder: string;
  options?: options;
  required?: boolean;
}[];

interface FormProps {
  formField: formFieldType;
  formAPI: string;
}

type Inputs = {
  [key: string]: string;
};

const Form: React.FC<FormProps> = ({ formField, formAPI }) => {
  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(
    null
  ); // プレビュー画像

  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  // const [age, setAge] = useState<number>();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    data.icon = previewSrc as string;
    data.uid = Cookies.get("uid") as string;
    // console.log(data);

    await axiosFunction({
      api: formAPI,
      data,
      setResult: () => {},
      method: "post",
    });
    // fetchProducts({ setProducts, setLoading, keyword: data.search });
  };

  const onError = async () => {
    console.log(errors);
  };

  const handleSelectChange = (
    title: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (title === "種類") {
      setSelectedSpecies(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {formField.map((f, index) => {
        // フォームフィールドのタイプに応じたコンポーネントをレンダリング
        switch (f.type) {
          case "text":
            return (
              <div key={index} className="my-4">
                <label className="block text-sm font-medium">{f.title}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.column, {
                    required: {
                      value: f.required ?? false,
                      message: getMessage("IE0001"),
                    },
                    maxLength: {
                      value: 255,
                      message: getMessage("IE0003", { max: "255" }),
                    },
                  })}
                />

                <InputError message={errors[f.column]?.message || ""} />
              </div>
            );
          case "date":
            return (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium">{f.title}</label>
                <input
                  type="date"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.column, {
                    required: {
                      value: f.required ?? false,
                      message: getMessage("IE0001"),
                    },
                  })}
                />
                <InputError message={errors[f.column]?.message || ""} />
              </div>
            );

          case "select":
            switch (f.title) {
              case "品種":
                return (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium">
                      {f.title}
                    </label>
                    <select
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:z-30 disabled:relative"
                      {...register(f.column, {
                        required: {
                          value: f.required ?? false,
                          message: getMessage("IE0001"),
                        },
                      })}
                      disabled={selectedSpecies === ""}
                    >
                      {f.options
                        ?.filter((option) => option.species == selectedSpecies) // Filter options where the value matches selectedSpecies
                        .map((option) => (
                          <option key={option.value} value={option.value || ""}>
                            {option.option}
                          </option>
                        ))}
                    </select>
                    {selectedSpecies === "" && <p>種類を選んでください</p>}
                    <InputError message={errors[f.column]?.message || ""} />
                  </div>
                );

              default:
                return (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium">
                      {f.title}
                    </label>
                    <select
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register(f.column, {
                        required: {
                          value: f.required ?? false,
                          message: getMessage("IE0001"),
                        },
                      })}
                      onChange={(e) => handleSelectChange(f.title, e)}
                    >
                      {f.options?.map((option) => (
                        <option key={option.value} value={option.value || ""}>
                          {option.option}
                        </option>
                      ))}
                    </select>
                    <InputError message={errors[f.column]?.message || ""} />
                  </div>
                );
            }

          case "number":
            return (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium">{f.title}</label>
                <input
                  placeholder={f.placeholder}
                  type="number"
                  step="any"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.column, {
                    required: {
                      value: f.required ?? false,
                      message: getMessage("IE0001"),
                    },
                  })}
                />
                <InputError message={errors[f.column]?.message || ""} />
              </div>
            );

          case "img":
            return (
              <div key={index}>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
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
              </div>
            );
          default:
            return null; // それ以外のタイプには何も表示しない
        }
      })}

      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          submit
        </button>
      </div>
    </form>
  );
};

export default Form;
