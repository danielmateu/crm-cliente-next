import { useContext, useState } from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'
import { Layout } from '@/components/Layout'
import { AsignarCliente, AsignarProductos, ResumenPedido, Total } from '@/components/pedidos'
import 'animate.css';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input: $input){
        id
    }
}
`
const NuevoPedidoPage = () => {

    const router = useRouter()

    const [mensaje, setMensaje] = useState(null)
    // Utilizar context y utilizar sus valores
    const pedidoContext = useContext(PedidoContext)
    // console.log(pedidoContext);
    const { cliente, productos, total } = pedidoContext
    // Mutation para crear un nuevo pedido
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO)

    const crearNuevoPedido = async () => {

        const { id } = cliente
        // Remover lo no deseado de productos
        const pedido = productos.map(({ __typename, existencia, ...producto }) => producto)

        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })

            // Mostrar alerta
            Swal.fire(
                'Correcto',
                'El pedido se registró correctamente',
                'success'
            )

            // Redireccionar
            router.push('/pedidos')

        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''));

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }

    }

    const validarPedido = () => {
        // return !cliente?.id || productos.length === 0 || total === 0
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
    }

    const monstratAlerta = () => {

        return (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full my-3 text-center'>
                {/* <p className='font-bold'>Error</p> */}
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Nuevo Pedido</h1>

            <div className='flex justify-center mt-4 gap-4 animate__animated animate__fadeIn'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />

                    <button
                        type='button'
                        className={`${validarPedido()}bg-gray-800 w-full mt-5 p-2 text-white font-semibold  rounded-xl `}
                        onClick={crearNuevoPedido}
                    >
                        Registrar Pedido
                    </button>
                </div>

            </div>

            {mensaje && monstratAlerta()}

        </Layout>
    )
}

export default NuevoPedidoPage