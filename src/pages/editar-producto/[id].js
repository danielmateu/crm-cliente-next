import { Layout } from '@/components/Layout'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const OBTENER_PRODUCTO = gql`
query obtenerProducto($id: ID!){
    obtenerProducto(id : $id){
        id
        nombre
        existencia
        precio
    }
}
`

const ACTUALIZAR_PRODUCTO = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput){
    actualizarProducto(id : $id, input: $input){
        id
        nombre
        existencia
        precio
    }
}
`


const EditarProductoPage = () => {

    const router = useRouter()
    const { query: { id } } = router

    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }

    })

    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)
    // console.log(data)

    const { obtenerProducto } = data
    const actualizarInfoProducto = async valores => {
        const { nombre, existencia, precio } = valores

        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencia,
                        precio
                    }
                }
            })

            // if (!data) return (
            //     <Layout>
            //         <h1 className="text-2xl text-gray-400 font-light">Editar Producto</h1>
            //         <div className="flex justify-center mt-5">
            //             <div className="w-full max-w-lg">
            //                 <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            //                     <p className="text-center text-gray-600">No se pudo obtener la informacion del producto</p>
            //                 </div>
            //             </div>
            //         </div>
            //     </Layout>
            // )

            Swal.fire(
                'Actualizado',
                'El producto se actualizo correctamente',
                'success'
            )
            router.push('/productos')


            // console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return (
        <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>
    )



    return (
        <Layout>
            <h1 className="text-2xl text-gray-400 font-light">Editar Producto - {
                obtenerProducto.nombre
            }</h1>

            {/* Formulario para editar producto */}
            <Formik
                enableReinitialize
                initialValues={obtenerProducto}
                onSubmit={async valores => {
                    actualizarInfoProducto(valores)
                }}
            >
                {props => {
                    return (
                        <form
                            className="bg-white shadow-md p-8 mt-4"
                            onSubmit={props.handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="nombre"
                                >Nombre</label>

                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    placeholder="Nombre Producto"
                                    value={props.values.nombre}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="existencia"
                                >Existencia</label>

                                <input
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="existencia"
                                    placeholder="Cantidad disponible"
                                    value={props.values.existencia}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />

                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="precio"
                                >Precio</label>

                                <input
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    placeholder="Precio Producto"
                                    value={props.values.precio}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white font-semibold hover:bg-gray-900 rounded-xl"
                                value="Editar Producto"
                            />
                        </form>
                    )
                }
                }
            </Formik>
        </Layout>
    )
}

export default EditarProductoPage