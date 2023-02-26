import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const boxSx: SxProps<Theme> = {
	border: (theme: Theme) =>
		`${theme.spacing(1 / 8)} solid ${theme.palette.grey[400]}`,
	borderRadius: (theme: Theme) => theme.spacing(8 / 8),
	boxSizing: "border-box",
};
export const subTextSx: SxProps<Theme> = {
	fontSize: (theme: Theme) => theme.spacing(14 / 8),
	fontWeight: 600,
	color: (theme: Theme) => theme.palette.grey[500],
};
export const addSx: SxProps<Theme> = {
	fontSize: (theme: Theme) => theme.spacing(14 / 8),
	color: (theme: Theme) => theme.palette.grey[500],
	backgroundColor: (theme: Theme) => theme.palette.grey[200],
	borderRadius: (theme: Theme) => theme.spacing(8 / 8),
	width: (theme: Theme) => theme.spacing(30 / 8),
	height: (theme: Theme) => theme.spacing(30 / 8),
};
export const taskRowSx = (notLast: boolean): SxProps<Theme> => ({
	display: "flex",
	boxSizing: "border-box",
	justifyContent: "space-between",
	alignItems: "center",
	borderBottom: (theme: Theme) =>
		notLast
			? `${theme.spacing(1 / 8)} solid ${theme.palette.grey[400]}`
			: "none",
	width: "100%",
	p: 2,
});
export const headerStackSx: SxProps<Theme> = {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	p: 2,
};
export const linkSx: CSSProperties = {
	textDecoration: "none",
};
