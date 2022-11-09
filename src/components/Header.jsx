import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';
import logoImg from '../images/logo.svg';
import { ReactComponent as Profile } from '../images/profile.svg';
import { ReactComponent as Star } from '../images/star.svg';
import { ReactComponent as Lupa } from '../images/lupa.svg';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const showName = await getUser();
    this.setState({
      userName: showName,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header className="sideBar" data-testid="header-component">
        <div className="logo">
          <img src={ logoImg } alt="logo" />
        </div>
        <section>
          <NavLink
            className="link"
            to="/search"
            activeClassName="active"
            data-testid="link-to-search"
          >
            <h3 className="profile">
              <Lupa />
              Search
            </h3>
          </NavLink>
          <NavLink
            className="link"
            to="/favorites"
            activeClassName="active"
            data-testid="link-to-favorites"
          >
            <h3 className="profile">
              <Star />
              Favorites
            </h3>
          </NavLink>
          <NavLink
            className="link"
            to="/profile"
            activeClassName="active"
            data-testid="link-to-profile"
          >
            <h3 className="profile">
              <Profile />
              Profile
            </h3>
          </NavLink>
        </section>
        <section className="sec">
          { loading ? <Loading /> : (
            <h3 className="picture">
              <img src={ userName.image } alt="" />
              <p data-testid="header-user-name">
                { userName.name }
              </p>
            </h3>
          )}
        </section>
      </header>
    );
  }
}

export default Header;

/* background-image: url('images/BG\ AZUL.png');
  background-size: 117%; */
/* background-image: linear-gradient(to bottom right, #003BE5, #00D5E2); */
