import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const photoSx: CSSProperties = {
	width: pxToRem(50),
	height: pxToRem(50),
};

export const nameSx: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "1rem",
};

export const titleSx: CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};
