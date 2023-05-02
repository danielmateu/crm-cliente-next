import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import { Layout } from '@/components/Layout'


const NUEVO_PRODUCTO = gql`
mutation  nuevoProducto($input: ProductoInput) {
    nuevoProducto(input : $input){
        id
        nombre
        existencia
        precio
        creado
    }
}
`

const OBTENER_PRODUCTOS = gql`
query obtenerProductos{
    obtenerProductos{
        id
        nombre
        precio
        existencia
    }
}
`

const NuevoProductoPage = () => {

    const [mensaje, setMensaje] = useState(null)
    const router = useRouter()

    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, { data: { nuevoProducto } }) {
            // Obtener el objeto de cache que deseamos actualizar
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })

            // Reescribir ese objeto
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]

                }
            })

        }
    })

    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },

        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            existencia: Yup.number().required('La existencia es obligatoria').positive('No se aceptan numeros negativos').integer('Deben ser numeros enteros'),
            precio: Yup.number().required('El precio es obligatorio').positive('No se aceptan numeros negativos')
        }),
        onSubmit: async valores => {

            const { nombre, existencia, precio } = valores

            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia,
                            precio
                        }
                    },
                })
                // console.log(data);
                setMensaje(`Se creó correctamente el producto: ${data.nuevoProducto.nombre}`)

                setTimeout(() => {
                    setMensaje(null)
                    router.push('/productos')
                }, 3000);

            } catch (error) {
                console.log(error);
            }
        }

    })

    const mostrarMensaje = () => {
        return (
            // <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <div className={
                mensaje.includes('correctamente') ?
                    'bg-green-400 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto' :
                    'bg-red-400 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'
            }>
                <p>{mensaje}</p>
            </div>
        )

    }

    return (
        <Layout>
            <h1
                className='text-2xl text-gray-400 font-light'
            >Nuevo Producto</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='nombre'
                            >Nombre</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

                                id='nombre'
                                type='text'
                                placeholder='Nombre Producto'
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='existencia'
                            >Existencia</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

                                id='existencia'
                                type='number'
                                placeholder='Existencia Producto'
                                value={formik.values.existencia}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                        </div>

                        {formik.touched.existencia && formik.errors.existencia ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                <p>{formik.errors.existencia}</p>
                            </div>
                        ) : null}


                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='precio'
                            >Precio</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

                                id='precio'
                                type='number'
                                placeholder='Precio Producto'
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-start'>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}

                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white  font-semibold hover:bg-gray-900 rounded-xl'
                            value='Agregar Nuevo Producto'
                        />

                    </form>

                    {mensaje && mostrarMensaje()}

                </div>
            </div>


        </Layout>
    )
}

export default NuevoProductoPage