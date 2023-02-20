import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

export const AuthLayout: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children,
}) => {
	return <Box>{children}</Box>;
};
