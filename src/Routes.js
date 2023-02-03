import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/profile/edit" component={ ProfileEdit } />
      <Route path="/profile" component={ Profile } />
      <Route path="/album/:id" component={ Album } />
      <Route path="/favorites" component={ Favorites } />
      <Route path="/search" component={ Search } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
