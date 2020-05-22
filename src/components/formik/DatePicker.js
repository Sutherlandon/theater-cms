import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Field } from 'formik';

import TextField from './TextField';
import FormGroup from './blocks/FormGroup';

// this to get rid of the ref on function component error
class CustomTextField extends React.Component {
  render() {
    return (
      <TextField {...this.props} />
    );
  }
}

function FormikDatePicker(props) {
  const { label, name, onChange, ...rest } = props;

  return (
    <FormGroup>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue }}) => {
          const defaultOnChange = (date) => setFieldValue(name, date);

          return (
            <DatePicker
              autocomplete='off'
              name={name}
              dateFormat='MM/DD/YYYY'
              selected={value}
              onChange={onChange || defaultOnChange}
              customInput={ 
                <CustomTextField label={label} variant='outlined' {...rest} />
              }
            />
          );
        }}
      </Field>
    </FormGroup>
  );
}

FormikDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default FormikDatePicker;