import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function ValidatorRegisterModal({
  open,
  handleClose,
  privateKey,
  stake,
  handleRegister,
}: {
  open: boolean;
  handleClose: () => void;
  privateKey: string;
  stake: number | undefined;
  handleRegister: (value: number) => void;
}) {
  const [stakee, setStakee] = useState<string | undefined>();
  useEffect(() => {
    setStakee(stake?.toString());
  }, [stake]);
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
          id="privateKey"
          label="Private Key"
          type="text"
          fullWidth
          value={privateKey}
          disabled
        />
        <TextField
          margin="dense"
          id="stake"
          label="Stake"
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
