import { FC } from "react";
import { StatusTagProps } from "./StatusTag.types";
import { Typography, useTheme } from "@mui/material";
import { tagSx } from "./StatusTag.sx";
import { TaskTypeEnum } from "@lib/shared/types";
import { getDesignTokens } from "../../theme";
import { ThemeContext } from "../../../../shared/context/themeContext";

export const StatusTag: FC<StatusTagProps> = ({ type }) => {
	const theme = useTheme();

	return (
    <ThemeContext.Consumer>
      {({mode}) => (
        <Typography
          component="span"
          sx={{
            ...tagSx,
            backgroundColor:
              type === TaskTypeEnum.URGENT
                ?  getDesignTokens(mode).palette.primaryColors[600]
                : type === TaskTypeEnum.NEW
                  ? getDesignTokens(mode).palette.green[400]
                  : getDesignTokens(mode).palette.greyScale[500],
            color:
              type === TaskTypeEnum.DEFAULT
                ? getDesignTokens(mode).palette.greyScale[800]
                :  theme.palette.common.white,
          }}
        >
          {type}
        </Typography>
      )}
    </ThemeContext.Consumer>
	);
};
