import {
	FC, useState, useEffect, useRef
} from "react";
import {
	Delete, Edit, MoreVert
} from "@mui/icons-material";
import { RowMenuProps } from "./RowMenu.types";
import { Modal, EditTicketForm } from "@primelib";

export const RowMenu:FC<RowMenuProps> = ({
	onDelete,
	tickets,
	ticket,
	getTickets
}) => {
	const [open, setOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const node = useRef<HTMLDivElement>(null);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	const handleShowMenu = (status: boolean) => () => {
		setOpen(status);
	};

	const handleClickOutside = (e: any) => {
		if (node?.current?.contains(e.target as Node)) {
			return;
		}
		setOpen(false);
	};

	useEffect(
		() => {
			if (open) {
				document.addEventListener(
					"mousedown",
					handleClickOutside
				);
			} else {
				document.removeEventListener(
					"mousedown",
					handleClickOutside
				);
			}
		},
		[open]
	);

	const onEdit = () => {
		handleShowModal(true)();
		handleShowMenu(false)();
	};

	const handleDelete = () => {
		onDelete();
		handleShowMenu(false)();
	};

	return (
		<>
      <div className="relative">
        <button
          className="border-none outline-none transparent cursor-pointer"
          onClick={handleShowMenu(true)}
        >
          <MoreVert/>
        </button>
        <div
          ref={node}
          className={`${open ? "absolute" : "hidden"} top-2 right-4 p-2 surface-0 border-round-xl z-5 shadow-lg w-150`}
        >
          <ul className="m-0 p-0">
            <li className="hover:surface-300 list-none m-0 p-0">
              <button
                className="w-full p-1 border-none outline-none transparent cursor-pointer"
                onClick={onEdit}
              >
                <Edit/>
              </button>
            </li>
            <li className="hover:surface-300 list-none m-0 p-0">
              <button
                className="w-full p-1 border-none outline-none transparent cursor-pointer"
                onClick={handleDelete}
              >
                <Delete/>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        handleClose={handleShowModal(false)}
        open={showModal}
        title="Update ticket"
      >
        <EditTicketForm
          init={ticket}
          tickets={tickets}
          closeModal={handleShowModal(false)}
          getTickets={getTickets}
        />
      </Modal>
		</>
	);
};
