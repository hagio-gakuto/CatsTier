import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import PetsScroll from "./PetsScroll";
import { Pet } from "../Type";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPets } from "../redux/petsSlice"; // fetchUserPetsアクション
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";

const PetIcon: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  // const [showAllPets, setShowAllPets] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { pets, activePetId } = useSelector((state: RootState) => state.pets);

  // ペットデータを取得するためにコンポーネントがマウントされたときに実行
  useEffect(() => {
    if (pets.length === 0) {
      dispatch(fetchUserPets()); // ペットデータを取得
    }
  }, [dispatch, pets.length]);

  const handlePet = () => {
    // setShowAllPets((prev) => !prev);
  };

  // pathが"/pets"でない場合にのみ表示される
  if (path !== "/pets") {
    return (
      <>
        <div className="fixed z-50 bottom-10 right-10 w-20 h-20 ">
          {/* <div className="bg-black bottom-60">
            {showAllPets && <PetsScroll />}
          </div> */}
          <div
            className="cursor-pointer w-20 h-20 text-center bg-amber-200
         align-middle flex justify-center items-center transition-all ease-in-out duration-300 hover:opacity-30"
            onClick={handlePet}
          >
            {pets &&
              pets
                .filter((p: Pet) => p.id === activePetId)
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
