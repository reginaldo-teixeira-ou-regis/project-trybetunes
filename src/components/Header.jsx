import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
            <Lupa />
            Pesquisar
          </NavLink>
          <NavLink
            className="link"
            to="/favorites"
            activeClassName="active"
            data-testid="link-to-favorites"
          >
            <Star />
            Favoritas
          </NavLink>
          <NavLink
            className="link"
            to="/profile"
            activeClassName="active"
            data-testid="link-to-profile"
          >
            <Profile />
            Perfil
          </NavLink>
        </section>
        <section className="sec">
          { loading ? <Loading /> : (
            <h3 className="picture">
              <img src={ userName.image } alt="" />
              <p data-testid="header-user-name">
                { userName.name }
              </p>
              <Link exact className="btnSair" to="/">sair</Link>
            </h3>
          )}
        </section>
      </header>
    );
  }
}

export default Header;
