import React from 'react';
import SectionTitle from './section_title';

const Section = (props) => (
  <div className='section' style={{
    background: props.background,
  }}>
    <SectionTitle text={props.title} />
    <div className='section' style={{
      maxWidth: '80em',
      margin: 'auto',
    }}>
      {props.children}
    </div>
  </div>
);

export default Section;
