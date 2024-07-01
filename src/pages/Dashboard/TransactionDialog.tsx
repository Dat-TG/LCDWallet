import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

interface TransactionDialogProps {
  open: boolean;
  handleClose: () => void;
  handleTransaction: () => void;
  address: string;
  setAddress: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({
  open,
  handleClose,
  handleTransaction,
  address,
  setAddress,
  amount,
  setAmount,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Make Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To make a transaction, please enter the recipient&apos;s address and the amount to send.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Recipient Address"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleTransaction} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;
