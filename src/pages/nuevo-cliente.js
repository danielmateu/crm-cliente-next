import { Layout } from '@/components/Layout'
import { Formik, useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const NuevoclientePage = () => {

    const [mensaje, setMensaje] = useState(null)



    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
            apellido: Yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener al menos 3 caracteres'),
            empresa: Yup.string().required('La empresa es obligatoria').min(3, 'La empresa debe tener al menos 3 caracteres'),
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            telefono: Yup.string().required('El telefono es obligatorio').min(10, 'El telefono debe tener al menos 10 caracteres')
        }),
        onSubmit: valores => {
            console.log(valores)
        }
    })


    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Nuevo cliente</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
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
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </div>

                        {
                            formik.touched.nombre && formik.errors.nombre ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                    {/* <p className='font-bold'>Error</p> */}
                                    <p>{formik.errors.nombre}</p>
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
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.apellido && formik.errors.apellido ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                    {/* <p className='font-bold'>Error</p> */}
                                    <p>{formik.errors.apellido}</p>
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
                                value={formik.values.empresa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.empresa && formik.errors.empresa ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                    {/* <p className='font-bold'>Error</p> */}
                                    <p>{formik.errors.empresa}</p>
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

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                                Teléfono
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='telefono'
                                type='tel'
                                placeholder='Teléfono cliente'
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.telefono && formik.errors.telefono ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                    {/* <p className='font-bold'>Error</p> */}
                                    <p>{formik.errors.telefono}</p>
                                </div>
                            ) : null
                        }
                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white rounded-xl  hover:bg-gray-900 transition-all duration-200 ease-in-out'
                            value='Registrar cliente'
                            
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoclientePage