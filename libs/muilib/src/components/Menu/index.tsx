import { FC } from "react";
import { Avatar, Box, Button, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useAuth } from "../../contexts";
import { logoutSx, menuItemSx, menuListSx, menuStackSx, photoSx, textSx, wrapperSx } from "./Menu.sx";
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
    url: AppRoutesEnum.MAIN
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
    <Box sx={wrapperSx}>
      <Avatar
        src={avatar}
        sx={photoSx}
      />
      <Box>
        <Typography variant="h4">
          {me?.user?.displayName ?? me?.user?.email}
        </Typography>
      </Box>
      <Stack sx={menuStackSx}>
        <List sx={menuListSx}>
          {menu.map((listItem, index) => (
            <Link key={index} to={listItem.url} style={{textDecoration: "auto"}}>
              <ListItem sx={menuItemSx}>
                <ListItemIcon>
                  {listItem.listIcon}
                </ListItemIcon>
                <ListItemText
                  primary={listItem.listText}
                  sx={textSx}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <Button
          onClick={logOut}
          variant={"text"}
          startIcon={<LogoutIcon/>}
          sx={logoutSx}
        >
          Log out
        </Button>
      </Stack>
    </Box>
	);
};
