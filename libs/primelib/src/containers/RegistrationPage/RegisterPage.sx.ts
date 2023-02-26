import { SxProps, Theme } from "@mui/material";
import { maxAuthWidth } from "@lib/shared/utils";

export const wrapperSx: SxProps<Theme> = {
	maxWidth: maxAuthWidth,
	mx: "auto",
	pt: 10,
};
