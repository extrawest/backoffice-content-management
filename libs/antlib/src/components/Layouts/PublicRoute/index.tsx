import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { PublicRouteProps } from "./PublicRoute.types";
import { AppRoutesEnum } from "@lib/shared/types";

export const PublicRoute: FC<PropsWithChildren<PublicRouteProps>> = ({
	isAuthed,
	children
}) => {
	if (isAuthed) {
		return (
      <Navigate
        to={AppRoutesEnum.MAIN}
        replace
      />
		);
	}

	return <>{children}</>;
};
