import React from 'react';

class AdminPage extends React.Component {
  render() {
    return (
      <div style={{
        'backgroundColor': 'whitesmoke',
        'boxSizing': 'border-box',
        'minHeight': '100vh',
        'padding': '1em'
      }}>
        <div className='page-title'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AdminPage;