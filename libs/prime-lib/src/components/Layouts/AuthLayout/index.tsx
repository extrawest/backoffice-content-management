import { FC, PropsWithChildren } from "react";

export const AuthLayout:FC<PropsWithChildren<Record<string, unknown>>> = ({children}) => {
	return (
    <div>
      {children}
    </div>
	);
};
