import React, { Component } from 'react';
import { Router } from "react-router-dom";
import AppRouter from '../../Routers/AppRouter';
import history from '../../Utils/history';


class App extends Component {

  render() {
    return (
      <Router history={history}>
        <AppRouter></AppRouter>
      </Router>
    );
  }
}

export default App;