import { ReactNode } from "react";

export type CellType = {
	title: string,
	component: ReactNode
};

export type RowType = Record<string, CellType>;

export interface TableProps {
	rows: RowType[],
}
