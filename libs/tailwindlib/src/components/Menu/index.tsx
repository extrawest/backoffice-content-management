import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@lib/shared";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { AppRoutesEnum } from "@lib/shared/types";
import { useAuth } from "@lib/shared";

const menu = [
	{
		listIcon: <InfoOutlinedIcon />,
		listText: "Dashboard",
		url: AppRoutesEnum.MAIN,
	},
	{
		listIcon: <PeopleOutlineOutlinedIcon />,
		listText: "Team",
		url: AppRoutesEnum.TEAM,
	},
	{
		listIcon: <PercentOutlinedIcon />,
		listText: "Offers",
		url: AppRoutesEnum.OFFERS,
	},
	{
		listIcon: <HandshakeOutlinedIcon />,
		listText: "Partners",
		url: AppRoutesEnum.MAIN,
	},
	{
		listIcon: <AddCardOutlinedIcon />,
		listText: "Finances",
		url: AppRoutesEnum.MAIN,
	},
	{
		listIcon: <AccountCircleOutlinedIcon />,
		listText: "Clients",
		url: AppRoutesEnum.MAIN,
	},
];

export const Menu: FC = () => {
	const me = useAuth();
	const avatar = me?.user?.photoURL ?? "";

	const logOut = () => {
		signOut(auth);
		localStorage.removeItem("token");
	};

	return (
		<div className="fixed flex flex-col m-0 py-10 px-10 h-full shadow-lg">
			<img
				src={avatar}
				className="h-150 w-150 rounded-full mb-4"
				alt=""
			/>
			<h3 className="header-section text-20px">
				{me?.user?.displayName ?? me?.user?.email}
			</h3>
			<div className="flex flex-col justify-between h-full items-start">
				<ul className="pt-5 pb-10">
					{menu.map((
						listItem, index
					) => (
						<li key={index}>
							<Link
								to={listItem.url}
								className="no-underline flex gap-1 py-1 text-gray-500"
							>
								{listItem.listIcon}
								<span className="text-gray-800">{listItem.listText}</span>
							</Link>
						</li>
					))}
				</ul>
				<button
					onClick={logOut}
					className="flex gap-1 items-center border text-gray-700 py-1 px-2 rounded-1 border-gray-500 outline-0 hover:bg-gray-100 ease-in-out"
				>
					<LogoutIcon />
					Log out
				</button>
			</div>
		</div>
	);
};
