import React from 'react';

function InfoSection(props) {
  return (
    <div className="info-section">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}

export default InfoSection;
