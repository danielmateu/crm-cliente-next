import PedidoContext from "@/context/pedidos/PedidoContext"
import { gql, useQuery } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import Select from "react-select"


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

    const pedidoContext = useContext(PedidoContext)
    const { agregarCliente } = pedidoContext

    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO)

    const clientes = data?.obtenerClientesVendedor

    useEffect(() => {
        // console.log(clientes)
        agregarCliente(cliente)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cliente])

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
