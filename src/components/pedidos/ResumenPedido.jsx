import PedidoContext from '@/context/pedidos/PedidoContext'
import { useContext } from 'react'
import { ProductoResumen } from './ProductoResumen'

export const ResumenPedido = () => {

    const pedidoContext = useContext(PedidoContext)
    const { productos, id } = pedidoContext

    // console.log(productos)

    return (

        <div className='flex flex-col gap-2'>
            <p className='mt-3'>3.- Ajusta las cantidades del producto</p>
            <div className='bg-gray-800 p-5 rounded-xl text-white'>
                {/* Si no hay productos */}
                {
                    productos.length === 0
                        ? <p className='text-center text-gray-400'>No hay productos seleccionados</p>
                        : productos.map(producto => (
                            <ProductoResumen
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                }
            </div>
        </div>






    )
}
