import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AuthProvider } from './context/auth'
import Home from './pages/Home';
import Login from './pages/Login'
import SingleOrder from './pages/SingleOrder'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import { Container } from 'semantic-ui-react';
import AuthRoute from './util/AuthRoute'
import PrivateRoute from './util/PrivateRoute'




function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path='/home' component={Home} />
          <AuthRoute exact path='/register' component={Register} />
          <PrivateRoute exact path='/posts/:postId' component={SingleOrder} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
