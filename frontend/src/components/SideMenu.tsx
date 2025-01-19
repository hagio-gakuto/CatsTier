import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface SideMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideMenu: React.FC<SideMenuProps> = ({ setIsMenuOpen }) => {
  return (
    <div>
      <CloseIcon onClick={() => setIsMenuOpen(false)} />
      <h1>SideMenu</h1>
      <p>SideMenu content</p>
    </div>
  );
};

export default SideMenu;
