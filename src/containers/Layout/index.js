import React from 'react'
import Header from '../../components/Header'
import './styles.css'

const Layout = ({ children }) => {
    return(
        <div>
            <Header />
            <div className="children">
                {children}
            </div>
        </div>
    );
}

export default Layout;