import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/scss/global.scss';
// import { AppHeader } from './cmps/AppHeader';
import { SpaceApp } from './pages/SpaceApp';
import { LandingDetails } from './pages/LandingDetails';

export default function App() {
  return (
    <Router>
      <div className='App'>
        {/* <AppHeader /> */}
        <main className='container'>
          <Switch>
            <Route component={LandingDetails} path='/landing/:id' />
            <Route component={SpaceApp} path='/' />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
