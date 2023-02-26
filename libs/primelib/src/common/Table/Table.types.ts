import { ReactNode } from "react";

export type RowType = {
	title: string;
	id: string;
	items: ReactNode[];
};

export interface TableProps {
	rows: RowType[];
}
