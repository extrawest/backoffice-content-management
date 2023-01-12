import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Table } from "../../common";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const ClientsPage:FC = () => {
	const rows: GridRowsProp = [
		{ id: 1, col1: "Hello", col2: "World", col3: "23.12.22", col4: "high", col5: "" },
		{ id: 2, col1: "DataGridPro", col2: "is Awesome" },
		{ id: 3, col1: "MUI", col2: "is Amazing" },
	];

	const columns: GridColDef[] = [
		{ field: "col1", headerName: "Ticket details", width: 150 },
		{ field: "col2", headerName: "Customer name", width: 150 },
		{ field: "col3", headerName: "Date", width: 150 },
		{ field: "col4", headerName: "Priority", width: 150 },
		{ field: "col5", headerName: "", width: 150 },
	];

	return (
		<>
      <Typography variant="h2">
        Clients
      </Typography>
      <Box>
        <Typography variant="h3">
          All tickets
        </Typography>
        <Table
          rows={rows}
          columns={columns}
        />
      </Box>
		</>
	);
};
