import React from "react";
import IntroductionPopup1 from "./IntroductionPopup1";
import IconAndUserNameRegisterForm from "./IntroductionPopup2";

interface IntroductionPopupContentProps {
  page: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}
const IntroductionPopupContent: React.FC<IntroductionPopupContentProps> = ({
  page,
  setDisabled,
  disabled,
}) => {
  switch (page) {
    case 1:
      return <IntroductionPopup1 />;
    case 2:
      return (
        <IconAndUserNameRegisterForm
          setDisabled={setDisabled}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
};

export default IntroductionPopupContent;
