import React from 'react'

export const Header = () => {
    return (
        <header className="flex justify-between items-center">
            <p className="text-2xl font-light text-white">Hola: Daniel</p>
            <button
                type="button"
                className="bg-red-400 py-2 px-5 rounded text-white hover:bg-red-600 transition-all ease-in-out"
            >
                Cerrar Sesión
            </button>
        </header>
    )
}
