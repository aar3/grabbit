import React from 'react';
import {Color} from 'Const';

export default class T extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const sectionStyle = {
      border: '1px solid blue',
      minWidth: 1000,
      height: 1000,
    };

    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          //   display: 'flex',
        }}>
        <div
          style={{
            border: '1px solid red',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <div style={sectionStyle}>
            <p>Left</p>
          </div>
          <div style={sectionStyle}>
            <p>Right</p>
          </div>
        </div>
        <div
          style={{
            border: '1px solid green',
            width: '100%',
          }}>
          <p>Footer</p>
        </div>
      </div>
    );
  }
}
