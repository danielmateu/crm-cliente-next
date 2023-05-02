import { Layout } from '@/components/Layout'
import { AsignarCliente } from '@/components/pedidos/AsignarCliente'
import { AsignarProductos } from '@/components/pedidos/AsignarProductos'
import PedidoContext from '@/context/pedidos/PedidoContext'
import { useContext } from 'react'



const NuevoPedidoPage = () => {

    // Utilizar context y utilizar sus valores
    const pedidoContext = useContext(PedidoContext)
    // console.log(pedidoContext);
    const { cliente } = pedidoContext



    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Nuevo Pedido</h1>

            <AsignarCliente
                cliente={cliente}
            />

            <AsignarProductos/>
        </Layout>
    )
}

export default NuevoPedidoPage