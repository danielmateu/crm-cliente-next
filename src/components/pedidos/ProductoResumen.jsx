/* eslint-disable react-hooks/exhaustive-deps */
import PedidoContext from "@/context/pedidos/PedidoContext"
import { useContext, useEffect, useState } from "react"


export const ProductoResumen = ({ producto }) => {

    const { nombre, existencia, precio } = producto
    const [cantidad, setCantidad] = useState(0)

    const pedidoContext = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidoContext

    useEffect(() => {
        actualizarCantidad()
        actualizarTotal()
    }, [cantidad])

    const actualizarCantidad = () => {
        const nuevoProducto = { ...producto, cantidad: Number(cantidad) }
        cantidadProductos(nuevoProducto)
    }

    return (
        <div className='flex flex-row justify-between  p-2 hover:bg-gray-100 rounded-lg hover:text-gray-700 transition-all ease-in-out'>
            <p className='text-sm'>{nombre}</p>
            <p className='text-sm '>{precio} €</p>
            <input
                type="number"
                placeholder='Cantidad'
                min={0}
                max={existencia}
                className='outline-none border-gray-400 rounded-md w-3/12 text-center  bg-gray-500 text-white'
                onChange={e => setCantidad(e.target.value)}
                value={cantidad}
            />
        </div>
    )
}
