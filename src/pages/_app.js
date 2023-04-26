
import client from '@/config/apollo'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'

export default function App({ Component, pageProps }) {

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
