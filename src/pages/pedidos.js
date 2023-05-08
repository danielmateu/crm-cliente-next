import { Layout } from '@/components/Layout'
import { Pedido } from '@/components/Pedido'
import Link from 'next/link'
import 'animate.css';

import { gql, useQuery } from '@apollo/client'

const OBTENER_PEDIDOS_VENDEDOR = gql`
query obtenerPedidosVendedor {
    obtenerPedidosVendedor{
        id
        pedido{
            id
            cantidad
            nombre
        }
        cliente{
            id
            nombre
            apellido
            email
            telefono
        }
        vendedor
        total
        estado
    }
}
`

const PedidosPage = () => {

    const { data, loading, error } = useQuery(OBTENER_PEDIDOS_VENDEDOR)

    // console.log(data);

    const pedidos = data?.obtenerPedidosVendedor
    // console.log(pedidos);

    if (loading) return 'Cargando...'


    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Pedidos</h1>

            {/* Si no hay pedidos */}
            {
                pedidos.length === 0 ? (
                    <p className='mt-5 text-center text-2xl'>No hay pedidos aún</p>
                ) : (
                    <ul className='animate__animated animate__fadeIn mt-6'>
                        {pedidos.map(pedido => (
                            <Pedido
                                key={pedido.id}
                                pedido={pedido}
                            />
                        ))}
                    </ul>
                )

            }

            <Link href='/nuevo-pedido'>
                <button
                    type='button'
                    className='bg-blue-400 hover:bg-blue-600 py-2 px-5 rounded text-white  transition-all ease-in-out mt-2'
                >Nuevo Pedido</button>
            </Link>
        </Layout>
    )
}

export default PedidosPage
