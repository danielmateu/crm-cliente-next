import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import Select from "react-select"



// const clientes = [
//     { id: 1, nombre: 'Daniel' },
//     { id: 2, nombre: 'Mateu' },
//     { id: 3, nombre: 'Daniel Mateu' }
// ]

const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor{
    obtenerClientesVendedor{
        nombre
        apellido
        empresa
        email
    }
}
`

export const AsignarCliente = () => {

    const [cliente, setCliente] = useState([])
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO)

    const clientes = data?.obtenerClientesVendedor

    useEffect(() => {
        console.log(clientes)
    }, [clientes])

    const seleccionarCliente = sabor => {
        setCliente(sabor)
    }

    if (loading) return 'Cargando...'

    const { obtenerClientesVendedor } = data

    return (
        <div className="flex flex-col gap-2">
            <p className='mt-3'>1.- Asigna un cliente al pedido</p>
            <Select
                options={obtenerClientesVendedor}
                // isMulti={true}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => opciones.nombre}
                placeholder='Seleccione el cliente'
                noOptionsMessage={() => 'No hay resultados'}
            />
        </div>
    )
}
