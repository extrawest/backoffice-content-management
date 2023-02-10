import {
	TaskTypeEnum, TicketType
} from "@lib/shared/types";

export type EditTicketFormProps = {
	tickets: TicketType[],
	closeModal: () => void,
	getTickets: () => void,
	init: TicketType
};

export type FormValueProps = {
	task: string,
	firstName: string,
	lastName: string,
	status: TaskTypeEnum,
	image: string
};
