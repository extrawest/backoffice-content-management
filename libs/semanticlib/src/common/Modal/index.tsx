import { FC } from "react";
import { Close } from "@mui/icons-material";
import {
	Button, Grid, Modal as Dialog 
} from "semantic-ui-react";
import { ModalProps } from "./Modal.types";

export const Modal: FC<ModalProps> = ({
	handleClose,
	open,
	children,
	title,
}) => {
	return (
    <Dialog
onClose={handleClose}
open={open}
    >
      <Dialog.Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>{title}</Grid.Column>
            <Grid.Column
width={2}
textAlign="right"
            >
              <Button
                onClick={handleClose}
                type="button"
                size="tiny"
                icon
                basic
                compact
              >
                <Close />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Dialog.Header>
      <Dialog.Content>
        <Dialog.Description>{children}</Dialog.Description>
      </Dialog.Content>
    </Dialog>
	);
};
