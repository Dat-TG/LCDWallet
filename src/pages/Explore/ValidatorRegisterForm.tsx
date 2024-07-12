import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';

export default function ValidatorRegisterModal({
  open,
  handleClose,
  publicKey,
  stake,
  handleRegister,
}: {
  open: boolean;
  handleClose: () => void;
  publicKey: string;
  stake: number;
  handleRegister: (value: number) => Promise<void>;
}) {
  const [stakee, setStakee] = useState<string>(stake.toString());
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register as Validator</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To register as a validator, please enter your public key and the amount of LCD to stake.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="publicKey"
          label="Public Key"
          type="text"
          fullWidth
          value={publicKey}
          disabled
        />
        <TextField
          margin="dense"
          id="stake"
          label="Stake"
          type="number"
          fullWidth
          value={stakee}
          onChange={(e) => setStakee(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await handleRegister(Number(stakee));
            handleClose();
          }}
          color="primary"
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
