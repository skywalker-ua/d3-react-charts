import React from 'react'
import './styles.css'

const Layout = ({ children }) => {
    return(
        <div className="children">
            {children}
        </div>
    );
}

export default Layout;