import React, { useState } from "react";
import Cookies from "js-cookie";
import IntroductionPopupContent from "./IntroductionPopupContent";

interface IntroductionPopupProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const IntroductionPopup: React.FC<IntroductionPopupProps> = ({
  setShowPopup,
}) => {
  // 現在のページを管理する状態
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);

  // 次のページに進む
  const nextPage = () => {
    if (page < 2) {
      setPage(page + 1);
    } else {
      // ポップアップを非表示にする
      setShowPopup(false);
      Cookies.set("isNewUser", "false");
    }
  };

  // 前のページに戻る
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <IntroductionPopupContent
          page={page}
          setDisabled={setDisabled}
          disabled={disabled}
        />
        <div className="flex justify-between">
          {/* 戻るボタン */}
          <button
            onClick={prevPage}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            disabled={page === 0}
          >
            戻る
          </button>

          {/* 次へボタン */}
          <button
            onClick={nextPage}
            className={`py-2 px-4 rounded-lg text-white ${
              disabled
                ? "bg-gray-400 cursor-not-allowed" // disabled のとき
                : "bg-blue-600 hover:bg-blue-700" // enabled のとき
            }`}
            disabled={disabled}
          >
            {page < 2 ? "次へ" : "完了"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPopup;
