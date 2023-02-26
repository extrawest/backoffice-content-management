import { FC } from "react";
import { rootSx } from "./Modal.sx";
import {
	Modal as AntModal, ModalProps, theme 
} from "antd";

export const Modal: FC<ModalProps> = ({ onCancel, open, children, title }) => {
	const { useToken } = theme;
	const { token } = useToken();

	return (
    <AntModal
      onCancel={onCancel}
      open={open}
      footer={null}
      style={rootSx(token)}
      title={title}
      width={900}
    >
      {children}
    </AntModal>
	);
};
