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

export interface StatisticType {
	date: any,
	backlog: number,
	tasks: number
}

export type StatisticResponse = {
	data: StatisticType[]
};

export interface TicketType {
	id: string,
	task: string,
	firstName: string,
	lastName: string,
	status: TaskTypeEnum,
	image?: string,
}

export type TicketsResponse = {
	data: TicketType[]
};
