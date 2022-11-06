import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        Login
        { loading ? <Loading />
          : (
            <form>
              <label htmlFor="userName">
                Nome
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
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
