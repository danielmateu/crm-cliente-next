import { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import { CANTIDAD_PRODUCTOS, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO } from "@/types";
import { PedidoReducer } from "./PedidoReducer";

const PedidoState = ({ children }) => {

    // State de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    // Modifica el cliente
    const agregarCliente = cliente => {
        // console.log('Cliente');
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente

        })
    }

    // Modifica los productos
    const agregarProducto = productosSeleccionados => {
        // console.log(productosSeleccionados);
        let nuevoState
        if (state.productos.length > 0) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)
                return { ...producto, ...nuevoObjeto }
            })
        } else {
            nuevoState = productosSeleccionados
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })

    }

    return(
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                dispatch,

                agregarCliente,
                agregarProducto


            }}
        >
            {children}
        </PedidoContext.Provider>

    )
}

export default PedidoState


