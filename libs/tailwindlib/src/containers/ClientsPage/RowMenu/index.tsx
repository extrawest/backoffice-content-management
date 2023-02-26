import {
	FC, useState, useEffect, useRef
} from "react";
import {
	Delete, Edit, MoreVert
} from "@mui/icons-material";
import { RowMenuProps } from "./RowMenu.types";
import { Modal } from "../../../common";
import { EditTicketForm } from "../../../forms";

export const RowMenu: FC<RowMenuProps> = ({
	onDelete,
	tickets,
	ticket,
	getTickets,
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

	const handleClickOutside = (e: Event) => {
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
			return () => {
				document.removeEventListener(
					"mousedown",
					handleClickOutside
				);
			};
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
		<div className="relative">
			<button onClick={handleShowMenu(true)}>
				<MoreVert />
			</button>
			<div
				ref={node}
				className={`${open ? "absolute" : "hidden"
					} top-2 -left-4 bg-white rounded-1 z-10 shadow-xl w-150`}
			>
				<ul>
					<li className="hover:bg-gray-50">
						<button
							className="w-full p-1"
							onClick={onEdit}
						>
							<Edit />
						</button>
					</li>
					<li className="hover:bg-gray-50">
						<button
							className="w-full p-1"
							onClick={handleDelete}
						>
							<Delete />
						</button>
					</li>
				</ul>
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
		</div>
	);
};
