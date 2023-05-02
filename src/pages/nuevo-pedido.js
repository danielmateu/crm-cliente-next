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

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente
                        cliente={cliente} />
                    <AsignarProductos />
                </div>

            </div>

        </Layout>
    )
}

export default NuevoPedidoPage