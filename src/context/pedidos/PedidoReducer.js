import { SELECCIONAR_PRODUCTO, SELECCIONAR_CLIENTE, CANTIDAD_PRODUCTOS } from "@/types"

export const PedidoReducer = (state, action) => {

    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            }
        case CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        default:
            return state
    }
}

