import { BacklogType, TaskType } from "@lib/shared/types";

export type ChartProps = {
	backlog: BacklogType[];
	tasks: TaskType[];
};

export type ChartData = {
	date: string;
	backlog: number;
	tasks: number;
};
