import {
	BacklogType, TaskType, TaskTypeEnum 
} from "@lib/shared/types";

export type InitTaskFormProps = {
	backlog: BacklogType[];
	tasks: TaskType[];
	getTasks: () => void;
	getBacklog: () => void;
	closeModal: () => void;
};

export type FormType = {
	name: string;
	type: TaskTypeEnum;
};
