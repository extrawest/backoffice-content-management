import { SxProps, Theme } from "@mui/material";

export const logoutSx: SxProps<Theme> = {
	textTransform: "none",
};
export const menuListSx: SxProps<Theme> = {
	pt: 5,
	pb: 10,
	border: "none"
};
export const menuItemSx: SxProps<Theme> = {
	px: 0
};
export const photoSx: SxProps<Theme> = {
	width: (theme: Theme) => theme.spacing(150/8),
	height: (theme: Theme) => theme.spacing(150/8),
	mb: 3
};
export const textSx: SxProps<Theme> = {
	textDecoration: "none",
	color: (theme: Theme) => theme.palette.common.black
};
export const menuStackSx: SxProps<Theme> = {
	justifyContent: "space-between",
	maxHeight: "100%",
	height: "100%",
	alignItems: "flex-start"
};
export const wrapperSx: SxProps<Theme> = {
	position: "fixed",
	top: 0,
	left: 0,
	bottom: 0,
	display: "flex",
	flexDirection: "column",
	width: (theme: Theme) => theme.spacing(362/8),
	boxShadow: (theme: Theme) => `${theme.spacing(4/8)} 0 ${theme.spacing(36/8)} ${theme.spacing(36/8)} rgba(96,94,94,0.08)`,
	m: 0,
	minHeight: "100vh",
	height: "100%",
	py: 10,
	pl: 10,
	pr: 5
};
