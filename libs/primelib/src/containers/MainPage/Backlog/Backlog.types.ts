import { BacklogType } from "@lib/shared/types";

export type BacklogProps = {
	backlog: BacklogType[];
	getBacklogData: () => void;
};
