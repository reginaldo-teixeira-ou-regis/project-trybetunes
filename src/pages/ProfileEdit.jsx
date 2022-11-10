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
              <label htmlFor="image">
                Imagem/Url:
                {' '}
                <input
                  type="text"
                  name="image"
                  id="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <br />
              <label htmlFor="name">
                Nome:
                {' '}
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  id="name"
                  placeholder="Digite seu nome"
                  value={ name }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <br />
              <label htmlFor="email">
                E-mail:
                {' '}
                <input
                  type="email"
                  name="email"
                  data-testid="edit-input-email"
                  id="email"
                  placeholder="Digite seu Email"
                  value={ email }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <br />
              <label htmlFor="description">
                Descrição:
                <br />
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  data-testid="edit-input-description"
                  placeholder="Digite uma descrição"
                  value={ description }
                  onChange={ this.onChangeInput }
                  required
                />
              </label>
              <br />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.updateProfileEdit }
              >
                Salvar
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
