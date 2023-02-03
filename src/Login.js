import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from './services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    isLoginBtnDisabled: true,
    nameValue: '',
    isLoading: false,
  };

  onLoginBtnClick = async () => {
    const { nameValue } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    if (await createUser({ name: nameValue }) === 'OK') {
      history.push('/search');
    }
    this.setState({
      isLoading: false,
    });
  };

  handleChange = ({ target }) => {
    const num = 3;
    this.setState({
      nameValue: target.value,
    });
    if (target.value.length >= num) {
      this.setState({
        isLoginBtnDisabled: false,
      });
    } else {
      this.setState({
        isLoginBtnDisabled: true,
      });
    }
  };

  render() {
    const { isLoginBtnDisabled, nameValue, isLoading } = this.state;
    return (isLoading
      ? <Loading /> : (
        <div data-testid="page-login" className="dados">
          <p> Digite seu Nome: </p>
          <input
            type="text"
            data-testid="login-name-input"
            value={ nameValue }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            disabled={ isLoginBtnDisabled }
            onClick={ this.onLoginBtnClick }
          >
            Entrar
          </button>
        </div>
      )
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: () => {},
  }).isRequired,
};
