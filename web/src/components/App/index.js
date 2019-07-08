import React from 'react';
import CalendarPage from 'Src/components/CalendarPage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './app.scss';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path={'/'} component={CalendarPage} />
        <Route exact path={'/add-appointment'} component={CalendarPage} />
        <Route exact path={'/update-appointment'} component={CalendarPage} />
        <Route exact path={'/appointment/:id'} component={CalendarPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </div>
);

export default App;
