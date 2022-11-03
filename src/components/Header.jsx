import { Component } from 'react';
import { NavLink, Switch } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        <NavLink
          className="link"
          to="/search"
          activeClassName="active"
          data-testid="link-to-search"
        >
          Search
        </NavLink>
        <NavLink
          className="link"
          to="/favorites"
          activeClassName="active"
          data-testid="link-to-favorites"
        >
          Favorites
        </NavLink>
        <NavLink
          className="link"
          to="/profile"
          activeClassName="active"
          data-testid="link-to-profile"
        >
          Profile
        </NavLink>
        Header
        { loading ? <p>Carregando...</p> : (
          <p data-testid="header-user-name">
            { userName.name }
          </p>
        )}
      </header>
    );
  }
}

export default Header;
