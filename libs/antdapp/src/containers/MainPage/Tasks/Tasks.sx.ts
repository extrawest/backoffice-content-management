import { CSSProperties } from "react";
import { GlobalToken } from "antd/lib/theme/interface";
import { pxToRem } from "@lib/shared/utils";

export const boxSx = (theme: GlobalToken): CSSProperties => ({
	padding: theme.paddingSM,
	border: `${pxToRem(1)} solid ${theme.colorBorder}`,
	borderRadius: theme.borderRadius
});

export const subTextSx= (theme: GlobalToken): CSSProperties => ({
	fontSize: theme.fontSize,
	fontWeight: 600,
	color: theme.colorInfo
});

export const addSx = (theme: GlobalToken): CSSProperties => ({
	fontSize: theme.fontSize,
	color: theme.colorInfo,
	width: pxToRem(30),
	height: pxToRem(30)
});

export const taskRowSx = (
	notLast: boolean, theme: GlobalToken
):CSSProperties => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	borderBottom: notLast ?
		`${pxToRem(1)} solid ${theme.colorBorder}` :
		"none",
	width: "100%",
	padding: "1rem 0"
});

export const headerStackSx:CSSProperties = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between"
};
