import React, { Component, ReactElement } from 'react';
import ThemeApp from './assets/theme/ThemeApp';
import { BrowserRouter } from 'react-router-dom';
import { RouteApp } from './route/RouteApp';
import { Provider } from 'react-redux';
import { store } from './redux/store';

class App extends Component {
  render(): ReactElement {
    return (
      <ThemeApp>
        <Provider store={store}>
          <BrowserRouter>
            <RouteApp />
          </BrowserRouter>
        </Provider>
      </ThemeApp>
    );
  }
}

export default App;
