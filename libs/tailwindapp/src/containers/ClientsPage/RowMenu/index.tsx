import {
	FC, useState, MouseEvent
} from "react";
import { Button, IconButton, MenuItem } from "@mui/material";
import {
	Delete, Edit, MoreVert
} from "@mui/icons-material";
import { StyledMenu } from "./StyledMenu";
import { RowMenuProps } from "./RowMenu.types";
import { Modal } from "@lib/tailwind";
import { EditTicketForm } from "../../../forms/EditTicketForm";

export const RowMenu:FC<RowMenuProps> = ({
	onDelete,
  tickets,
  ticket,
  getTickets
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (status: boolean) => () => {
    setShowModal(status)
  }

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
    <IconButton
      onClick={handleClick}
    >
      <MoreVert/>
    </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          disableRipple
        >
          <Button variant="text" onClick={handleShowModal(true)} style={{width: "100%"}}>
            <Edit/>
          </Button>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          disableRipple
        >
          <Button variant="text" onClick={onDelete} style={{width: "100%"}}>
            <Delete/>
          </Button>
        </MenuItem>
      </StyledMenu>
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
