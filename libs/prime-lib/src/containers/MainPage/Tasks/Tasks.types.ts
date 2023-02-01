import { BacklogType, TaskType } from "@lib/shared/types";

export type TasksProps = {
	backlog: BacklogType[],
	tasks: TaskType[],
	getBacklog: () => void,
	getTasks: () => void
};
