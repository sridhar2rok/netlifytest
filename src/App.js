import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
//import SpecList from './components/SpecList';
import AddSpec from './components/AddSpec';
import AddSearch from './components/AddSearch';
// apollo client setup
const client = new ApolloClient({
    uri: 'http://gdbackend.herokuapp.com/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>G+D BPS Database</h1>
                <AddSearch />
              {/* A JSX comment <SpecList />*/}
                <AddSpec />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
