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

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Close the selector and send the selected value back to the parent
   */
  handleChange(date) {
    this.setState({
      open: false
    });

    this.props.onChange(date)
  }

  render() {
    const display = this.state.open ? "block" : "none";

    return (
      <div className="select-input">
        <label
          htmlFor={this.props.id + "-select"}
          className="select-label">
          Now Showing
        </label>
        <div className="select-wrapper">
          <button
            className="select-button"
            id={this.id + "-select"}
            onClick={() => this.setState({open: !this.state.open})}
          >
            {this.props.value}
            <span className="caret"></span>
          </button>
          <ul className="select-options" style={{display: display}}>
            {this.props.options.map((date, i) => (
              <li key={i} onClick={() => this.handleChange(date)}>{date}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SelectBox;
