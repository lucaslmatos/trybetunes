import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import { getUser, updateUser } from './services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    emailCheck: true,
  };

  componentDidMount() {
    this.recuperaInfo();
  }

  recuperaInfo = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      emailCheck: false,
    });
  };

  onSaveBtnClick = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    const usuarioNovo = {
      name,
      email,
      image,
      description,
    };
    updateUser(usuarioNovo);
    history.push('/profile');
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  validateEmail = ({ target }) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-_]+\.[A-Za-z]{2,}$/;
    this.setState({
      [target.name]: target.value,
    });
    if (regex.test(target.value) === true) {
      this.setState({
        emailCheck: false,
      });
    } else {
      this.setState({
        emailCheck: true,
      });
    }
  };

  render() {
    const { name, email, description, image, emailCheck } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          <div>
            <section>
              Nome:
              <input
                type="text"
                data-testid="edit-input-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </section>
            <section>
              E-mail:
              <input
                type="text"
                data-testid="edit-input-email"
                name="email"
                value={ email }
                onChange={ this.validateEmail }
              />
            </section>
            <section>
              Descrição:
              <input
                type="text"
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </section>
            <section>
              Imagem(URL):
              <input
                type="text"
                data-testid="edit-input-image"
                name="image"
                value={ image }
                onChange={ this.handleChange }
              />
            </section>
          </div>
          <section>
            <button
              data-testid="edit-button-save"
              disabled={ (name.length === 0 || emailCheck
                || description.length === 0 || image.length === 0) }
              onClick={ this.onSaveBtnClick }
            >
              Salvar
            </button>
          </section>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: () => {},
  }).isRequired,
};
