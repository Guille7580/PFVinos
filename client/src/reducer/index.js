
import { combineReducers } from 'redux';
import productosReducer from './productos';
import catReducer from './categorias';
import loginReducer from './loginRegister'
import users from './user';
import pedidosReducer from './pedidos'

const rootReducer = combineReducers({
    productosReducer,
    catReducer,
    loginReducer,
    users,
    pedidosReducer
   })


export default rootReducer