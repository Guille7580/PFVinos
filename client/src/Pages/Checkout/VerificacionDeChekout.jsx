import { useSelector } from "react-redux";
import Iniciar from "../IniciarSession/iniciar"


export default function VerificacionDeChekout() {
    const user = useSelector((state) => state.users.getUser)
    console.log(user)


    return (
        <div>{user.length === 0? (<Iniciar/>) : (<div>chekout</div>)} </div>
       
    )

    
}