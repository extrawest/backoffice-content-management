import { CSSProperties } from "react";
import { GlobalToken } from "antd/es/theme/interface";
import { pxToRem } from "@lib/shared/utils";

export const rootSx = (theme: GlobalToken): CSSProperties => ({
	boxShadow: `0  ${pxToRem(10)}  ${pxToRem(30)} rgba(0, 0, 0, 0.05)`,
	borderRadius: theme.borderRadius,
	backgroundColor: "transparent",
});
