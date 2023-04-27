import { useRouter } from "next/router"
import { Navigator } from "./Navigator"

export const Sidebar = () => {

    const router = useRouter()

    return (
        // <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
        <aside className=" bg-gray-700 h-min p-6 items-center justify-between md:min-h-screen md:w-4/12">
            <p className="text-white text-2xl">CRM {
                router.pathname === "/" ? "clientes" : router.pathname === "/pedidos" ? "pedidos" : router.pathname === "/productos" ? "productos" : router.pathname === "/mejores-vendedores" ? "mejores vendedores" : router.pathname === "/mejores-clientes" ? "mejores clientes" : router.pathname === "/nuevo-cliente" ? "nuevo cliente" : router.pathname === "/nuevo-pedido" ? "nuevo pedido" : router.pathname === "/nuevo-producto" ? "nuevo producto" : router.pathname === "/editar-cliente/[id]" ? "editar cliente" : router.pathname === "/editar-pedido/[id]" ? "editar pedido" : router.pathname === "/editar-producto/[id]" ? "editar producto" : router.pathname === "/login" ? "login" : router.pathname === "/nueva-cuenta" ? "nueva cuenta" : ""
            }</p>
            <Navigator />
        </aside >
    )
}
