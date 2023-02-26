import { CSSProperties } from "react";
import { pxToRem } from "@lib/shared/utils";

export const logoutSx: CSSProperties = {
	textTransform: "none",
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	padding: "1rem",
};
export const menuItemSx: CSSProperties = {
	paddingLeft: 0,
	paddingRight: 0,
};
export const photoSx: CSSProperties = {
	width: pxToRem(150),
	height: pxToRem(150),
	marginBottom: "1rem",
};
export const textSx: CSSProperties = {
	textDecoration: "none",
	color: "colorText",
};
export const menuStackSx: CSSProperties = {
	justifyContent: "space-around",
	flexDirection: "column",
	alignItems: "flex-start",
	maxHeight: "60vh",
	height: "100%",
};
export const wrapperSx: CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	bottom: 0,
	display: "flex",
	flexDirection: "column",
	width: pxToRem(300),
	boxShadow: "0.5rem 0 4rem 4rem rgba(96,94,94,0.08)",
	margin: 0,
	maxHeight: "100%",
	height: "100%",
	padding: "3rem",
};
