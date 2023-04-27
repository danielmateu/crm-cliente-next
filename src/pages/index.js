import { Layout } from '@/components/Layout'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'


const OBTENER_CLIENTES_VENDEDOR = gql`
query obtenerClientesVendedor{
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}
`

export const Home = () => {

  const router = useRouter()

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_VENDEDOR)
  // console.log(data)

  if (loading) return (
    <h4 className='text-2xl bg-gray-800 font-light text-center justify-center h-screen text-white py-60'>Cargando...</h4>
  )

  if (!data.obtenerClientesVendedor) {
    return router.push('/login')
  }

  const vistaProtegida = () => {
    router.push('/login')
  }

  return (
    <>
      {
        data.obtenerClientesVendedor ? (
          <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Clientes</h1>

            <table className='table-auto shadow-md mt-10 w-full w-lg'>
              <thead className='bg-gray-800'>
                <tr className='text-white'>
                  <th className='w-1/5 py-2'>Nombre</th>
                  <th className='w-1/5 py-2'>Empresa</th>
                  <th className='w-1/5 py-2'>Email</th>
                  <th className='w-1/5 py-2'>Teléfono</th>

                </tr>
              </thead>
              <tbody className='bg-white'>
                {data.obtenerClientesVendedor.map(cliente => (
                  <tr key={cliente.id}>
                    <td className='border px-4 py-2'>{cliente.nombre} {cliente.apellido}</td>
                    <td className='border px-4 py-2'>{cliente.empresa}</td>
                    <td className='border px-4 py-2'>{cliente.email}</td>
                    <td className='border px-4 py-2'>{cliente.telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link href='/nuevo-cliente'>
              <button
                type='button'
                className='bg-blue-400 hover:bg-blue-600 py-2 px-5 rounded text-white  transition-all ease-in-out mt-2'
              >Nuevo Cliente</button>
            </Link>
          </Layout>

        ) : (
          vistaProtegida()
        )
      }
    </>
  )
}

export default Home
