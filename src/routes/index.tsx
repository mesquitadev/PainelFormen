import { Switch } from 'react-router-dom';
import { SignIn, SignUp, Home, MyVolume, Invests, Deposit } from '@/pages';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route exact path='/auth/signup' component={SignUp} />
      <Route exact path='/' component={SignIn} />
      <Route exact path='/home' isPrivate component={Home} />
      <Route exact path='/myvolume' isPrivate component={MyVolume} />
      <Route exact path='/invest' isPrivate component={Invests} />
      <Route exact path='/deposit' isPrivate component={Deposit} />
    </Switch>
  );
}

export default Routes;
