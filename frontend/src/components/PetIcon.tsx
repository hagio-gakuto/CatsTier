import React from "react";
import { useLocation } from "react-router-dom";

const PetIcon: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // console.log(path);

  // pathが"/pets"でない場合にのみ表示される
  if (path !== "/pets") {
    return (
      <>
        <div
          className="fixed z-50 bottom-10 right-10 border-2 cursor-pointer w-20 h-20 text-center
         align-middle flex justify-center items-center transition-all ease-in-out duration-300 hover:opacity-30"
        >
          <p>peticon</p>
        </div>
      </>
    );
  }

  // pathが"/pets"の場合は何も表示しない
  return null;
};

export default PetIcon;
