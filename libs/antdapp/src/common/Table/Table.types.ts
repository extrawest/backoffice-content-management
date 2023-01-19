import {
	GridRowsProp, GridColDef, GridSortModel, GridCallbackDetails, DataGridProps
} from "@mui/x-data-grid";

export interface TableProps extends DataGridProps {
	rows: GridRowsProp,
	columns: GridColDef[],
	handleSort?: (model: GridSortModel, details: GridCallbackDetails<any>) => void,
	rowsPerPageOptions?: number[],
	hideFooter?: boolean,
}
