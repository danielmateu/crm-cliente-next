// import { obtenerUsuario } from "@/helpers/obtenerUsuario";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
    }
}
`

export const Header = () => {

    const router = useRouter();

    // Obtener el nombre del usuario desde apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    // console.log(data);

    // Proteger que no accedamos a data antes de tener resultados
    if(loading) return null;

    const { nombre, apellido } = data?.obtenerUsuario;

    const cerrarSesion = () => {
        // console.log('Cerrar Sesión');
        // Eliminar el token
        localStorage.removeItem('token');

        router.push('/login');
    }

    return (
        <header className="pb-4 flex flex-wrap gap-1 justify-between items-center">
            <p className="font-light text-white">Hola: { nombre } { nombre ? '😊' : ''}</p>
            <button
                onClick={cerrarSesion}
                type="button"
                className="bg-red-400 py-2 px-5 rounded text-white hover:bg-red-600 transition-all ease-in-out"
            >
                Cerrar Sesión
            </button>
        </header>
    )
}
