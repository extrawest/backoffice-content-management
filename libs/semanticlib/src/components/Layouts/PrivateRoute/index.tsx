import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/shared";
import { AppRoutesEnum } from "@lib/shared/types";

export const PrivateRoute: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children,
}) => {
	const location = useLocation();
	const [user, loading] = useAuthState(auth);

	if (!user && !loading) {
		return (
			<Navigate
				to={AppRoutesEnum.LOGIN}
				state={{ from: location }}
				replace
			/>
		);
	}

	return <>{!loading && children}</>;
};

export default PrivateRoute;
