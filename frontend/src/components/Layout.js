import React from 'react';
import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <div className='main-container'>
        {children}
      </div>
    </div>
  )
}

export default Layout;