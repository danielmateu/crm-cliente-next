import { Layout } from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Login Page</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
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

                            />
                        </div>

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

                            />
                        </div>

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