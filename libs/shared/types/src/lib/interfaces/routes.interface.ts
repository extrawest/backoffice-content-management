import { ReactNode } from "react";

export enum AppRoutesEnum {
	MAIN = "/",
	REGISTRATION = "/registration",
	LOGIN = "/login"
}

export enum LayoutEnum {
	DEFAULT = "default",
	AUTH = "auth"
}

export interface RouteType {
	element: ReactNode;
	path: AppRoutesEnum;
	isAuth: boolean;
	layout: LayoutEnum;
}
