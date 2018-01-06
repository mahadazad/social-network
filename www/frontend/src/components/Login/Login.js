import React from 'react';
import PropTypes from 'prop-types';
import isemail from 'isemail';

import './Login.css';

import Input from '../Input/Input';
import Panel from '../Panel/Panel';
import Button from '../Button/Button';

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        const {email, password } = this.state;
        this.props.onSubmit && this.props.onSubmit({ email, password });
      }}>
        <Panel className="Login"
               title="Login"
               footer={this.footer()}
               padded>
          {this.props.error && <div className="Login__error">
            {this.props.error}
          </div>}
          <div className="Login__input">
            <Input placeholder="E-mail Address"
                   value={this.state.email}
                   onChange={this.onEmailChange}/>
          </div>
          <div className="Login__input">
            <Input placeholder="Password" type="password"
                   value={this.state.password}
                   onChange={this.onPasswordChange}/>
          </div>
        </Panel>
      </form>
    );
  }

  get isFormValid() {
    const email = this.state.email.trim();
    const password = this.state.password;

    return !(!isemail.validate(email, { minDomainAtoms: 2 }) || !password);
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  footer() {
    return (
      <Button type="submit"
              disabled={!this.isFormValid}>Login</Button>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
};

export default Login;
