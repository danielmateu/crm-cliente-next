import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

const EditarProductoPage = () => {

    const router = useRouter()
    const { query: { id } } = router

    return (
        <Layout>
            <h1 className="text-2xl text-gray-400 font-light">Editar Producto</h1>

        </Layout>
    )
}

export default EditarProductoPage