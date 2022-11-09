import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';
import logoImg from '../images/logo.svg';

class Login extends Component {
  state = {
    userName: '',
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleCreateUser = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.goBackHome('/search');
  };

  goBackHome = (linkar) => {
    const { history } = this.props;
    history.push(linkar);
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <div className="pageLogin" data-testid="page-login">
        { loading ? <Loading />
          : (
            <section className="container">
              <div className="loginLogo">
                <img src={ logoImg } alt="logoLogin" />
              </div>
              <form className="formLogin">
                <label htmlFor="userName">
                  <input
                    type="text"
                    name="userName"
                    data-testid="login-name-input"
                    id="userName"
                    placeholder="Digite seu nome"
                    value={ userName }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ userName.length < +'3' }
                  onClick={ this.handleCreateUser }
                >
                  Entrar
                </button>
              </form>
            </section>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
