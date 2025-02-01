import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Form from "../components/Form";
import { axiosFunction } from "../utils/axiosUtil";

const PetsPage: React.FC = () => {
  const [showModal, setModal] = useState(false);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [sex, setSex] = useState([]);
  const [place, setPlace] = useState([]);
  const [contraception, setContraception] = useState([]);
  const [active, setActive] = useState([]);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    const api = "api/options";
    const speciesData = {
      categoryType: "種類",
    };
    axiosFunction({
      api,
      data: speciesData,
      setResult: setSpecies,
    });

    const breedsApi = "api/breeds/options";
    axiosFunction({
      api: breedsApi,
      data: {},
      setResult: setBreeds,
    });

    const sexData = {
      categoryType: "性別",
    };
    axiosFunction({
      api,
      data: sexData,
      setResult: setSex,
    });

    const placeData = {
      categoryType: "飼育場所",
    };
    axiosFunction({
      api,
      data: placeData,
      setResult: setPlace,
    });

    const contraceptionData = {
      categoryType: "避妊",
    };
    axiosFunction({
      api,
      data: contraceptionData,
      setResult: setContraception,
    });

    const activeData = {
      categoryType: "活動レベル",
    };
    axiosFunction({
      api,
      data: activeData,
      setResult: setActive,
    });
  }, []);

  const formField = [
    {
      title: "アイコン",
      type: "img",
      column: "icon",
      placeholder: "画像をアップロード",
      required: true,
    },
    {
      title: "お名前",
      type: "text",
      column: "name",
      placeholder: "ペットの名前",
      required: true,
    },
    {
      title: "種類",
      type: "select",
      column: "species",
      placeholder: "種類を選んでください",
      options: species,
      required: true,
    },
    {
      title: "品種",
      type: "select",
      column: "breed",
      placeholder: "品種を選んでください",
      options: breeds,
      required: true,
    },
    {
      title: "生年月日(推定)",
      type: "date",
      column: "birthday",
      placeholder: "生年月日を選んでください",
    },
    {
      title: "性別",
      type: "select",
      column: "sex",
      placeholder: "性別を選んでください",
      options: sex,
    },
    {
      title: "飼育場所",
      type: "select",
      column: "breedingPlace",
      placeholder: "飼育場所を選んでください",
      options: place,
    },
    {
      title: "避妊",
      type: "select",
      column: "contraception",
      placeholder: "避妊済みか選んでください",
      options: contraception,
    },
    {
      title: "体重",
      type: "number",
      column: "weight",
      placeholder: "体重（kg）",
    },
    // {
    //   title: "病気",
    //   type: "select",
    //   placeholder: "病気がある場合は選んでください",
    // },
    {
      title: "活動レベル",
      type: "select",
      column: "activeLevel",
      placeholder: "活動レベルを選んでください",
      options: active,
    },
    // { title: "特徴", type: "text", placeholder: "ペットの特徴や性格" },
  ];

  const formAPI = "api/pet/save";

  return (
    <>
      <div></div>

      {/* モーダルが表示される条件 */}
      {showModal && (
        <div
          id="static-modal"
          aria-hidden={!showModal}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 sticky top-0 z-50 bg-slate-50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  新しく家族を登録
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <Form formField={formField} formAPI={formAPI} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* モーダルを表示するボタン */}
      <div
        className="fixed z-50 bottom-10 right-10 border-2 bg-green-400 rounded-full cursor-pointer w-20 h-20 text-center align-middle flex justify-center items-center transition-all ease-in-out duration-300 hover:bg-green-500"
        onClick={toggleModal}
      >
        <AddIcon />
      </div>
    </>
  );
};

export default PetsPage;
