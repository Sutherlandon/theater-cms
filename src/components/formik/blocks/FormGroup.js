
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formGroup: {
    marginBottom: theme.spacing(),
    width: '100%',
  },
}));

function Label(props) {
  const classes = useStyles();
  return (
    <div className={classes.formGroup}>{props.children}</div>
  );
}

export default Label