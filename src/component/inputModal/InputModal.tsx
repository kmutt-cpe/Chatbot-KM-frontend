import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';

interface InputModalProps {
  onAction: (text?: string) => void;
  onReject: (text?: string) => void;
  onClose: () => void;
  dialogTitle?: string;
  rejectText?: string;
  actionText?: string;
  value?: string;
  open: boolean;
}

const InputModal: React.FC<InputModalProps> = (props: InputModalProps) => {
  const [text, setText] = React.useState(props.value || '');

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="xs" fullWidth={true}>
        <div style={{ width: '100%', padding: '15px' }}>
          <form>
            <DialogTitle>
              <Typography variant="h4" color="primary" align="center">
                {props.dialogTitle || 'DialogText'}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container direction="row" justify="center" spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setText(event.target.value)
                    }
                    variant="standard"
                    style={{ width: '100%' }}
                    value={text}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container direction="row" justify="center" spacing={1}>
                <Grid item>
                  <Button color="primary" onClick={() => props.onReject(text)}>
                    {props.rejectText || 'No'}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => props.onAction(text)}>
                    {props.actionText || 'Yes'}
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default InputModal;
