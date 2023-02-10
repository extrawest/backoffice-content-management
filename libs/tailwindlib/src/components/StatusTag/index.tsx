import { FC } from "react";
import { StatusTagProps } from "./StatusTag.types";
import { TaskTypeEnum } from "@lib/shared/types";

export const StatusTag: FC<StatusTagProps> = ({ type }) => {
	const colors = `${type === TaskTypeEnum.DEFAULT ? "text-gray-800" : "text-white"}
           ${type === TaskTypeEnum.NEW ? "bg-green-4" : ""}
           ${type === TaskTypeEnum.URGENT ? "bg-yellow-6" : ""}
           ${type === TaskTypeEnum.DEFAULT ? "bg-gray-400" : ""}`;

	return (
        <span className={`uppercase text-14px ${colors} py-1 px-2 rounded-1`}>
          {type}
        </span>
	);
};
