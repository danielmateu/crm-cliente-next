import { useContext, useEffect, useState } from "react"
import PedidoContext from "@/context/pedidos/PedidoContext"

export const Total = () => {

    const pedidoContext = useContext(PedidoContext)
    const { total } = pedidoContext

    return (
        <div
            className='flex flex-row justify-between border p-4 mt-4 rounded-xl bg-gray-800 text-white'
        >
            <h2>Total a pagar: </h2>
            <p>{total} €</p>
        </div>
    )
}
