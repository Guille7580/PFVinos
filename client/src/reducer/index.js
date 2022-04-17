
import { combineReducers } from 'redux';
import productosReducer from './productos';
import catReducer from './categorias';
import loginReducer from './loginRegister'

const rootReducer = combineReducers({
    productosReducer,
    catReducer,
    loginReducer
})


export default rootReducer