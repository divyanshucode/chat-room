import { useContext } from "react";
import { createContext,useState,useEffect } from "react";

import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";


const AuthContext=createContext()

/*purpose of this context is to manage user 
authentication and provide the authentication 
state to components within your application
*/

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    useEffect(() =>{
         getUserOnLoad()
    },[])

    //getuseronload will help to persist user after login , 
    //so once we logged in refreshing wont take us back to login
    const getUserOnLoad = async () =>{
        try{
            const accountDetails = await account.get()
            console.log('accountDetails',accountDetails)
            setUser(accountDetails )

        }catch(error){
            console.info(error)

        }
        setLoading(false)
    }

    const handleUserLogin = async (e,credentials) =>{
        e.preventDefault()
        try{
           const response = await account.createEmailSession(credentials.email,credentials.password) 
            
            const accountDetails = await account.get()
            setUser(accountDetails )
            navigate('/')
        
        } catch(error){
            console.error(error)
            }
        }

    const handleUserLogout = async () =>{
        await account.deleteSession('current')
        setUser(null)
    }

    const handleUserRegistration = async (e,credentials) =>{
        e.preventDefault()

        if(credentials.password1 !== credentials.password2){
            alert('Password do not match!')
            return
        }
        try{

            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
                
                
                )
                await account.createEmailSession(credentials.email,credentials.password1)
                const accountDetails = await account.get()
                console.log('accountDetails',accountDetails)
                setUser(accountDetails )
                navigate('/')


            
        }catch(error){
            console.error(error)

        }

    }


    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegistration 
        


    }
    return <AuthContext.Provider value={contextData}>
        {loading?<p>Loading...</p>:children}
    </AuthContext.Provider>
    /*
    Wrap your components into a context provider
     to specify the value 
    of this context for all components inside:
    */

}
export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext