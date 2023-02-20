import { FC } from "react";
import { Label } from "semantic-ui-react";
import { TaskTypeEnum } from "@lib/shared/types";
import { StatusTagProps } from "./StatusTag.types";

export const StatusTag: FC<StatusTagProps> = ({ type }) => {
	const color =
		type === TaskTypeEnum.NEW
			? "green"
			: type === TaskTypeEnum.URGENT
				? "yellow"
				: "grey";

	return <Label color={color}>{type}</Label>;
};
