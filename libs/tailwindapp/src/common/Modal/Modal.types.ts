import { ReactNode } from "react";

export interface ModalProps {
	handleClose: () => void,
	open: boolean,
	children: ReactNode,
	title?: string
}
