import { TaskType, TicketType } from "@lib/shared/types";

export type CreateTicketFormProps = {
	tasks: TaskType[],
	tickets: TicketType[],
	getTasks: () => void,
	closeModal: () => void,
	getTickets: () => void
};

export type FormValueProps = {
	task: string,
	firstName: string,
	lastName: string
};

export type OptionType = {
	value: string,
	label: string,
	key: number
};
