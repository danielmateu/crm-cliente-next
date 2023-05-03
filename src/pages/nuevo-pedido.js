import { Layout } from '@/components/Layout'
import { AsignarCliente } from '@/components/pedidos/AsignarCliente'
import { AsignarProductos } from '@/components/pedidos/AsignarProductos'
import { ResumenPedido } from '@/components/pedidos/ResumenPedido'
import { Total } from '@/components/pedidos/Total'
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

            <div className='flex justify-center mt-4 gap-4'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente
                        cliente={cliente} />
                    <AsignarProductos />
                    <ResumenPedido/>
                    <Total/>

                    <button
                        type='button'
                        className='bg-gray-800 w-full mt-5 p-2 text-white font-semibold hover:bg-gray-900 rounded-xl'
                    >
                        Registrar Pedido
                    </button>
                </div>

            </div>

        </Layout>
    )
}

export default NuevoPedidoPage