import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { Field } from 'formik';
import FormGroup from './blocks/FormGroup';
import Label from './blocks/Label';

function FormikSelect(props) {
  const { name, label, options, ...rest } = props;

  const formattedOptions = options
    .map((option) => typeof option === 'string'
      ? ({ value: option, label: option })
      : option
    );

  return (
    <FormGroup>
      <Field name={name}>
        {({ field: { value }, form: { handleChange }}) => (
          <FormControl variant='outlined'>
            <Label id={`${name}-label`}>
              {label}
            </Label>
            <Select
              id={`${name}-label`}
              name={name}
              onChange={handleChange}
              value={value}
              {...rest}
            >
              {formattedOptions.map(({ value, label }) => (
                <MenuItem key={label} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Field>
    </FormGroup>
  );
}

FormikSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ])
  ),
}

export default FormikSelect;