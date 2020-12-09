import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from '@apollo/client/utilities';
import { split, HttpLink } from '@apollo/client';



import { WebSocketLink } from '@apollo/client/link/ws';

let httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
        reconnect: true,
        // connectionParams: {
        //     authToken: localStorage.getItem('token'),
        // }
    }
});



const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

httpLink = authLink.concat(httpLink)

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})



export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)