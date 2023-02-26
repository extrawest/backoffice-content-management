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
import {
	Button,
	Container,
	Grid,
	Header,
	Image,
	List,
} from "semantic-ui-react";
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
    <Container className="menu-section">
      <Image
        size="small"
        centered
        src={avatar}
        avatar
      />
      <Header
        as="h3"
        textAlign="center"
      >
        {me?.user?.displayName ?? me?.user?.email}
      </Header>
      <Container className="menu-list flex flex-col justify-between h-full items-start">
        <List className="menu-padding">
          {menu.map((
            listItem, index
          ) => (
            <List.Item key={index}>
              <Link
                to={listItem.url}
                className="no-underline flex gap-1 py-1 text-gray-500"
              >
                <Grid padded>
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column>
                      <List.Icon color="black">{listItem.listIcon}</List.Icon>
                    </Grid.Column>
                    <Grid.Column>
                      <List.Content>
                        <Header
                          as="h5"
                          color="black"
                        >
                          {listItem.listText}
                        </Header>
                      </List.Content>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Link>
            </List.Item>
          ))}
        </List>
        <Button
          onClick={logOut}
          size="small"
          basic
          compact
        >
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={2}>
                <LogoutIcon />
              </Grid.Column>
              <Grid.Column width={12}>Log out</Grid.Column>
            </Grid.Row>
          </Grid>
        </Button>
      </Container>
    </Container>
	);
};
