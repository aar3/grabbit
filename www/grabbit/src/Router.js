import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EntryTemplate from 'templates/Entry';
import HomeTemplate from 'templates/Home';
import LoginTemplate from 'templates/Login';
import SignupTemplate from 'templates/Signup';
import CreateMerchantTemplate from 'templates/CreateMerchant';
import PageNotFoundTemplate from 'templates/errors/404';

export default class Router_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeTemplate} />
          <Route exact path="/welcome" component={EntryTemplate} />
          <Route exact path="/login" component={LoginTemplate} />
          <Route exact path="/signup" component={SignupTemplate} />
          <Route exact path="/merchant/new" component={CreateMerchantTemplate} />
          <Route exact path="*" component={PageNotFoundTemplate} />
        </Switch>
      </Router>
    );
  }
}
