import { FC } from "react";
import {DataGrid} from "@mui/x-data-grid";
import { Empty } from "./Empty";
import { TableProps } from "./Table.types";
import { tableSx } from "./Table.sx";

export const Table: FC<TableProps> = ({ rows, columns, handleSort, ...rest}) => {
	return (
    <DataGrid
      disableSelectionOnClick
      rows={rows}
      columns={columns}
      sortingMode={handleSort ? "server" : "client"}
      onSortModelChange={handleSort}
      disableColumnMenu
      components={{
        "NoRowsOverlay": Empty
      }}
      {...rest}
      sx={tableSx}
    />
	);
};
