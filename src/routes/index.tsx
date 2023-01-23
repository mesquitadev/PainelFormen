import { Switch } from 'react-router-dom';
import { Home, SignIn } from '@/pages';
import Route from './Route';
import SignUp from '@/pages/SignUp';

function Routes() {
  return (
    <Switch>
      {/*<Route exact path='/auth/register' component={SignUp} />*/}
      <Route exact path='/' component={SignIn} />
      {/*<Route exact path='/home' isPrivate component={Home} />*/}
    </Switch>
  );
}

export default Routes;
