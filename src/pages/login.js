import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Layout } from '@/components/Layout'


const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input:$input){
            token
        }
    }
`

const LoginPage = () => {
    // State para el mensaje
    const [mensaje, setMensaje] = useState(null)
    // Router
    const router = useRouter()
    // Mutation para autenticar usuarios en apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

    // Validacion del formulario
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe ser de al menos 6 caracteres')
        }),
        onSubmit: async valores => {
            // console.log('enviando')
            // console.log(valores)
            const { email, password } = valores
            try {
                const { data } = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })

                // console.log(data)
                setMensaje(`Logueado correctamente...`)

                // Guardar token en localstorage
                setTimeout(() => {
                    const { token } = data.autenticarUsuario
                    localStorage.setItem('token', token)
                }, 1000);

                setTimeout(() => {
                    setMensaje(null)
                    router.push('/')
                }, 2000);

            } catch (error) {
                setMensaje(error.message.replace('ApolloError: ', ''))
                setTimeout(() => {
                    setMensaje(null)
                }, 3000);
                // console.log(error);
            }
        }
    })

    const mostrarMensaje = () => {
        return (
            <div className={mensaje.includes('correctamente') ? 'bg-green-100 border-l-4 border-green-500 text-green-700 p-4 animate-bounce' : 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 animate-bounce'}>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Login Page</h1>

            <div className='flex justify-center mt-5 '>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 py-6  '
                        onSubmit={formik.handleSubmit}
                    >
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
                        {
                            formik.touched.email && formik.errors.email ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                    {/* <p className='font-bold'>Error</p> */}
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null
                        }

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

                        {
                            formik.touched.password && formik.errors.password ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                    {/* <p className='font-bold'>Error</p> */}
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null
                        }

                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white rounded-xl  hover:bg-gray-900 transition-all duration-200 ease-in-out'
                            value='Iniciar Sesión'
                        />

                        {/* Si ya tiene cuenta */}
                        <div className='text-right pt-2'>
                            <Link
                                className='text-gray-400 text-sm hover:text-gray-600'
                                href='/nueva-cuenta'>
                                ¿Aun no tienes cuenta?
                            </Link>
                        </div>
                    </form>
                    {mensaje && mostrarMensaje()}
                </div>
            </div>

        </Layout>
    )
}

export default LoginPage