import { SxProps, Theme } from "@mui/material";

export const authRootSx: SxProps<Theme> = {
	bgcolor: (theme: Theme) => theme.palette.secondary.light,
	width: "100%",
	height: "100%",
	minHeight: "100vh",
	py: 8
};
