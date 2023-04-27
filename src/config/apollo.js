
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import fetch from 'node-fetch';


const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

const authLink = setContext((_, { headers }) => {
    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
            // miPropioHeader: 'Mi valor'
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});


export default client;

// let client 
// if (typeof window !== 'undefined') {
//   const httpLink = createHttpLink({
//     uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
//     fetch,
//   })
 
//   const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('token')
 
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : '',
//       },
//     }
//   })
 
//   client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: authLink.concat(httpLink),
//     connectToDevTools: true,
//   })
 
// }
 
// export default client