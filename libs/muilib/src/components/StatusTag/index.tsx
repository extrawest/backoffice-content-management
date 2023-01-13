import { FC } from "react";
import { StatusTagProps } from "./StatusTag.types";
import { Typography, useTheme } from "@mui/material";
import { tagSx } from "./StatusTag.sx";
import { TaskTypeEnum } from "@lib/shared/types";

export const StatusTag:FC<StatusTagProps> = ({type}) => {
	const theme = useTheme();

	return (
    <Typography
      component="span"
      sx={{...tagSx,
        backgroundColor: type === TaskTypeEnum.URGENT ? theme.palette.primaryColors[600]
          : type === TaskTypeEnum.NEW ? theme.palette.green[400]
            : theme.palette.greyScale[500],
        color: type === TaskTypeEnum.DEFAULT
          ? theme.palette.common.white
          : theme.palette.greyScale[800]}}
    >
      {type}
    </Typography>
	);
};
