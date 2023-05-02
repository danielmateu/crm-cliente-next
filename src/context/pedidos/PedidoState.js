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

    const holamundoEnUseReducer = () => {
        console.log('Hola mundo desde useReducer');
    }
    // Modifica el cliente


    return(
        <PedidoContext.Provider
            value={{
                holamundoEnUseReducer,
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                dispatch
            }}
        >
            {children}
        </PedidoContext.Provider>

    )
}

export default PedidoState


