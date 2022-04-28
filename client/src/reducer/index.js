
import { combineReducers } from 'redux';
import productosReducer from './productos';
import catReducer from './categorias';
import loginReducer from './loginRegister'
import users from './user';


const rootReducer = combineReducers({
    productosReducer,
    catReducer,
    loginReducer,
    users
})


export default rootReducer