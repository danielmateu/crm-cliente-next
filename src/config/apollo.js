// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
// import fetch from 'node-fetch'

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//         uri: 'http://localhost:4000/',
//         fetch
//     }),
// })


import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    connectToDevTools: true,
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});


export default client;