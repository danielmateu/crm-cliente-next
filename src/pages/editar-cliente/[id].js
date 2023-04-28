import { Layout } from "@/components/Layout"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from 'yup'


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
    })


    console.log(data)
    // console.log(loading)
    // console.log(error)

    // Schema de validación
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
            .required('El nombre del cliente es obligatorio'),
        apellido: Yup.string()
            .required('El apellido del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El campo empresa es obligatorio'),
        email: Yup.string()
            .email('Email no válido')
            .required('El email del cliente es obligatorio'),
    })

    if (loading) return 'Cargando...';

    // Actualizar el cliente
    // const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE)

    // Schema de validación


    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Página de edición de cliente</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        validationSchema={schemaValidacion}

                    >
                        {props => {

                            console.log(props);

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
                                            // value={formik.values.nombre}
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
                                            // value={formik.values.apellido}
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
                                            // value={formik.values.empresa}
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
                                            // value={formik.values.email}
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
                                            // value={formik.values.telefono}
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