import { getAllBlocks } from '@/api/blockchain/apiBlockchain';
import { Block } from '@/api/blockchain/type';
import useNotifications from '@/store/notifications';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

const useStyles = {
  root: {
    flexGrow: 1,
    padding: '24px',
  },
  card: {
    margin: 2,
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    maxWidth: 150,
  },
  doughnutContainer: {
    margin: '0 auto',
    maxWidth: '300px',
  },
  button: {
    margin: '8px',
  },
};

export default function AllBlocksDialog() {
  const classes = useStyles;
  const [open, setOpen] = React.useState(false);
  const [blocks, setBlocks] = React.useState<Block[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [, actions] = useNotifications();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBlocks = async () => {
    setLoading(true);
    try {
      const blocks = await getAllBlocks();
      setBlocks(blocks);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchBlocks();
    }
  }, [open]);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        View All Blocks
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>All Blocks</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Table style={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Height</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blocks.map((block, index) => (
                  <TableRow key={index}>
                    <TableCell>{block.index}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: '80px',
                      }}
                    >
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          ':hover': {
                            cursor: 'pointer',
                          },
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(block.hash);
                          actions.push({ message: 'Hash copied to clipboard' });
                        }}
                      >
                        {block.hash}
                      </Typography>
                    </TableCell>
                    <TableCell>{new Date(block.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
