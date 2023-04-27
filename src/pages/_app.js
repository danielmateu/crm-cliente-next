
import client from '@/config/apollo'
import { ApolloProvider } from '@apollo/client'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  // console.log('Desde archivo principal');

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
