import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "./PrivateRoute.types";
import { AppRoutesEnum } from "@lib/shared/types";

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
	isAuthed,
	children
}) => {
	if (!isAuthed) {
		return (
      <Navigate
        to={AppRoutesEnum.LOGIN}
        replace
      />
		);
	}

	return <>{children}</>;
};
