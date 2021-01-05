import React from 'react';
import {TextField, Button} from '@material-ui/core';
import {TextInputStyle, ButtonStyle} from 'styles/Global';

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {label, error, style = {}, type} = this.props;
    return (
      <TextField
        type={type}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        error={error}
        style={Object.assign({}, TextInputStyle, style)}
        label={label}
        variant="outlined"
      />
    );
  }
}

export class GrabbitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title, style, onPress} = this.props;
    return (
      <Button onPress={onPress} style={Object.assign({}, ButtonStyle, style)} variant="contained" color="primary">
        {title}
      </Button>
    );
  }
}
