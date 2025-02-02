import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
// import PetsScroll from "./PetsScroll";
import { Pet } from "../Type";

const PetIcon: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [pets, setPets] = useState([]);
  // const [showAllPets, setShowAllPets] = useState(false);

  useEffect(() => {
    setPets(
      Cookies.get("userPets")
        ? JSON.parse(Cookies.get("userPets") as string)
        : null
    );
    Cookies.remove("userPets");
  }, []);

  const handlePet = () => {
    // setShowAllPets((prev) => !prev);
  };

  // pathが"/pets"でない場合にのみ表示される
  if (path !== "/pets") {
    return (
      <>
        <div className="fixed z-50 bottom-8 right-4 w-40 h-40 overflow-auto">
          {/* <div className="bg-black bottom-60">
            {showAllPets && <PetsScroll />}
          </div> */}
          <div
            className="absolute bottom-0 border-2 cursor-pointer w-20 h-20 text-center bg-amber-200
         align-middle flex justify-center items-center transition-all ease-in-out duration-300 hover:opacity-30"
            onClick={handlePet}
          >
            {pets &&
              pets
                .filter((p: Pet) => p.active)
                .map((p: Pet) => <div key={p.id}>{p.name}</div>)}
          </div>
        </div>
      </>
    );
  }

  // pathが"/pets"の場合は何も表示しない
  return null;
};

export default PetIcon;
