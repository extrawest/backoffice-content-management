import { maxAuthWidth } from "../../../../shared/utils/src/lib/consts";
import { CSSProperties } from "react";

export const submitBoxSx: CSSProperties = {
	width: "100%",
  display: "flex",
  justifyContent: "flex-end",
	margin: "1rem auto"
};
export const socialsSx: CSSProperties = {
  display: "flex",
  justifyContent: "center"
}
export const continueSx: CSSProperties = {
  textAlign: "center",
  display: "block",
  margin: "1rem auto",
};
export const titleSx: CSSProperties = {
	textAlign: "center",
	marginBottom: "4rem"
};
export const wrapperSx: CSSProperties = {
	maxWidth: maxAuthWidth,
	marginLeft: "auto",
	marginRight: "auto",
	paddingTop: "5rem"
};
