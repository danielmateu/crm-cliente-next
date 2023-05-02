
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const OBTENER_CLIENTES_VENDEDOR = gql`
query obtenerClientesVendedor{
    obtenerClientesVendedor{
        id
        nombre
        apellido
        empresa
        email
        telefono
    }
}
`
const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id :ID!){
        eliminarCliente(id : $id)
}
`

export const Cliente = ({ cliente }) => {

    const { nombre, apellido, empresa, email, telefono, id } = cliente;

    // Router
    const router = useRouter();

    const [eliminarClienteMutation] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            const { obtenerClientesVendedor } = cache.readQuery({
                query: OBTENER_CLIENTES_VENDEDOR
            })

            cache.writeQuery({
                query: OBTENER_CLIENTES_VENDEDOR,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
    })


    const eliminarCliente = id => {

        Swal.fire({
            title: 'Deseas eliminar al cliente?',
            text: "Esta acción no se puede desacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                const { data } = await eliminarClienteMutation({
                    variables: {
                        id
                    }
                })

                Swal.fire(
                    'Eliminado!',
                    data.eliminarCliente,
                    'success'
                )

                console.log(data)
            }
        })
    }

    const editarCliente = () => {
        // console.log('editando')
        router.push({
            pathname: "/editar-cliente/[id]",
            query: { id }
        })
    }

    return (
        <tr className='hover:bg-gray-100'>
            <td className='border px-4 py-2 '>
                <span className="flex items-center font-semibold">{nombre} {apellido}</span> </td>
            <td className='border px-4 py-2'>
                <span className="flex items-center justify-center">{empresa}</span></td>
            <td className='border px-4 py-2'>
                <span className="flex items-center justify-center">{email}</span></td>
            <td className='border px-4 py-2 '>
                <span className="flex items-center justify-center">{telefono}</span></td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='bg-sky-400 hover:bg-sky-600 py-2 px-4  text-white rounded text-xs uppercase font-semibold w-full mb-1'
                    onClick={editarCliente}
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='bg-red-400 hover:bg-red-600 py-2 px-4  text-white rounded text-xs uppercase font-semibold w-full'
                    onClick={() => eliminarCliente(id)}

                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
