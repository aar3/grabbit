import React from 'react';

export default class T extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}>
        <p>404 Not Found Template</p>
      </div>
    );
  }
}
