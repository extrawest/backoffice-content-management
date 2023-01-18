import { SxProps, Theme } from "@mui/material";

export const photoSx: SxProps<Theme> = {
	width: (theme: Theme) => theme.spacing(50/8),
	height: (theme: Theme) => theme.spacing(50/8),
};

export const nameSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	gap: 2
};

export const titleSx:SxProps<Theme> = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
};
