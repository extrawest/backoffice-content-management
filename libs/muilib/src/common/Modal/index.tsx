import {
	Box, Dialog, DialogContent, DialogTitle, IconButton
} from "@mui/material";
import { FC } from "react";
import {
	contentSx, headerSx, rootSx
} from "./Modal.sx";
import { ModalProps } from "./Modal.types";
import { Close } from "@mui/icons-material";

export const Modal:FC<ModalProps> = ({
	handleClose,
	open,
	children,
	title,
	type,
	fullWidth,
	withoutPaddings = false
}) => {
	return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={rootSx}
      maxWidth={type ?? "lg"}
      fullWidth={fullWidth ?? false}
    >
      {title &&
        <Box sx={headerSx}>
          <DialogTitle>
            {title}
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      }
      <DialogContent
        sx={contentSx(withoutPaddings)}
      >
        {children}
      </DialogContent>
    </Dialog>
	);
};
