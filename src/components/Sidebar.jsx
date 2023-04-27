import { useRouter } from "next/router"
import { Navigator } from "./Navigator"

export const Sidebar = () => {

    const router = useRouter()

    return (
        // <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
        <aside className=" bg-gray-700 h-min p-6 items-center justify-between md:min-h-screen md:w-4/12">
            <p className="text-white text-2xl">CRM {
                router.pathname === "/" ? "Clientes" : router.pathname === "/pedidos" ? "Pedidos" : "Productos"
            }</p>
            <Navigator />
        </aside >
    )
}
