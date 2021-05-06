import React from 'react';
import ThemeApp from './assets/theme/ThemeApp';
import { BrowserRouter } from 'react-router-dom';
import { RouteApp } from './route/RouteApp';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/graphql/client';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeApp>
        <Provider store={store}>
          <BrowserRouter>
            <RouteApp />
          </BrowserRouter>
        </Provider>
      </ThemeApp>
    </ApolloProvider>
  );
};

export default App;
