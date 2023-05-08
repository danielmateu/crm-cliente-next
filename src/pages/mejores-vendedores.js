import { Layout } from '@/components/Layout'
import { gql, useQuery } from '@apollo/client';

import React, { PureComponent } from 'react';
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

// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];

const MejoresVendedoresPage = () => {


    const { data, loading, error } = useQuery(MEJORES_VENDEDORES)

    console.log(data.mejoresVendedores);
    console.log(loading);
    console.log(error);

    const { mejoresVendedores } = data

    const vendedorGrafica = []

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

    console.log(vendedorGrafica);


    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Mejores Vendedores</h1>

            {/* <ResponsiveContainer width="100%" height="100%"> */}
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
            {/* </ResponsiveContainer> */}
        </Layout>
    )
}

export default MejoresVendedoresPage