import Head from "next/head"
import { Sidebar } from "./Sidebar"
import { useRouter } from "next/router"
import { Header } from "./Header"

export const Layout = ({ children }) => {

    const router = useRouter()

    return (
        <>
            <Head>
                <title>CRM - admin de {
                    router.pathname === "/" ? "clientes" : router.pathname === "/pedidos" ? "pedidos" : "productos"
                    }</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {router.pathname === "/login" || router.pathname === '/nueva-cuenta'? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center text-center">
                    {children}
                </div>
            ) : (
                <div className="flex flex-col md:flex-row bg-gray-600 min-h-screen">
                    <Sidebar />
                    <main className="sm:min-h-screen p-5 w-full">
                    <Header/>
                        {children}
                    </main>
                </div>
            )}
        </>
    )
}
