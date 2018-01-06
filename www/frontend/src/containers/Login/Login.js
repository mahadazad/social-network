import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { wsLink } from '../../apollo';
import { default as LoginComponent } from '../../components/Login/Login';


class Login extends React.PureComponent {
  state = {
    error: '',
  };

  render() {
    return (
      <LoginComponent onSubmit={this.onSubmit}
                      error={this.state.error}/>
    );
  }

  onSubmit = async ({ email, password }) => {
    const response = await this.props.login(email, password);

    if (response.error) {
      this.setState({ error: response.error });
      return;
    }

    localStorage.setItem('token', response.token);
    wsLink.subscriptionClient.tryReconnect();

    this.props.history.push('/home');
  };
}

const loginQuery = gql`
    mutation LoginQuery($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            error
        }
    }
`;

export default graphql(loginQuery, {
  name: 'login',
  props: (props) => {
    return {
      login: async (email, password) => {
        const response = await props.login({
          variables: {
            email,
            password,
          },
        });

        return response.data.loginUser;
      },
    }
  },
})(withRouter(Login));
