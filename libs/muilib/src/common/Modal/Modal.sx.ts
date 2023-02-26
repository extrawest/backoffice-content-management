import { SxProps, Theme } from "@mui/material";

export const rootSx: SxProps<Theme> = {
	boxShadow: (theme: Theme) =>
		`0  ${theme.spacing(10 / 8)}  ${theme.spacing(30 / 8)} rgba(0, 0, 0, 0.05)`,
	borderRadius: (theme: Theme) => theme.spacing(8 / 8),
	backgroundColor: "transparent",
	"& .MuiPaper-root": {
		background: (theme: Theme) => theme.palette.background.default,
	},
};
export const headerSx: SxProps<Theme> = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	paddingRight: (theme: Theme) => theme.spacing(10 / 8),
	background: (theme: Theme) => theme.palette.grey[50],
	borderBottomWidth: (theme: Theme) => theme.spacing(1 / 8),
	borderBottomStyle: "solid",
	borderBottomColor: (theme: Theme) => theme.palette.grey[400],
};

export const contentSx = (withoutPaddings: boolean): SxProps<Theme> => ({
	padding: withoutPaddings ? 0 : "auto",
});
