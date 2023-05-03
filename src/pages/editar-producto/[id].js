import { Layout } from '@/components/Layout'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const OBTENER_PRODUCTO = gql`
query obtenerProducto($id: ID!){
    obtenerProducto(id : $id){
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
    // console.log(id);

    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }
    })

    // console.log(data)

    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    // Schema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
            .required('El nombre del producto es obligatorio'),
        existencia: Yup.number()
            .required('Agrega la cantidad disponible')
            .positive('No se aceptan números negativos')
            .integer('La existencia deben ser números enteros'),
        precio: Yup.number()
            .required('El precio es obligatorio')
            .positive('No se aceptan números negativos')
    })

    if (loading) return (
        <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>
    )

    if(!data) return (
        <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Acción no permitida</h4>
    )

    const actualizarInfoProducto = async valores => {
        // console.log(valores);
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

            // console.log(data);

            // Mostrar alerta
            Swal.fire(
                'Actualizado',
                'El producto se actualizó correctamente',
                'success'
            )

            // Redireccionar
            router.push('/productos')

        } catch (error) {
            console.log(error);
        }
    }

    const { obtenerProducto } = data

    return (
        <Layout>
            <h1 className="text-2xl text-gray-400 font-light">Editar Producto - {
                obtenerProducto.nombre
            }</h1>

            {/* Formulario para editar producto */}
            <Formik
                enableReinitialize
                initialValues={obtenerProducto}
                validationSchema={schemaValidacion}
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

                            {
                                props.touched.nombre && props.errors.nombre ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        {/* <p className="font-bold">Error</p> */}
                                        <p>{props.errors.nombre}</p>
                                    </div>
                                ) : null
                            }

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

                            {
                                props.touched.existencia && props.errors.existencia ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        {/* <p className="font-bold">Error</p> */}
                                        <p>{props.errors.existencia}</p>
                                    </div>
                                ) : null

                            }

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

                            {
                                props.touched.precio && props.errors.precio ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        {/* <p className="font-bold">Error</p> */}
                                        <p>{props.errors.precio}</p>
                                    </div>
                                ) : null
                            }

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