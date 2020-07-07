import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Box
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

function ModalPopup(props) {

  return (
    <Dialog
			fullWidth={true}
			disableBackdropClick={true}
			maxWidth="xs"
			open={props.isDialogOpen}
			onClose={props.handleDialogClose}
			aria-labelledby="max-width-dialog-title"
    >
			<DialogTitle id="max-width-dialog-title" className="">
				<Box display="flex" justifyContent="space-between">
					{props.dialogTitle}
					<CancelIcon color="secondary" onClick={props.handleDialogClose} />
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box display="flex" justifyContent="center">
					{props.dialogContent}
				</Box>
			</DialogContent>
    </Dialog>
  );
}

export default ModalPopup;
