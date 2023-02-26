import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const footerSx: SxProps<Theme> = {
	py: 2,
	display: "flex",
	justifyContent: "flex-end",
	width: "100%",
	".MuiButton-root": {
		py: 2,
		px: 5,
	},
};

export const wrapperSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
};

export const fileInputSx: CSSProperties = {
	visibility: "hidden",
};

export const imgSx: CSSProperties = {
	width: pxToRem(200),
	height: pxToRem(200),
	display: "block",
	objectFit: "cover",
};

export const imgBoxSx: SxProps<Theme> = {
	width: (theme: Theme) => theme.spacing(300 / 8),
};

export const loaderSx: SxProps<Theme> = {
	display: "flex",
	justifyContent: "center",
};

export const formLabel: SxProps<Theme> = {
	"& > span ": {
		fontWeight: 600,
	},
	"& span span": {
		marginRight: 5,
		color: (theme: Theme) => theme.palette.warning.main,
	},
};
