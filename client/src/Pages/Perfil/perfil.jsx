import React from 'react'
import './perfil.css'
import UserCards from "../../components/cards/userCards";
import { getAllUser } from "../../actions/user.jsx"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Perfil () {
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = React.useState(0);
  
    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);
  
    const allUsers = useSelector(state => state.users.getAllUser)
  
    const handleChange = (e, newvalue)=>{
        setSelectedTab(newvalue)
    }
  return(
    <UserCards users={allUsers}/>
  )
}
