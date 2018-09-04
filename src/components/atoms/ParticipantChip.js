import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

function ParticipantChip(props) {
  const { classes } = props;

  return (
    <Chip label={props.participant || 'anon'} className={classes.chip} />
  );
}

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(ParticipantChip);