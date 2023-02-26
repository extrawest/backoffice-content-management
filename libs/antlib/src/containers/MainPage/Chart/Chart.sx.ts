import { CSSProperties } from "react";
import { GlobalToken } from "antd/es/theme/interface";
import { pxToRem } from "@lib/shared/utils";

export const boxSx = (theme: GlobalToken): CSSProperties => ({
	marginBottom: "2rem",
	border: `${pxToRem(1)} solid ${theme.colorBorder}`,
	borderRadius: theme.borderRadius,
});
export const dataSx = (theme: GlobalToken): CSSProperties => ({
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	padding: "2rem 0",
	borderBottom: `${pxToRem(1)} solid ${theme.colorBorder}`,
});
export const dataTitleSx = (theme: GlobalToken): CSSProperties => ({
	fontSize: theme.fontSizeLG,
	fontWeight: 600,
	color: theme.colorBgSpotlight,
});
export const dataValueSx = (theme: GlobalToken): CSSProperties => ({
	fontSize: theme.fontSizeHeading3,
	fontWeight: 700,
	color: theme.colorText,
});
export const gridDataSx = (theme: GlobalToken): CSSProperties => ({
	padding: "2rem 0",
	borderLeft: `${pxToRem(1)} solid ${theme.colorBorder}`,
});
