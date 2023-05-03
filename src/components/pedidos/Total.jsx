import { useContext, useEffect, useState } from "react"
import PedidoContext from "@/context/pedidos/PedidoContext"

export const Total = () => {

    const [total, setTotal] = useState(0)

    const pedidoContext = useContext(PedidoContext)
    const { productos } = pedidoContext

    useEffect(() => {
        actualizarTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productos])

    const actualizarTotal = () => {
        let nuevoTotal = 0
        productos.map(producto => nuevoTotal += (producto.precio * producto.cantidad))
        setTotal(nuevoTotal)
    }

    return (
        <div
            className='flex flex-row justify-between border p-4 mt-4 rounded-xl bg-gray-800 text-white'
        >
            <h2>Total a pagar: </h2>
            <p>{total} €</p>
        </div>
    )
}
