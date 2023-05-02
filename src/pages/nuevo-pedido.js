import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react'
import Select from 'react-select'



const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const NuevoPedidoPage = () => {

    const [sabores, setSabores] = useState([])

    useEffect(() => {
        console.log(sabores)
    }, [sabores])

    const seleccionarSabor = sabor => {
        setSabores(sabor)
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-400 font-light'>Nuevo Pedido</h1>

            <Select
                options={options}
                isMulti={true}
                onChange={opcion => seleccionarSabor(opcion)}
            />
        </Layout>
    )
}

export default NuevoPedidoPage