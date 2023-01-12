import { SxProps, Theme } from "@mui/material";
import { maxAuthWidth } from "../../utils/consts";
import { pxToRem } from "../../utils/helpers";

export const submitBoxSx: SxProps<Theme> = {
	width: pxToRem(186),
	mx: "auto",
	my: 2
};
export const titleSx: SxProps<Theme> = {
	textAlign: "center",
	mb: 4
};
export const wrapperSx: SxProps<Theme> = {
	maxWidth: maxAuthWidth,
	mx: "auto",
	pt: 10
};
