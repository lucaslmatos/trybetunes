import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    userName: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getLogin();
  }

  getLogin = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          { userName }
        </h2>
        <div>
          <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </div>
      </header>
    );
  }
}

export default Header;
