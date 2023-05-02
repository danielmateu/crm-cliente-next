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


    return(
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                dispatch,

                agregarCliente


            }}
        >
            {children}
        </PedidoContext.Provider>

    )
}

export default PedidoState


