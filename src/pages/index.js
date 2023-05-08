import { Cliente } from '@/components/Cliente'
import { Layout } from '@/components/Layout'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import 'animate.css';


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

  return (
    <>
      {
        data.obtenerClientesVendedor ? (
          <Layout>
            {/* Si hay data, mostrar la tabla */}
            {
              data.obtenerClientesVendedor.length === 0 ? (
                <h4 className='text-2xl bg-gray-800 font-light text-center justify-center text-white py-6 rounded-xl'>No hay clientes registrados</h4>
              ) : (
                <>
                  <h1 className='text-2xl text-gray-400 font-light'>Clientes</h1>
                  <div className='animate__animated animate__fadeIn flex justify-center flex-col overflow-x-scroll' >
                    <table className='table-auto shadow-md mt-6 '>
                      <thead className='bg-gray-800'>
                        <tr className='text-white'>
                          <th className='w-1/5 py-2'>Nombre</th>
                          <th className='w-1/5 py-2'>Empresa</th>
                          <th className='w-1/5 py-2'>Email</th>
                          <th className='w-1/5 py-2'>Teléfono</th>
                          <th className='w-1/5 py-2'>Opciones</th>

                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {data.obtenerClientesVendedor.map(cliente => (
                          <Cliente
                            key={cliente.id}
                            cliente={cliente}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )
            }

            <Link href='/nuevo-cliente'>
              <button
                type='button'
                className='bg-blue-400 hover:bg-blue-600 py-2 px-5 rounded text-white  transition-all ease-in-out mt-2'
              >Nuevo Cliente</button>
            </Link>
          </Layout>

        ) : (
          // Si el usuario no esta autenticado, redireccionar al login
          router.push('/login')
        )
      }
    </>
  )
}

export default Home
