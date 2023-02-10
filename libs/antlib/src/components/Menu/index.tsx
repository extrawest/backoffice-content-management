import { FC } from "react";
import {
	logoutSx, menuItemSx, menuStackSx, photoSx, textSx, wrapperSx
} from "./Menu.sx";
import { signOut } from "firebase/auth";
import { auth } from "@libs/shared/firebaseconfig";
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
import {
	Avatar, Button, Col, Layout, List, Row, Space, Typography
} from "antd";

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
];

export const Menu:FC = () => {
	const me = useAuth();
	const avatar = me?.user?.photoURL ?? "";

	const logOut = () => {
		signOut(auth);
		localStorage.removeItem("token");
	};

	return (
    <Layout.Sider style={wrapperSx}>
      <Avatar
        src={avatar}
        style={photoSx}
      />
        <Typography.Title level={2}>
          {me?.user?.displayName ?? me?.user?.email}
        </Typography.Title>
      <Space style={menuStackSx}>
        <List
          dataSource={menu}
          renderItem={(item) => (
            <List.Item style={menuItemSx}>
              <Link to={item.url}>
                <Row gutter={10}>
                  <Col>
                    {item.listIcon}
                  </Col>
                  <Col>
                    <Typography.Text style={textSx}>
                      {item.listText}
                    </Typography.Text>
                  </Col>
                </Row>
              </Link>
            </List.Item>
          )}
        />
        <Button
          onClick={logOut}
          icon={<LogoutIcon/>}
          style={logoutSx}
        >
            Log out
        </Button>
      </Space>
    </Layout.Sider>
	);
};
