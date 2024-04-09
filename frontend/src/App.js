import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route,Navigate } from 'react-router-dom'
import Homepage from './components/Homepage'
import AddProject from './components/AddProject.js'
import UpdateProject from './components/UpdateProject.js'
import Signup from './components/auth/Signup.js'
import Login from './components/auth/Login.js'
const App = () => {
  return (
    <div>
    
       <Routes>
           
          <Route exact path='/register' element={<Signup/>}/>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<Homepage/>}/>
          <Route exact path='/addProject' element={<AddProject/>}/>
          <Route exact path='/updateProject/:id' element={<UpdateProject/>}/>
          
       </Routes>
    </div>
  )
}

export default App;