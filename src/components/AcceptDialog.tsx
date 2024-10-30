import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Props {
	open: boolean;
	title: string;
	content: React.ReactNode;
	onClose: () => void;
}

const AcceptDialog: React.FC<Props> = ({ open, title, content, onClose }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{content}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AcceptDialog;