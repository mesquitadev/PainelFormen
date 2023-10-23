import { Switch } from 'react-router-dom';
import { Files, Folders, SignIn } from '@/pages';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Route exact path='/home' isPrivate component={Folders} />
      <Route exact path='/folders' isPrivate component={Folders} />
      <Route exact path='/files/folder/:folderId/path/:pathId' isPrivate component={Files} />
    </Switch>
  );
}

export default Routes;
