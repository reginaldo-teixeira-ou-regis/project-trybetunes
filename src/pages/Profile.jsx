import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

class Profile extends Component {
  state = {
    infos: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const infos = await getUser();
    this.setState({
      infos,
      loading: false,
    });
  }

  render() {
    const { infos: { description, image, name, email }, loading } = this.state;
    return (
      <main data-testid="page-profile">
        <Header />
        <header className="pageProfile">
          <section className="bgHeaderTop" />
          { loading ? <Loading />
            : (
              <div className="profileContainer">
                <img
                  className="imgProfile"
                  src={ image }
                  alt="profilePicture"
                  data-testid="profile-image"
                />
                <div>
                  <h4>Nome</h4>
                  {' '}
                  <p className="valueInput">{name}</p>
                </div>
                <div>
                  <h4>E-mail</h4>
                  {' '}
                  <p className="valueInput">{email}</p>
                </div>
                <div>
                  <h4>Descrição</h4>
                  {' '}
                  <p className="valueInput descriptionScroll">{description}</p>
                </div>
                <div className="btn">
                  <Link exact className="btnProfileEdit" to="/profile/edit">
                    EDITAR PERFIL
                  </Link>
                </div>
              </div>)}
        </header>
      </main>
    );
  }
}

export default Profile;
