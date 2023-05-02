import { gql, useQuery } from '@apollo/client'
import React from 'react'
import Select from 'react-select'

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

export const AsignarProductos = () => {

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

    if (loading) return 'Cargando...'

    const { obtenerProductos } = data

    return (
        <div className="flex flex-col gap-2">
            <p className='mt-3'>2.- Selecciona los productos</p>
            <Select
                options={obtenerProductos}
                isMulti={true}
                // onChange={opcion => seleccionarCliente(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} disponibles`}
                placeholder='Seleccione el producto'
                noOptionsMessage={() => 'No hay resultados'}
            />
        </div>
    )
}
