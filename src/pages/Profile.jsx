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
                  src={ image }
                  alt="profilePicture"
                  data-testid="profile-image"
                />
                <span>
                  Nome:
                  {' '}
                  {name}
                </span>
                <span>
                  E-mail:
                  {' '}
                  {email}
                </span>
                <span>
                  Descrição:
                  {' '}
                  {description}
                </span>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>)}
        </header>
      </main>
    );
  }
}

export default Profile;
