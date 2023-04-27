// import { obtenerUsuario } from "@/helpers/obtenerUsuario";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
    query obtenerUsuario($token: String!){
        obtenerUsuario(token: $token){
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

    const cerrarSesion = () => {
        // console.log('Cerrar Sesión');
        // Eliminar el token
        localStorage.removeItem('token');

        router.push('/login');
    }

    return (
        <header className="pb-4 flex flex-wrap gap-1 justify-between items-center">
            <p className="text-2xl font-light text-white">Hola: Dani</p>
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
