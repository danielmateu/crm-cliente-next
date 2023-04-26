import { Layout } from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import React from 'react'



const LoginPage = () => {

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
        }
    })



    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Login Page</h1>

            <div className='flex justify-center mt-5 '>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 py-6 flex flex-col gap-2'
                        onSubmit={e => e.preventDefault()}
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
                        <Link
                            className='text-gray-400 text-sm hover:text-gray-600'
                            href='/nueva-cuenta'>
                            ¿Aun no tienes cuenta?
                        </Link>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default LoginPage