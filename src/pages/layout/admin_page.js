import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: theme.palette.light,
    boxSizing: 'border-box',
    minHeight: '100vh',
    padding: theme.spacing(4)
  },
  content: {
    maxWidth: 800 + theme.spacing(4),
  }
}));

function AdminPage({ title, children }) {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <h2>{title}</h2>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}

AdminPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
}

export default AdminPage;