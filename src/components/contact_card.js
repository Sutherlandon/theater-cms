import React from 'react';

function ContactCard(props) {
  return (
    <div className="info-section">
      <h3>{props.title}</h3>
      <p>{props.desc}</p>
      <p>
        {props.name}<br/>
        {props.phone}<br/>
        {props.email}
      </p>
    </div>
  )
}

export default ContactCard;
