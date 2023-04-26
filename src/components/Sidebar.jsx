import Link from "next/link"
import { useRouter } from "next/router"


export const Sidebar = () => {

    // Routing de next
    const router = useRouter()
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl">CRM Clientes</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "text-white p-2" : "p-2"}>
                    <Link
                        className="hover:text-gray-400 duration-300 ease-in-out"
                        href="/">
                        Clientes
                    </Link>
                </li>
                <li className={router.pathname === "/pedidos" ? "text-white p-2" : "p-2"}>
                    <Link
                        className="hover:text-gray-400 transition-all duration-300 ease-in-out"
                        href="/pedidos">
                        Pedidos
                    </Link>
                </li>
                <li className={router.pathname === "/productos" ? "text-white p-2" : "p-2"}>
                    <Link
                        className="hover:text-gray-400 duration-300 ease-in-out"
                        href="/productos">
                        Productos
                    </Link>
                </li>
            </nav>
        </aside >
    )
}
