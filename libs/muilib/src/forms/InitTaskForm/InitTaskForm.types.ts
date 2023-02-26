import { BacklogType, TaskType } from "@lib/shared/types";

export type InitTaskFormProps = {
	backlog: BacklogType[];
	tasks: TaskType[];
	getTasks: () => void;
	getBacklog: () => void;
	closeModal: () => void;
};
