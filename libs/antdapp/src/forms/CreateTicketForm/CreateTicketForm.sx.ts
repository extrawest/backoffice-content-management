import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const footerSx:CSSProperties = {
	padding: "1rem 0",
	display: "flex",
	justifyContent: "flex-end",
	width: "100%"
};

export const submitBtnSx:CSSProperties = {
	padding: "0 2rem",
	height: pxToRem(50)
};

export const wrapperSx:CSSProperties = {
	alignItems: "center"
};

export const fileInputSx:CSSProperties = {
	visibility: "hidden"
};

export const imgSx:CSSProperties = {
	width: pxToRem(200),
	height: pxToRem(200),
	display: "block",
	objectFit: "cover"
};

export const imgBoxSx:CSSProperties = {
	width: pxToRem(200)
};

export const inputSx:CSSProperties = {
	height: pxToRem(50)
};
