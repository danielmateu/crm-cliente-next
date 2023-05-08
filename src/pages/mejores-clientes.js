import { Layout } from '@/components/Layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const MEJORES_CLIENTES = gql`
query mejoresClientes{
    mejoresClientes{
        cliente{
            nombre
            empresa
        }
        total
    }
}
`

const MejoresClientesPage = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return (
        <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>
    )

    const { mejoresClientes } = data

    // console.log(mejoresClientes);

    const clientesGrafica = []

    mejoresClientes.map((cliente, index) => {
        clientesGrafica[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        }
    })

    // console.log(clientesGrafica);

    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Mejores Clientes</h1>
            <BarChart
                className='mt-10 bg-white shadow-md rounded-lg '
                width={600}
                height={500}
                data={clientesGrafica}
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

export default MejoresClientesPage