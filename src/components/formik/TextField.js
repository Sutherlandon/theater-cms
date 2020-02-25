import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';

import FormGroup from './blocks/FormGroup';
import Label from './blocks/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const CustomTextField = (props) => (
  <TextField variant='outlined' {...props} />
);

function FormikTextField(props) {
  const classes = useStyles();
  const { label, name, ...rest } = props;

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Field
        as={CustomTextField}
        classes={{ root: classes.root }}
        name={name}
        {...rest}
      />
    </FormGroup>
  );
}

FormikTextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
}

export default FormikTextField;