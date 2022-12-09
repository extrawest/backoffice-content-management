import { lazy } from "react";
import { AppRoutesEnum, LayoutEnum, RouteType } from "@lib/shared/types";

const Main = lazy(() => import("../pages/Main"));

export const privateRoutes: Array<RouteType> = [
  {
    element: <Main />,
    path: AppRoutesEnum.MAIN,
    isAuth: true,
    layout: LayoutEnum.DEFAULT
  }
];
