import Link from 'next/link'
import { useRouter } from "next/router"

export const Navigator = () => {

    const router = useRouter()
    
    return (
        // {/* <nav className="mt-5 list-none"> */}
        <nav className="flex list-none gap-2 md:flex-col mt-4">
            <li className={router.pathname === "/" ? "text-white " : ""}>
                <Link
                    className="hover:text-gray-400 duration-300 ease-in-out"
                    href="/">
                    Clientes
                </Link>
            </li>
            <li className={router.pathname === "/pedidos" ? "text-white " : ""}>
                <Link
                    className="hover:text-gray-400 transition-all duration-300 ease-in-out"
                    href="/pedidos">
                    Pedidos
                </Link>
            </li>
            <li className={router.pathname === "/productos" ? "text-white " : ""}>
                <Link
                    className="hover:text-gray-400 duration-300 ease-in-out"
                    href="/productos">
                    Productos
                </Link>
            </li>
        </nav>
    )
}
