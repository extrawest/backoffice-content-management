import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { Menu } from "../../Menu";
import {
	contentSx, menuBoxSx, pageBoxSx 
} from "./PageLayout.sx";

export const PageLayout: FC<PropsWithChildren<Record<string, unknown>>> = ({
	children,
}) => {
	return (
    <Box sx={pageBoxSx}>
      <Box sx={menuBoxSx}>
        <Menu />
      </Box>
      <Box sx={contentSx}>{children}</Box>
    </Box>
	);
};
