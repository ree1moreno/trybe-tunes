import React from 'react';
import './login.css';
import { Redirect } from 'react-router';
import logo from './img/login-logo.png';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import Footer from '../components/Footer';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      name: '',
      loading: false,
      redirect: false,
    };
  }

  handleInputChange = (({ target }) => {
    // console.log(target.name);
    // console.log(target.value);
    const { name, value } = target;
    const inputLength = 3;
    this.setState({
      [name]: value,
      isDisabled: (value.length < inputLength) ? true : '',
    });
  })

  handleClickButton = async (userName) => {
    this.setState({ loading: true });
    await createUser(userName);
    this.setState({ loading: false, redirect: true });
    // console.log(userName);
  }

  render() {
    const { isDisabled, name, loading, redirect } = this.state;
    // console.log(name);
    if (redirect) {
      return <Redirect to="/search" />;
      // return <Loading />;
    }
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="login-container" data-testid="page-login">
        <img className="logo" src={ logo } alt="logo TrybeTunes" />
        <form className="box">
          <h2 className="form-title">Login</h2>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              className="name-input"
              placeholder="Nome de usuário"
              autoComplete="off"
              data-testid="login-name-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            className="submit-input"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ () => this.handleClickButton({ name }) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
