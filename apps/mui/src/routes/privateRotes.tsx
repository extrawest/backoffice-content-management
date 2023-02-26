import { lazy } from "react";
import {
	AppRoutesEnum, LayoutEnum, RouteType
} from "@lib/shared/types";

const Main = lazy(() => import("../pages/Main"));
const Team = lazy(() => import("../pages/Team"));
const Offers = lazy(() => import("../pages/Offers"));

export const privateRoutes: Array<RouteType> = [
	{
		element: <Main />,
		path: AppRoutesEnum.MAIN,
		isAuth: true,
		layout: LayoutEnum.DEFAULT,
	},
	{
		element: <Team />,
		path: AppRoutesEnum.TEAM,
		isAuth: true,
		layout: LayoutEnum.DEFAULT,
	},
	{
		element: <Offers />,
		path: AppRoutesEnum.OFFERS,
		isAuth: true,
		layout: LayoutEnum.DEFAULT,
	},
];
