import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Loading from './Loading';
import { getUser } from './services/userAPI';

class Profile extends React.Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.recuperaInfo();
  }

  recuperaInfo = async () => {
    this.setState({
      isLoading: false,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      user,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          <div>
            <img
              src={ user.image }
              alt="Profile"
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
          <h4>{user.description}</h4>
        </div>
      </div>
    );
  }
}

export default Profile;
