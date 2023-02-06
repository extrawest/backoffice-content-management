import { lazy } from "react";
import {
	AppRoutesEnum, LayoutEnum, RouteType
} from "@lib/shared/types";

const Login = lazy(() => import("../pages/Login"));
const Registration = lazy(() => import("../pages/Registration"));

export const commonRoutes: Array<RouteType> = [
	{
		element: <Login />,
		path: AppRoutesEnum.LOGIN,
		isAuth: false,
		layout: LayoutEnum.AUTH,
	},
	{
		element: <Registration />,
		path: AppRoutesEnum.REGISTRATION,
		isAuth: false,
		layout: LayoutEnum.AUTH,
	}
];
