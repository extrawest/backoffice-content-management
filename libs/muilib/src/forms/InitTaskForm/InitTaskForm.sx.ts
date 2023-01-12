import { SxProps, Theme } from "@mui/material";

export const footerSx:SxProps<Theme> = {
	py: 2,
	display: "flex",
	justifyContent: "flex-end",
	width: "100%",
	".MuiButton-root": {
		py: 2,
		px: 5
	}
};

export const placeholderWrapperSx: SxProps = {
	position: "relative",
	width: "100%"
};

export const autocompleteSx: SxProps<Theme> = {
	"& .MuiFormControl-root": {
		margin: (theme: Theme) => theme.spacing(0)
	},
};

export const descriptionSx: SxProps<Theme> = {
	fontSize: "0.75rem",
	color: (theme: Theme) => theme.palette.grey[600],
	py: 1
};

export const optionStack: SxProps<Theme> = {
	flexDirection: "row",
	alignItems: "center",
	gap: 2
};

export const formLabel: SxProps<Theme> = {
	"& > span " :{
		fontWeight: 600
	},
	"& span span": {
		marginRight: 5,
		color:  (theme: Theme) => theme.palette.warning.main
	},
}
