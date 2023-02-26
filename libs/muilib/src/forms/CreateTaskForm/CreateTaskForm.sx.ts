import { SxProps, Theme } from "@mui/material";

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
