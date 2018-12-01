import React from 'react';

/**
 * A select.
 * @param id
 *  The id of the selector. Must be unique for each app
 * @param onChange
 *   A function to do when the select box changes
 * @param options
 *  The list of options for the select box
 */
class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Friday 1/06',
      open: false
    }

    // the id of the select box
    this.id = props.id;

    // create a list of options to select from
    this.showtimes = props.options.map((time, i) => {
      return (
        <li key={i} onClick={() => this.handleChange(time)}>{time}</li>
      )
    });

    // bind functions passed in
    this.handleChange = this.handleChange.bind(this);
    this.propsOnChange = props.onChange;
  }

  handleChange(new_value) {
    this.setState({
      value: new_value,
      open: false
    });
    this.propsOnChange(new_value)
  }

  render() {
    const display = this.state.open ? "block" : "none";

    return (
      <div className="select-input">
        <label htmlFor={this.id + "-select"} className="select-label">Now Showing</label>
        <div className="select-wrapper">
          <button id={this.id + "-select"} className="select-button"
            onClick={() => this.setState({open: !this.state.open})}>
            {this.state.value}
            <span className="caret"></span>
          </button>
          <ul className="select-options" style={{display: display}}>
            {this.showtimes}
          </ul>
        </div>
      </div>
    )
  }
}

export default SelectBox;
