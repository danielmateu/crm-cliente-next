import { Layout } from "@/components/Layout"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from 'yup'
import Swal from "sweetalert2"

const OBTENER_CLIENTE = gql`
query obtenerCliente($id: ID!) {
    obtenerCliente(id : $id){
        nombre
        apellido
        email
        telefono
        empresa
    }
}
`
const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($id : ID!, $input: ClienteInput){
        actualizarCliente(id: $id, input: $input){
            nombre
            email
        }
}
`
const EditarClientePage = () => {
    // Obtener el ID actual
    const router = useRouter()
    const { query: { id } } = router

    // Consultar para obtener el cliente
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });

    // Actualizar el cliente
    const [actualizarClienteMutation] = useMutation(ACTUALIZAR_CLIENTE)

    // Schema de validación
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .min(3, 'El nombre debe tener al menos 3 caracteres'),
        apellido: Yup.string()
            .required('El apellido es obligatorio')
            .min(3, 'El apellido debe tener al menos 3 caracteres'),
        empresa: Yup.string()
            .required('La empresa es obligatoria')
            .min(3, 'La empresa debe tener al menos 3 caracteres'),
        email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
        telefono: Yup.string()
            .required('El telefono es obligatorio')
            .min(10, 'El telefono debe tener al menos 10 caracteres')
    })

    // console.log(data)
    // console.log(loading)
    // console.log(error)

    if (loading) return <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>;

    // console.log(data.obtenerCliente.nombre)

    const { obtenerCliente } = data

    // Modifica el cliente en la base de datos
    const actualizarInfoCliente = async valores => {
        const { nombre, apellido, empresa, email, telefono } = valores

        try {
            const { data } = await actualizarClienteMutation({
                variables: {
                    id,
                    input: {
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }
            })
            // console.log(data)
            // Mostrar alerta
            Swal.fire(
                'Actualizado!',
                'El cliente se actualizó correctamente',
                'success'
            )
            // Redireccionar
            router.push('/')
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Página de edición de cliente - <span className='font-semibold'>{data.obtenerCliente.nombre}</span></h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        validationSchema={schemaValidacion}
                        enableReinitialize
                        initialValues={obtenerCliente}
                        onSubmit={async (valores) => {
                            console.log(valores);
                            actualizarInfoCliente(valores)
                        }
                        }
                    >
                        {props => {
                            // console.log(props);
                            return (
                                <form
                                    onSubmit={props.handleSubmit}
                                    className='bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl'
                                >
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                            Nombre
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nombre'
                                            type='text'
                                            placeholder='Nombre cliente'
                                            value={props.values.nombre}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}

                                        />
                                    </div>

                                    {
                                        props.touched.nombre && props.errors.nombre ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                                <p>{props.errors.nombre}</p>
                                            </div>
                                        ) : null
                                    }

                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                                            Apellido
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='apellido'
                                            type='text'
                                            placeholder='Apellido cliente'
                                            value={props.values.apellido}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {
                                        props.touched.apellido && props.errors.apellido ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>

                                                <p>{props.errors.apellido}</p>
                                            </div>
                                        ) : null
                                    }

                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                                            Empresa
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='empresa'
                                            type='text'
                                            placeholder='Empresa cliente'
                                            value={props.values.empresa}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {
                                        props.touched.empresa && props.errors.empresa ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>

                                                <p>{props.errors.empresa}</p>
                                            </div>
                                        ) : null
                                    }

                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                            Email
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='email'
                                            type='email'
                                            placeholder='Email cliente'
                                            value={props.values.email}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {
                                        props.touched.email && props.errors.email ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                                <p>{props.errors.email}</p>
                                            </div>
                                        ) : null
                                    }

                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                                            Teléfono
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='telefono'
                                            type='tel'
                                            placeholder='Teléfono cliente'
                                            value={props.values.telefono}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {
                                        props.touched.telefono && props.errors.telefono ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>

                                                <p>{props.errors.telefono}</p>
                                            </div>
                                        ) : null
                                    }
                                    <input
                                        type='submit'
                                        className='bg-gray-800 w-full mt-5 p-2 text-white rounded-xl  hover:bg-gray-900 transition-all duration-200 ease-in-out'
                                        value='Editar cliente'

                                    />
                                </form>)
                        }}
                    </Formik>
                    {/* {
                        mensaje && mostrarMensaje()
                    } */}
                </div>
            </div>
        </Layout>
    )
}

export default EditarClientePage