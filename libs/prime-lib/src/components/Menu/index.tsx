import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../shared/firebaseconfig";
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from "react-router-dom";
import { AppRoutesEnum } from "@lib/shared/types";
import { useAuth } from "../../../../shared/context/Auth";
import EmptyImage from "../../../../shared/assets/images/emptyImage.png";

const menu = [
  {
    listIcon: <InfoOutlinedIcon />,
    listText: "Dashboard",
    url: AppRoutesEnum.MAIN
  },
  {
    listIcon: <PeopleOutlineOutlinedIcon />,
    listText: "Team",
    url: AppRoutesEnum.TEAM
  },
  {
    listIcon: <PercentOutlinedIcon />,
    listText: "Offers",
    url: AppRoutesEnum.OFFERS
  },
  {
    listIcon: <HandshakeOutlinedIcon />,
    listText: "Partners",
    url: AppRoutesEnum.MAIN
  },
  {
    listIcon: <AddCardOutlinedIcon />,
    listText: "Finances",
    url: AppRoutesEnum.MAIN
  },
  {
    listIcon: <AccountCircleOutlinedIcon />,
    listText: "Clients",
    url: AppRoutesEnum.MAIN
  },
]

export const Menu:FC = () => {
	const me = useAuth();
	const avatar = me?.user?.photoURL ?? "";

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("token");
  };

	return (
    <div className="fixed flex flex-column m-0 top-0 bottom-0 w-menu left-0 py-8 px-5 h-12 shadow-lg">
      <div
        className="h-10rem w-10rem border-circle mb-4 surface-300"
      >
        <img
          src={avatar}
          className="h-10rem w-10rem border-circle"
        />
      </div>
      <h3 className="text-xl">
          {me?.user?.displayName ?? me?.user?.email}
      </h3>
      <div className="flex flex-column justify-content-between h-12 align-items-start">
        <ul className="pt-5 pb-8 mb-8 px-0">
          {menu.map((listItem, index) => (
              <li key={index} className="list-none m-0 py-2">
                <Link to={listItem.url} className="no-underline flex gap-1 py-1 text-500">
                  {listItem.listIcon}
                  <span className="text-800">
                    {listItem.listText}
                  </span>
                </Link>
              </li>
          ))}
        </ul>
        <button
          onClick={logOut}
          className="cursor-pointer surface-0 flex gap-1 align-items-center border-1 text-700 py-2 px-4 border-round-lg border-500 outline-none hover:surface-300 ease-in-out"
        >
          <LogoutIcon/>
          Log out
        </button>
      </div>
    </div>
	);
};
