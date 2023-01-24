import { SxProps, Theme } from "@mui/material";

export const tableSx:SxProps<Theme> = {
	background: (theme: Theme) => theme.palette.background.default,
	minHeight: (theme: Theme) => theme.spacing(600/8),
	"& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
		outline: "none !important",
	},
	"& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
    {
    	outline: "none !important",
    },
	"& .MuiDataGrid-row:hover": {
		backgroundColor: "inherit",
		boxShadow: "0px -1.75px 4px rgba(33, 33, 52, 0.039), 0px 5.75px 10px rgba(33, 33, 52, 0.12)"
	},
	"& .MuiDataGrid-columnHeaderTitleContainer": {
		justifyContent: "space-between",
	},
	"& .MuiDataGrid-cell.ampTableCell:focus": {
		outline: "none"
	},
	"& .MuiDataGrid-cellContent": {
		lineHeight: "1.2"
	},
	"& .hoverableCell button": {
		opacity: 0,
		transition: "0.3s ease",
	},
	"& .MuiDataGrid-row:hover .hoverableCell button": {
		opacity: 1
	},
	"& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainerContent": {
		color: (theme: Theme) => theme.palette.grey[400]
	},
	"& .PrivateSwitchBase-input + .MuiSvgIcon-root": {
		stroke: (theme: Theme) => theme.palette.grey[300]
	},
	"& .MuiDataGrid-columnSeparator": {
		display: "none"
	}
};
