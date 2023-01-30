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
      className={`${open ? "fixed" : "hidden"} -top-1 -right-1 -bottom-1 -left-1`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed -top-1 -right-1 -bottom-1 -left-1 bg-gray-500 opacity-40"
        role="dialog"
        aria-modal="true"
        onClick={handleClose}
      >
      </div>
      <div
        className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-start overflow-y-auto"
      >
        <div
          className="align-middle h-full my-auto bg-white rounded-1 text-left overflow-hidden shadow-xl p-4 min-w-modal"
        >
          <div className="flex justify-between">
            <h3 className="task-title semi-bold">
              {title}
            </h3>
            <div
              className="close-btn cursor-pointer"
              role="button"
              onClick={handleClose}
            >
              <Close/>
            </div>
          </div>
          <div className="mx-auto h-full">{children}</div>
        </div>
      </div>
    </div>
	);
};
