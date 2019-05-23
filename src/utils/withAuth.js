import React, { Component } from 'react';
import AuthService from './authService';
import { API_ROOT } from '../config';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(API_ROOT);
  return class AuthWrapped extends Component {

    constructor() {
      super();
      this.state = {
        name: null,
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            name: profile,
          })
        } catch (err) {
          console.log(err);
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      if (this.state.name) {
        return (<AuthComponent {...this.props} user={this.state.name} />);
      } else {
        return null;
      }
    }

  }
}