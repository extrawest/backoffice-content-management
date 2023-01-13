import { TaskTypeEnum } from "../enums";

export interface BacklogType {
	name: string;
	id: string;
}

export interface TaskType {
	name: string;
	id: string;
	type: TaskTypeEnum;
}

export type BacklogResponse = {
	tasks: BacklogType[]
};

export type TasksResponse = {
	tasks: TaskType[]
};
