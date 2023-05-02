
import client from '@/config/apollo'
import { ApolloProvider } from '@apollo/client'
import '@/styles/globals.css'
import PedidoState from '@/context/pedidos/PedidoState'

export default function App({ Component, pageProps }) {

  // console.log('Desde archivo principal');

  return (
    <ApolloProvider client={client}>
      <PedidoState>
        <Component {...pageProps} />
      </PedidoState>
    </ApolloProvider>
  )
}
