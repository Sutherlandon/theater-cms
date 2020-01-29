import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';

const useStyles = makeStyles((theme) => ({
  fieldGroup: {
    marginBottom: theme.spacing(2),
  },
}));

function FormikSelect(props) {
  const classes = useStyles();
  const { name, label, options, ...rest } = props;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const formattedOptions = options
    .map((option) => typeof option === 'string'
      ? ({ value: option, label: option })
      : option
    );

  return (
    <div className={classes.fieldGroup}>
      <Field name={name}>
        {({ field: { value }, form: { handleChange }}) => (
          <FormControl variant='outlined'>
            <InputLabel ref={inputLabel} id={`${name}-label`}>
              {label}
            </InputLabel>
            <Select
              labelId={`${name}-label`}
              labelWidth={labelWidth}
              name={name}
              onChange={handleChange}
              value={value}
              {...rest}
            >
              {formattedOptions.map(({ value, label }) => (
                <MenuItem value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Field>
    </div>
  );
}

FormikSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOf([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ])
  ),
}

export default FormikSelect;