import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const contentSx: CSSProperties = {
	width: "100%",
	padding: "5rem 2rem 1rem",
};
export const menuBoxSx: CSSProperties = {
	width: pxToRem(462)
};
export const pageBoxSx: CSSProperties = {
	display: "flex",
	width: "100%"
};
