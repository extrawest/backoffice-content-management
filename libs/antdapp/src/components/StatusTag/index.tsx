import { FC } from "react";
import { TaskTypeEnum } from "@lib/shared/types";
import { Typography } from "antd";
import { StatusTagProps } from "./StatusTag.types";
import { tagSx } from "./StatusTag.sx";
import { useToken } from "antd/es/theme/internal";

export const StatusTag: FC<StatusTagProps> = ({ type }) => {
	const [theme, token] = useToken();

	return (
        <Typography.Text
          style={{
            ...tagSx,
            backgroundColor:
              type === TaskTypeEnum.URGENT
                ?  token["yellow-6"]
                : type === TaskTypeEnum.NEW
                  ? token["green-4"]
                  : token["colorBorder"],
            color:
              type === TaskTypeEnum.DEFAULT
                ? token["colorText"]
                : token["colorWhite"],
          }}
        >
          {type}
        </Typography.Text>
	);
};
