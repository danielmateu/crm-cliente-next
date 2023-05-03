import { Layout } from '@/components/Layout'
import Link from 'next/link'

const pedidosPage = () => {


    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Pedidos</h1>

            {/* Si no hay pedidos */}

            <p className='mt-5 text-center text-2xl'>No hay pedidos aún</p>

            <Link href='/nuevo-pedido'>
                <button
                    type='button'
                    className='bg-blue-400 hover:bg-blue-600 py-2 px-5 rounded text-white  transition-all ease-in-out mt-2'
                >Nuevo Pedido</button>
            </Link>
        </Layout>
    )
}

export default pedidosPage
