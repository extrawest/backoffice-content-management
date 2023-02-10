import { SxProps, Theme } from "@mui/material";

export const boxSx:SxProps<Theme> = {
	mb: 3,
	border: (theme: Theme) => `${theme.spacing(1/8)} solid ${theme.palette.grey[400]}`,
	borderRadius: (theme: Theme) => theme.spacing(8/8)
};
export const dataSx:SxProps<Theme> = {
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	py: 3,
	borderBottom: (theme: Theme) => `${theme.spacing(1/8)} solid ${theme.palette.grey[400]}`
};
export const dataTitleSx:SxProps<Theme> = {
	fontSize: (theme: Theme) => theme.spacing(16/8),
	fontWeight: 600,
	color: (theme: Theme) => theme.palette.grey[500]
};
export const dataValueSx:SxProps<Theme> = {
	fontSize: (theme: Theme) => theme.spacing(24/8),
	fontWeight: 700,
	color: (theme: Theme) => theme.palette.common.black
};
export const gridDataSx:SxProps<Theme> = {
	py: 2,
	borderLeft: (theme: Theme) => `${theme.spacing(1/8)} solid ${theme.palette.grey[400]}`
};
