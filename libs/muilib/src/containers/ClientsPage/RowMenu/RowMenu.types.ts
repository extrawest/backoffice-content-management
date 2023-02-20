import { TicketType } from "@lib/shared/types";

export type RowMenuProps = {
	onDelete: () => void;
	ticket: TicketType;
	tickets: TicketType[];
	getTickets: () => void;
};
