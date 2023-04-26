import { Layout } from '@/components/Layout'
import { useFormik } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { useRouter } from 'next/router'

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput){
        nuevoUsuario(input: $input){
            id
            nombre
            apellido
            email
        }
    }
`

const NuevaCuentaPage = () => {

    // state para el mensaje
    const [mensaje, setMensaje] = useState(null)

    // Mutation para crear nuevos usuarios
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA)

    const router = useRouter()

    // Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe ser de al menos 3 caracteres'),
            apellido: Yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe ser de al menos 3 caracteres'),
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe ser de al menos 6 caracteres')
        }),
        onSubmit: async valores => {
            // console.log('enviando')
            // console.log(valores)

            const { nombre, apellido, email, password } = valores

            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })

                // Usuario creado correctamente
                // Mostrar el mensaje durante 2 segundos
                setMensaje(`Se creo correctamente el usuario: ${data.nuevoUsuario.nombre}`)
                setTimeout(() => {
                    router.push('/login')
                    setMensaje(null)
                }, 2000)

                // Redireccionar a login
            } catch (error) {
                setMensaje(error.message.replace('ApolloError: ', ''))
                setTimeout(() => {
                    setMensaje(null)
                }, 2000)
                // console.log(error);
            }
        },
    })

    // if (loading) return 'Cargando...'

    const mostrarMensaje = () => {
        return (
            <div className={mensaje.includes('correctamente') ? 'bg-green-100 border-l-4 border-green-500 text-green-700 p-4 animate-bounce' : 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 animate-bounce'}>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Nueva Cuenta</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 py-6 flex flex-col gap-2'
                        onSubmit={formik.handleSubmit}

                    >
                        <div className='mb-4 text-start'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='nombre'
                            >
                                Nombre
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='nombre'
                                type='text'
                                placeholder='Nombre Usuario'
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                {/* <p className='font-bold'>Error</p> */}
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}

                        <div className='mb-4 text-start'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='apellido'
                            >
                                Apellido
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='apellido'
                                type='text'
                                placeholder='Apellido Usuario'
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </div>

                        {formik.touched.apellido && formik.errors.apellido ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                {/* <p className='font-bold'>Error</p> */}
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null}

                        <div className='mb-4 text-start'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='email'
                            >
                                Email
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='email'
                                type='email'
                                placeholder='Email Usuario'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                {/* <p className='font-bold'>Error</p> */}
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className='mb-4 text-start'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='password'
                            >
                                Password
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='password'
                                type='password'
                                placeholder='Password Usuario'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                {/* <p className='font-bold'>Error</p> */}
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}

                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white rounded-xl  hover:bg-gray-900 transition-all duration-200 ease-in-out'
                            value='Crear Cuenta'
                        />
                        {/* Si ya tiene cuenta */}
                        <Link
                            className='text-gray-400 text-sm hover:text-gray-600'
                            href='/login'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </form>
                    {mensaje && mostrarMensaje()}

                </div>
            </div>
        </Layout>
    )
}

export default NuevaCuentaPage