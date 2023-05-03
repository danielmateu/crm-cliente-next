import PedidoContext from '@/context/pedidos/PedidoContext'
import { gql, useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
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

    // State local del componente
    const [productos, setProductos] = useState([])

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const { agregarProducto } = pedidoContext

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

    useEffect(() => {
        // Funcion para pasar a PedidoState
        // console.log(productos)
        agregarProducto(productos)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productos])


    const seleccionarProducto = (opcion) => {
        // console.log(opcion)
        setProductos(opcion)
    }

    if (loading) return 'Cargando...'

    const { obtenerProductos } = data

    return (
        <div className="flex flex-col gap-2">
            <p className='mt-3'>2.- Selecciona los productos</p>
            <Select
                options={obtenerProductos}
                isMulti={true}
                onChange={opcion => seleccionarProducto(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} unidades`}
                placeholder='Seleccione el producto'
                noOptionsMessage={() => 'No hay resultados'}
            />
        </div>
    )
}
