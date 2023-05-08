import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ELIMINAR_PEDIDO = gql`
mutation eliminarPedido($id :ID!){
    eliminarPedido(id : $id)
}
`

export const Pedido = ({ pedido }) => {
    
    const { id, total, cliente: { nombre, apellido}, estado } = pedido;
    
    
    const [estadoPedido, setEstadoPedido] = useState(estado)

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
    }, [estadoPedido])

    const handleChange = e => {
        // console.log(e.target.value);
        setEstadoPedido(e.target.value)
    }

    const eliminarPedido = () => {
        console.log('eliminando pedido');
        // Swal.fire({
        //     title: '¿Deseas eliminar este pedido?',
        //     text: "Esta acción no se puede deshacer",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#10B981',
        //     cancelButtonColor: '#EF4444',
        //     confirmButtonText: 'Confirmar',
        //     cancelButtonText: 'Cancelar'
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         try {
        //             const { data } = await eliminarPedido({
        //                 variables: {
        //                     id
        //                 }
        //             })
        //             console.log(data);
        //             Swal.fire(
        //                 'Eliminado',
        //                 data.eliminarPedido,
        //                 'success'
        //             )
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // })
    }

    return (
        <main className='flex justify-between bg-gray-200 p-4 rounded mb-4 shadow-lg'>
            <div className='flex flex-col gap-2 mb-4 '>
                <p className='font-bold'>Cliente: {nombre} {apellido}</p>
                {/* <p>Estado pedido: </p> */}
                <select name="" id="" className='p-2 appearance-none rounded leading-tight outline-none'
                    value={estadoPedido}
                    onChange={handleChange}
                >
                    <option
                        value="PENDIENTE"
                    >
                        PENDIENTE</option>
                    <option
                        value="COMPLETADO"
                    >
                        COMPLETADO</option>
                    <option
                        value="CANCELADO"
                    >
                        CANCELADO</option>
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold'>Resumen del pedido</h2>
                {
                    pedido.pedido.map(articulo => (
                        <div key={articulo.id} className='flex justify-between flex-col'>
                            <p className='text-gray-500 text-sm'>producto: {articulo.nombre} </p>
                            <p className='text-gray-500 text-sm'>cantidad: {articulo.cantidad}</p>
                        </div>
                    ))
                }
                <p className='font-bold text-gray-600'>Total a pagar: <span className='font-normal'> $ {total}</span></p>

                <button
                    className="bg-red-400 hover:bg-red-600 py-2 px-5 rounded text-white  transition-all ease-in-out"
                    onClick={eliminarPedido}
                >
                    Eliminar Pedido

                </button>
            </div>
        </main>
    )
}
