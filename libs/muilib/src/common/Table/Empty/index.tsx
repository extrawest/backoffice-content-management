import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { wrapperSx } from "./Empty.sx";

export const Empty:FC = () => {
	return (
    <Box sx={wrapperSx}>
      <Typography variant="h3" style={{textAlign: "center"}}>
        No data...
      </Typography>
    </Box>
	);
};
