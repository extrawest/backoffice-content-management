import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const footerSx:CSSProperties = {
	padding: "2rem 0",
	display: "flex",
	justifyContent: "flex-end",
	width: "100%"
};

export const autocompleteSx: SxProps<Theme> = {
	"& .MuiFormControl-root": {
		margin: (theme: Theme) => theme.spacing(0)
	},
};

export const formLabel: SxProps<Theme> = {
	"& > span " :{
		fontWeight: 600
	},
	"& span span": {
		marginRight: 5,
		color:  (theme: Theme) => theme.palette.warning.main
	},
};
