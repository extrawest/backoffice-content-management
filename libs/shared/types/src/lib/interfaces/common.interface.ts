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

export interface StatisticType {
	date: string;
	backlog: number;
	tasks: number;
}

export type StatisticResponse = {
	data: StatisticType[];
};

export interface TicketType {
	id: string;
	task: string;
	firstName: string;
	lastName: string;
	status: TaskTypeEnum;
	image?: string;
}

export type OptionType = {
	value: string;
	label: string;
	key: number;
};

export type OfferType = {
	userId: string;
	title: string;
	description: string;
};

export type OfferTypeResponse = {
	data: OfferType[];
};
