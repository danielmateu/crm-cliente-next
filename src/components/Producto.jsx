import { useRouter } from "next/router";



export const Producto = ({ producto }) => {

    const { nombre, existencia, precio, id} = producto;
    const router = useRouter();

    const editarProducto = () => {
        console.log('editando producto')
        router.push({
            pathname: "/editar-producto/[id]",
            query: { id }
        })
    }

    const eliminarProducto = id => {
        console.log('eliminando producto')
        

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
