import { ReactNode } from "react";

export interface ModalProps {
	handleClose: () => void,
	open: boolean,
	children: ReactNode,
	title?: string,
	type?: false | "lg" | "xs" | "sm" | "md" | "xl",
	fullWidth?: boolean,
	withoutPaddings?: boolean
}
