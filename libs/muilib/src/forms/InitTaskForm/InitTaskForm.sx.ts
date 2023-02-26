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

export const autocompleteSx: SxProps<Theme> = {
	"& .MuiFormControl-root": {
		margin: (theme: Theme) => theme.spacing(0),
	},
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
