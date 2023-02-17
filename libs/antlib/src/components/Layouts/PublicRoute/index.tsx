import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppRoutesEnum } from "@lib/shared/types";
import { auth } from "@libs/shared/firebaseconfig";

export const PublicRoute: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children
}) => {
	const location = useLocation();
	const [user, loading] = useAuthState(auth);

	if (user && !loading) {
		return (
      <Navigate
        to={AppRoutesEnum.MAIN}
        state={{ from: location }}
        replace
      />
		);
	}

	return (
		<>{!loading && children}</>
	);
};
