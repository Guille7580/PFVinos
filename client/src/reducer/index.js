
import { combineReducers } from 'redux';
import productosReducer from './productos';
import catReducer from './categorias';

const rootReducer = combineReducers({
    productosReducer,
    catReducer
})


export default rootReducer