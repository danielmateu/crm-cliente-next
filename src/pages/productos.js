import { Layout } from '@/components/Layout'
import { Producto } from '@/components/Producto'
import { gql, useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'


const OBTENER_PRODUCTOS = gql`
query obtenerProductos{
    obtenerProductos{
        id
        nombre
        precio
        existencia
    }
}
`

const ProductosPage = () => {

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

    const { obtenerProductos } = data || { obtenerProductos: [] }

    if (loading) return (
        <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>
    )



    return (
        <>
            {
                data.obtenerProductos ? (<Layout>
                    <h1 className='text-2xl text-gray-400 font-light'>Productos</h1>

                    <div className='animate__animated animate__fadeIn flex justify-center flex-col' >
                        <table className='table-auto shadow-md mt-6 '>
                            <thead className='bg-gray-800'>
                                <tr className='text-white'>
                                    <th className='w-1/5 py-2'>Nombre</th>
                                    <th className='w-1/5 py-2'>Existencia</th>
                                    <th className='w-1/5 py-2'>Precio</th>
                                    <th className='w-1/5 py-2'>Opciones</th>

                                </tr>
                            </thead>

                            <tbody className='bg-white'>
                                {
                                    obtenerProductos.map(producto => (
                                        <Producto
                                            key={producto.id}
                                            producto={producto}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                        <Link href='/nuevo-producto'>
                            <button
                                type='button'
                                className='bg-blue-400 hover:bg-blue-600 py-2 px-5 rounded text-white  transition-all ease-in-out mt-2'
                            >Crear producto</button>
                        </Link>
                    </div>
                </Layout>) : (
                    <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>No hay productos</h4>
                )
            }
        </>
    )
}

export default ProductosPage