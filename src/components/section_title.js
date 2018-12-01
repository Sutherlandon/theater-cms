import React from 'react';
import { Link } from 'react-scroll'

/**
 * Creates a section heading that when clicked, scrolls that heading to the top
 * of the screen
 */
const SectionTitle = (props) => {
  return (
    <Link
      className="info-title"
      duration={1000}
      offset={-30}
      smooth={true}
      to={props.text}
    >
      <h1 id={props.text}>
        {props.text}
      </h1>
    </Link>
  )
}

export default SectionTitle;
