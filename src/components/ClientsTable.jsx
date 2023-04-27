import React from 'react'

export const ClientsTable = ({data}) => {

    

    return (
        <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
                <tr className='text-white'>
                    <th className='w-1/5 py-2'>Nombre</th>
                    <th className='w-1/5 py-2'>Empresa</th>
                    <th className='w-1/5 py-2'>Email</th>
                </tr>
            </thead>
            <tbody className='bg-white'>
                {obtenerClientesVendedor.map(cliente => (
                    <tr key={cliente.id}>
                        <td className='border px-4 py-2'>{cliente.nombre} {cliente.apellido}</td>
                        <td className='border px-4 py-2'>{cliente.empresa}</td>
                        <td className='border px-4 py-2'>{cliente.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
