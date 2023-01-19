import { FC } from "react";
import { StatusTagProps } from "./StatusTag.types";
import { tagSx } from "./StatusTag.sx";
import { TaskTypeEnum } from "@lib/shared/types";
import { Typography } from "antd";

export const StatusTag: FC<StatusTagProps> = ({ type }) => {

	return (

        <Typography.Text
          // sx={{
          //   ...tagSx,
          //   backgroundColor:
          //     type === TaskTypeEnum.URGENT
          //       ?  getDesignTokens(mode).palette.primaryColors[600]
          //       : type === TaskTypeEnum.NEW
          //         ? getDesignTokens(mode).palette.green[400]
          //         : getDesignTokens(mode).palette.greyScale[500],
          //   color:
          //     type === TaskTypeEnum.DEFAULT
          //       ? theme.palette.common.white
          //       : getDesignTokens(mode).palette.greyScale[800],
          // }}
        >
          {type}
        </Typography.Text>
	);
};
