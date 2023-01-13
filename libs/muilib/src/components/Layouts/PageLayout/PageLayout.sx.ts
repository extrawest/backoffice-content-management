import { SxProps, Theme } from "@mui/material";

export const contentSx: SxProps<Theme> = {
	width: "100%",
	py: 10,
	pl: 5,
	pr: 10
};
export const menuBoxSx: SxProps<Theme> = {
	width: (theme: Theme) => theme.spacing(462/8),
};
export const pageBoxSx: SxProps<Theme> = {
	display: "flex",
	width: "100%"
};
