
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import fetch from 'node-fetch';


const httpLink = createHttpLink({
    // uri: 'http://localhost:4000/',
    uri: 'https://young-beyond-83584.herokuapp.com/',
    fetch
});

const authLink = setContext((_, { headers }) => {
    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            // miPropioHeader: 'Mi valor'
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});


export default client;


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