import { FC, PropsWithChildren } from "react";
import {
	Button, ButtonProps, useTheme
} from "@mui/material";
import { buttonSx } from "./ButtonContained.sx";

export const ButtonContained:FC<PropsWithChildren<ButtonProps>> = (props) => {
	const theme = useTheme();

	return (
    <Button
      variant="contained"
      sx={buttonSx(theme)}
      {...props}
    >
      {props.children}
    </Button>
	);
};
