import { Component } from 'react';
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
