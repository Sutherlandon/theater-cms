import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  selectIinput: {
    fontSize: '1.5em',
    margin: '-9em auto 2em',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25em',
      marginTop: '-10em',
      width: '75%',
    },
  },
  selectLabel: {
    fontSize: '1.5em',
    color: theme.palette.light,
    display: 'inline-block',
    marginRight: '0.5em',
    verticalAlign: 'middle',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25em',
      display: 'block',
      margin: '0 auto 0.5em',
    },
  },
  selectWrapper: {
    display: 'inline-block',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '0 auto 0.5em',
    },
  },
  selectButton: {
    backgroundColor: 'rgba(3,3,3,40%)',
    border: `1px solid ${theme.palette.light}`,
    borderRadius: 4,
    color: theme.palette.light,
    fontSize: '1.25em',
    padding: '0.5em',
    textAlign: 'left',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(3,3,3,60%)',
    },
  },
  caret: {
    float: 'right',
    marginTop: '10px',
    borderTop: `6px solid ${theme.palette.light}`,
    borderRight: '6px solid transparent',
    borderLeft: '6px solid transparent',
    display: 'inline-block',
    height: 0,
    marginLeft: 20,
    width: 0,
    verticalAlign: 'middle',
  },
  selectOptions: {
    backgroundColor: theme.palette.light,
    border: `1px solid ${theme.palette.dark}`,
    borderRadius: 4,
    display: 'none',
    height: 'auto',
    listStyleType: 'none',
    margin: 0,
    overflowX: 'hidden',
    padding: 0,
    position: 'absolute',
    textAlign: 'left',
    width: '100%',
    zIndex: 1000,

    [theme.breakpoints.down('sm')]: {
      maxHeight: 250,
    }
  },
  li: {
    cursor: 'pointer',
    padding: '0.25em',
  },
});

/**
 * A select.
 * @param id
 *  The id of the selector. Must be unique for each app
 * @param onChange
 *   A function to do when the select box changes
 * @param options
 *  The list of options for the select box
 */
class HeaderDateSelector extends React.Component {
  state = { open: false }

  /**
   * Close the selector and send the selected value back to the parent
   */
  handleChange = (date) => {
    console.log({date});
    this.setState({ open: false });
    this.props.onChange(date)
  }

  render() {
    const { classes, value } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.selectIinput}>
        <label
          htmlFor={this.props.id + "-select"}
          className={classes.selectLabel}>
          Now Showing
        </label>
        <div className={classes.selectWrapper}>
          <button
            className={classes.selectButton}
            id={this.id + "-select"}
            onClick={() => this.setState({open: !this.state.open})}
          >
            {moment(value).format('dddd MM/DD')}
            <span className={classes.caret}></span>
          </button>
        </div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            onChange={this.handleChange}
            open={open}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
            type='hidden'
            value={value}
            variant='dialog'
          />
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default withStyles(styles)(HeaderDateSelector);
