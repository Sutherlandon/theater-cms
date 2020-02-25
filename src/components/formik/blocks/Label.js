import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    display: 'block',
    padding: theme.spacing()/2,
  },
}));

function Label({ children, ...rest }) {
  const classes = useStyles();
  return (
    <label className={classes.label} {...rest}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Label
