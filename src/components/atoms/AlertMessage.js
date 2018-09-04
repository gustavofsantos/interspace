import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default props => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={props.open}
    onClose={props.handleClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.message}</span>}
  />
);