import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';

const useStyles = makeStyles((theme) => ({
  fieldGroup: {
    marginBottom: theme.spacing(2),
  },
}));


function FormikDatePicker(props) {
  const classes = useStyles();
  const { label, name, onChange, ...rest } = props;

  return (
    <div className={classes.fieldGroup}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue }}) => {
          const defaultOnChange = (date) => setFieldValue(name, date);

          return (
            <DatePicker
              autocomplete='off'
              name={name}
              dateFormat='MM/DD/YYYY'
              selected={moment(value)}
              onChange={onChange || defaultOnChange}
              customInput={ 
                <TextField label={label} variant='outlined' {...rest} />
              }
            />
          );
        }}
      </Field>
    </div>
  );
}

FormikDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default FormikDatePicker;