// @flow
import * as React from 'react';
import isemail from 'isemail';

import Input from '../Input/Input';
import Panel from '../Panel/Panel';
import Button from '../Button/Button';

import './Login.css';

type LoginProps = {
  error: string,
  onSubmit: Function,
};

type LoginState = {
  email: string,
  password: string,
};

class Login extends React.PureComponent<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
  };

  onEmailChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value });
  };

  onPasswordChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  get isFormValid(): boolean {
    const email = this.state.email.trim();
    const { password } = this.state;

    return !(!isemail.validate(email, { minDomainAtoms: 2 }) || !password);
  }

  footer = () => (
    <Button type="submit" disabled={!this.isFormValid}>
      Login
    </Button>
  );

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          const { email, password } = this.state;
          if (this.props.onSubmit) {
            this.props.onSubmit({ email, password });
          }
        }}
      >
        <Panel className="Login" title="Login" footer={this.footer()} padded>
          {this.props.error && <div className="Login__error">{this.props.error}</div>}
          <div className="Login__input">
            <Input placeholder="E-mail Address" value={this.state.email} onChange={this.onEmailChange} />
          </div>
          <div className="Login__input">
            <Input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </div>
        </Panel>
      </form>
    );
  }
}

export default Login;
