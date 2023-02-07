import {
	FC, useState, useEffect, useRef
} from "react";
import {
	Delete, Edit, MoreVert
} from "@mui/icons-material";
import {
  Button, Container, Menu, Ref
} from "semantic-ui-react";
import { RowMenuProps } from "./RowMenu.types";
import { Modal } from "@libs/semantic";
import { EditTicketForm } from "@libs/semantic";

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
		<Container className="relative">
    <Button
      onClick={handleShowMenu(true)}
    >
      <MoreVert/>
    </Button>
      {open && (
        <Ref innerRef={node}>
          <Menu
            text
            vertical
            className="table-menu"
          >
            <Menu.Item onClick={onEdit}>
              <Container textAlign="center">
                <Edit/>
              </Container>
            </Menu.Item>
            <Menu.Item onClick={handleDelete}>
              <Container textAlign="center">
                <Delete/>
              </Container>
            </Menu.Item>
          </Menu>
        </Ref>
      )}
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
		</Container>
	);
};
