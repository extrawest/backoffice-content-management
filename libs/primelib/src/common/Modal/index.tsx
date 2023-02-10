import { FC } from "react";
import { ModalProps } from "./Modal.types";
import { Close } from "@mui/icons-material";

export const Modal:FC<ModalProps> = ({
	handleClose,
	open,
	children,
	title
}) => {
	return (
    <div
      className={`${open ? "fixed" : "hidden"} top-0 right-0 bottom-0 left-0 z-5`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed top-0 right-0 bottom-0 left-0 surface-700 opacity-40"
        role="dialog"
        aria-modal="true"
        onClick={handleClose}
      >
      </div>
      <div
        className="fixed left-50 translate-50 top-50 flex justify-center items-start overflow-y-auto"
      >
        <div
          className="align-items-center h-12 my-auto surface-0 border-round-md text-left overflow-hidden p-4 min-w-modal"
        >
          <div className="flex justify-content-between">
            <h3 className="text-xl semi-bold m-0">
              {title}
            </h3>
            <div
              className="cursor-pointer"
              role="button"
              onClick={handleClose}
            >
              <Close/>
            </div>
          </div>
          <div className="mx-auto h-12">{children}</div>
        </div>
      </div>
    </div>
	);
};
