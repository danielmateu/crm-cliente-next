import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!){
    eliminarProducto(id : $id)
}
`

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

export const Producto = ({ producto }) => {

    const { nombre, existencia, precio, id} = producto;
    const router = useRouter();

    const [eliminarProductoMutation] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            const { obtenerProductos } = cache.readQuery({
                query: OBTENER_PRODUCTOS
            })

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            })
        }
    });

    const eliminarProducto = async id => {
        Swal.fire({
            title: 'Deseas eliminar el producto?',
            text: "Esta acción no se puede desacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await eliminarProductoMutation({
                        variables: {
                            id
                        }
                    })
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarProducto,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const editarProducto = () => {
        console.log('editando producto')
        router.push({
            pathname: "/editar-producto/[id]",
            query: { id }
        })
    }

    return (
        <tr>
            <td className='border px-4 py-2 '>{nombre}</td>
            <td className='border px-4 py-2'>{existencia}</td>
            <td className='border px-4 py-2'>{precio} €</td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='bg-sky-400 hover:bg-sky-600 py-2 px-4  text-white rounded text-xs uppercase font-semibold w-full mb-1'
                    onClick={editarProducto}
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='bg-red-400 hover:bg-red-600 py-2 px-4  text-white rounded text-xs uppercase font-semibold w-full'
                    onClick={() => eliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>

    )
}
