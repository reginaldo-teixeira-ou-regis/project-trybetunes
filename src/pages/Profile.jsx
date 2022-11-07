import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
      <div data-testid="page-profile">
        <Header />
        Profile
        <br />
        { loading && <Loading />}
        <img
          src={ image }
          alt="profilePicture"
          data-testid="profile-image"
        />
        <br />
        <span>
          {/* Nome:
          {' '} */}
          {name}
        </span>
        <br />
        <span>
          {/* E-mail:
          {' '} */}
          {email}
        </span>
        <br />
        <span>
          {/* Descrição:
          {' '} */}
          {description}
        </span>
        <br />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
