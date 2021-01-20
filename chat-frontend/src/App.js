import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styles from './App.module.css';
import PrivateRoute from './components/PrivateRoute';
import LogIn from './views/logIn';
import SignUp from './views/signUp';
import Chat from './views/chat';
import { ChatContextProvider } from './context/chatContext';

function App() {
  return (
    <Router>
      <ChatContextProvider>
        <div className={styles.root}>
          <Switch>
            <Route exact path="/login">
              <LogIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute exact path="/chat">
              <Chat />
            </PrivateRoute>
            <Redirect to="/chat" from="/" />
          </Switch>
        </div>
      </ChatContextProvider>
    </Router>
  );
}

export default App;
