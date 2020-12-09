import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AuthProvider } from './context/auth'
import Home from './components/Home';
import HomeTabs from './pages/HomeTabs';
import Login from './pages/Login'
import SingleOrder from './pages/SingleOrder'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import { Container } from 'semantic-ui-react';
import AuthRoute from './util/AuthRoute'
import { MessageProvider } from './context/message';




function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <MenuBar />
          <Container>
            <AuthRoute exact path='/' component={Login} guest />
            <AuthRoute exact path='/home' component={HomeTabs} authenticated />
            <AuthRoute exact path='/register' component={Register} guest />
            <AuthRoute exact path='/posts/:postId' component={SingleOrder} authenticated />
          </Container>
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
