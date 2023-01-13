import { BacklogType } from "@lib/shared/types";

export type TasksProps = {
	backlog: BacklogType[],
	getBacklog: () => void
};
