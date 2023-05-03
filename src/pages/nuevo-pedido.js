import { useContext } from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'
import { Layout } from '@/components/Layout'
import { AsignarCliente, AsignarProductos, ResumenPedido, Total } from '@/components/pedidos'
import 'animate.css';

const NuevoPedidoPage = () => {

    // Utilizar context y utilizar sus valores
    const pedidoContext = useContext(PedidoContext)
    // console.log(pedidoContext);
    const { cliente } = pedidoContext
    // console.log(cliente);

    const registrarPedido = () => {
        console.log(cliente, 'Registrar pedido');
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Nuevo Pedido</h1>

            <div className='flex justify-center mt-4 gap-4 animate__animated animate__fadeIn'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente
                        // cliente={cliente}
                    />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />

                    <button
                        type='button'
                        className='bg-gray-800 w-full mt-5 p-2 text-white font-semibold hover:bg-gray-900 rounded-xl'
                        onClick={registrarPedido}
                    >
                        Registrar Pedido
                    </button>
                </div>

            </div>

        </Layout>
    )
}

export default NuevoPedidoPage