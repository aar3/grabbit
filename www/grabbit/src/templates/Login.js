import React from 'react';
import {Color} from 'Const';
import {ButtonGroup, Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {TextInput, GrabbitButton} from 'components/Basic';

export default class T extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const sectionStyle = {
      border: '1px solid blue',
      width: 1100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 1000,
    };

    const groupButtonStyle = {
      width: 200,
      height: 70,
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
            <div
              style={{
                border: '1px solid green',
                width: 600,
                height: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <div
                style={{
                  border: '1px solid red',
                  width: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput style={{marginTop: 50}} label="Email" />
                <TextInput type="password" style={{marginTop: 10}} label="Password" />
                <GrabbitButton
                  onPress={() => {}}
                  style={{marginTop: 10, backgroundColor: Color.Purple}}
                  title="Login"
                />
                <div
                  style={{
                    border: '1px dashed black',
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <input type="radio" name="remember-me" checked={false} />
                  <p style={{fontSize: 14}}>Remember me</p>
                </div>
                <div>
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                    }}>
                    Don't have an account?{' '}
                    <a href="" style={{color: Color.HyperlinkBlue}}>
                      Create one
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={sectionStyle}>
            <p>Right</p>
          </div>
        </div>
        <div
          style={{
            border: '1px solid green',
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}>
          <p
            style={{
              textAlign: 'center',
              fontSize: 26,
              fontWeight: 'bold',
              color: Color.BorderLightGrey,
            }}>
            Grabbit
          </p>
          <p
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: Color.ReadableGreyText,
            }}>
            2020 (c) All rights reserved
          </p>
        </div>
      </div>
    );
  }
}
