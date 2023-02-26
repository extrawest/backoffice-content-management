import { FC } from "react";
import { StatusTagProps } from "./StatusTag.types";
import { TaskTypeEnum } from "@lib/shared/types";
import { Tag } from "primereact/tag";

export const StatusTag: FC<StatusTagProps> = ({ type }) => {
	const color =
		type === TaskTypeEnum.URGENT
			? "warning"
			: type === TaskTypeEnum.NEW
				? "success"
				: "info";
	return <Tag
		severity={color}
		value={type}
		rounded
	/>;
};
