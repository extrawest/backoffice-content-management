import { SxProps, Theme } from "@mui/material";
import { pxToRem } from "@lib/shared/utils";

export const buttonSx = (theme:Theme):SxProps<Theme> => ({
	background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
	borderRadius: pxToRem(38),
	height: pxToRem(52)
});
