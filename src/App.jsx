
import './App.css'
import Room from "./pages/Room"
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivateRoutes from './components/PrivateRoutes'
import {AuthProvider} from './utilis/AuthContext'
import RegisterPage from './pages/RegisterPage'
function App() {
  

  return (
    <Router>
      <AuthProvider>
      <Routes>
       
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Room/>}/>
            //room will only be access if authenticated user
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
