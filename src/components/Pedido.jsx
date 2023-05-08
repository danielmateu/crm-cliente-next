import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ELIMINAR_PEDIDO = gql`
mutation eliminarPedido($id :ID!){
    eliminarPedido(id : $id)
}
`

export const Pedido = ({ pedido }) => {

    const { id, total, cliente: { nombre, apellido, telefono, email }, estado } = pedido;
    // console.log(pedido);
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
            <div className='flex flex-col gap-1 mb-4 '>
                <p className='font-semibold flex'>Cliente: {nombre} {apellido}</p>
                {
                    email && <p className='font-semibold flex items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg><span className='font-semibold text-gray-500'> : {email}</span></p>
                }
                {
                    telefono && <p className='font-semibold flex items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                        <span className='font-semibold text-gray-500'> : {telefono}</span></p>
                }
                {/* <p>Estado pedido: </p> */}
                <select name="" id="" className='p-2 appearance-none rounded leading-tight outline-none mt-2'
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
