import { FC } from "react";
import { Typography } from "@mui/material";
import { Offers } from "./Offers";

export const OffersPage: FC = () => {
	return (
		<>
      <Typography variant="h2">Offers</Typography>
      <Offers />
		</>
	);
};
