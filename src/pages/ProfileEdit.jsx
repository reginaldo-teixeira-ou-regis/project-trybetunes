import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
    isDisabled: true,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const infos = await getUser();
    const { description, image, name, email } = infos;
    this.setState({
      description,
      image,
      name,
      email,
      loading: false,
    });
  }

  updateProfileEdit = async () => {
    const { description, image, name, email } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await updateUser({ description, image, name, email });
    this.setState({
      loading: false,
    });
    history.push('/profile');
  };

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validationForm = () => {
    const { description, image, name, email } = this.state;
    const verific = name.length && email.length && description.length && image.length > 0;
    this.setState({
      isDisabled: !verific,
    });
  };

  render() {
    const {
      description, image, name, email, loading, isDisabled,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <header className="pageProfileEdit">
          <section className="bgHeaderTop" />
          { loading ? <Loading /> : (
            <form className="profileEditContainer" onChange={ this.validationForm }>
              <img
                className="imgProfile"
                src={ image }
                alt="profilePicture"
              />
              <label className="linkImg" htmlFor="image">
                <input
                  type="text"
                  name="image"
                  id="image"
                  data-testid="edit-input-image"
                  placeholder="Insira um link"
                  value={ image }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <br />
              <label htmlFor="name">
                <h4>Nome</h4>
                <p>Fique à vontade para usar seu nome social</p>
                <input
                  maxLength="10"
                  type="text"
                  name="name"
                  id="name"
                  data-testid="edit-input-name"
                  className="formItens"
                  placeholder="Digite seu nome / apelido"
                  value={ name }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <label htmlFor="email">
                <h4>E-mail</h4>
                <p>Escolha um e-mail que consulte diariamente</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  data-testid="edit-input-email"
                  className="formItens"
                  placeholder="seu_nome@email.com.br"
                  value={ email }
                  onChange={ this.onChangeInput }
                />
              </label>
              <label htmlFor="description">
                <h4>Descrição</h4>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  data-testid="edit-input-description"
                  className="formItens"
                  placeholder="Sobre mim"
                  value={ description }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <button
                type="button"
                className="btnSavedEdit"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.updateProfileEdit }
              >
                SALVAR
              </button>
            </form>)}
        </header>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;
