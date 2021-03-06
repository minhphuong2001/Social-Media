import React, { useEffect } from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import Auth from './features/Auth';
import Home from './page/Home/Home';
import Profile from './page/Profile/Profile';
import NotFound from './components/NotFound/NotFound'
import {useDispatch} from 'react-redux'
import { getUser } from './features/Auth/authSlice';
import Messenger from './page/Messenger/Messenger';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          
          <Route path="/home" component={Home}></Route>
          <Route path="/profile/:username" component={Profile}></Route>

          <Route path="/login" component={Auth}></Route>
          <Route path="/register" component={Auth}></Route>
          <Route path="/messenger" component={Messenger}></Route>

          <Route component={NotFound}></Route>

        </Switch> 
      </Router>
    </div>
  );
}

export default App;
