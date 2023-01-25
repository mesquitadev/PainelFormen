import { Switch } from 'react-router-dom';
import { SignIn, Confirm } from '@/pages';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      {/*<Route exact path='/auth/register' component={SignUp} />*/}
      <Route exact path='/' component={SignIn} />
      <Route exact path='/confirm' component={Confirm} />
      {/*<Route exact path='/home' isPrivate component={Home} />*/}
    </Switch>
  );
}

export default Routes;
