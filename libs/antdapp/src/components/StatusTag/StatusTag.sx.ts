import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const tagSx:CSSProperties = {
	display: "block",
	padding: "0.5rem 1rem",
	borderRadius: pxToRem(8),
	textTransform: "uppercase"
};
