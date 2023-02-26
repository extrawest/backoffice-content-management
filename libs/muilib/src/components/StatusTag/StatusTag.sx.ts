import { SxProps, Theme } from "@mui/material";

export const tagSx: SxProps<Theme> = {
	py: 1,
	px: 2,
	borderRadius: (theme: Theme) => theme.spacing(8 / 8),
	textTransform: "uppercase",
};
