import React from 'react';
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
      </header>
    );
  }
}

export default Header;
