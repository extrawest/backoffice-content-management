import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { AppRouteEnum } from "../types/paths";
import { PrivateRouteProps } from "./PrivateRoute.types";

export const PublicRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
	children,
	denyShowLoginPage
}) => {
	const isLoggedIn = true;

	if (isLoggedIn  && denyShowLoginPage) {
		return (
			<Navigate
				to={{
					pathname: AppRouteEnum.DASHBOARD,
				}}
			/>
		);
	}

	return (
		<>
			{children}
		</>
	);
};

export default PublicRoute;
