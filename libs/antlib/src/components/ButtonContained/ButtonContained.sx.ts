import { pxToRem } from "@lib/shared/utils";
import { CSSProperties } from "react";
import { GlobalToken } from "antd/es/theme/interface";

export const buttonSx = (theme:GlobalToken):CSSProperties => ({
	background: `linear-gradient(${theme.colorPrimary}, ${theme["blue-3"]})`,
	borderRadius: pxToRem(50),
	height: pxToRem(52)
});
