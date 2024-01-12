import React from "react";
import { Outlet , Navigate} from "react-router-dom";
import { useAuth } from "../utilis/AuthContext";

//Outlet will help to create parent route
// so if authenticated then it will pass to child route
//else redirect them to login page
const PrivateRoutes = () =>{
    const {user} = useAuth()
    return(
    <>
        {user ? <Outlet/> : <Navigate to = '/login'/>}
    </>
    )
}
export default PrivateRoutes