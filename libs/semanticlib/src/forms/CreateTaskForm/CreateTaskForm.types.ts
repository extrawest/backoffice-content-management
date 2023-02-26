import { BacklogType } from "@lib/shared/types";

export type CreateTaskFormProps = {
	getBacklogData: () => void;
	closeModal: () => void;
	backlog: BacklogType[];
};
