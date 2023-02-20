import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const footerSx: CSSProperties = {
	padding: 0,
	display: "flex",
	justifyContent: "flex-end",
	width: "100%",
};

export const inputSx: CSSProperties = {
	height: pxToRem(50),
};

export const submitBtnSx: CSSProperties = {
	padding: "0 2rem",
	height: pxToRem(50),
};
