import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const PetsPage: React.FC = () => {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      {/* モーダルが表示される条件 */}
      {showModal && (
        <div
          id="static-modal"
          aria-hidden={!showModal}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
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
                <form className="max-w-sm mx-auto">
                  <label htmlFor="underline_select" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="underline_select"
                    className="block py-2.5 px-2.5 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {/* <option selected>Choose a country</option> */}
                    <option value="US">United States</option>
                    <option value="US">United States</option>
                  </select>
                </form>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={toggleModal}
                >
                  I accept
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={toggleModal}
                >
                  Decline
                </button>
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
