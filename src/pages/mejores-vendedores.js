import { Layout } from '@/components/Layout'
import { gql, useQuery } from '@apollo/client';

import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MEJORES_VENDEDORES = gql`
query mejoresVendedores{
    mejoresVendedores{
        vendedor{
            nombre
            email
        }
        total
    }
}
`


const MejoresVendedoresPage = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    // console.log(data);
    if (loading) return (
        <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>
    )

    const { mejoresVendedores } = data

    const vendedorGrafica = []

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

    // console.log(vendedorGrafica);

    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Mejores Vendedores</h1>
            <BarChart
                className='mt-10 bg-white shadow-md rounded-lg '
                width={600}
                height={500}
                data={vendedorGrafica}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3182CE" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>

        </Layout>
    )
}

export default MejoresVendedoresPage