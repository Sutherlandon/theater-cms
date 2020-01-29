import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';

const useStyles = makeStyles((theme) => ({
  fieldGroup: {
    marginBottom: theme.spacing(2),
  },
}));

const CustomTextField = (props) => (
  <TextField variant='outlined' {...props} />
);

function FormikTextField(props) {
  const classes = useStyles();
  const { name, ...rest } = props;
  return (
    <div className={classes.fieldGroup}>
      <Field
        as={CustomTextField}
        name={name}
        {...rest}
      />
    </div>
  );
}

FormikTextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
}

export default FormikTextField;