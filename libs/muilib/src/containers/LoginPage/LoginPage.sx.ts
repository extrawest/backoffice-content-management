import { SxProps, Theme } from "@mui/material";
import { maxAuthWidth } from "../../../../shared/utils/src/lib/consts";
import { pxToRem } from "../../../../shared/utils/src/lib/helpers";

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
  display: "flex",
  flexDirection: "column",
  gap: 2,
	mx: "auto",
	pt: 10
};
