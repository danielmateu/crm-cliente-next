import React from 'react'

export const Total = () => {

    const total = 2000

    return (
        <div
            className='flex flex-row justify-between border p-4 mt-4 rounded-xl bg-gray-800 text-white'
        >
            <h2>Total a pagar: </h2>
            <p>{total} €</p>
        </div>
    )
}
