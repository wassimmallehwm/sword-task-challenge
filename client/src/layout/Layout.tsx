import React, { useContext, useEffect, useState } from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import { AuthContext, SocketContext } from '@contexts/index'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    const { socket, connect, disconnect } = useContext(SocketContext)
    const [isSidebarOpen, openSidebar] = useState<boolean>(false)


    useEffect(() => {
        if (user) {
            disconnect()
            connect(user)
        }

        return () => {
            disconnect()
        }
    }, [])

    const toggleSidebar = () => {
        openSidebar(prev => !prev)
    }
    return (
        <>
            {
                user ? (
                    <>
                        <Navbar toggleSidebar={toggleSidebar} />
                        <Sidebar isOpen={isSidebarOpen} close={() => openSidebar(false)}></Sidebar>
                        {
                            isSidebarOpen ? (
                                <div onClick={() => openSidebar(false)} className='top-0 left-0 w-full h-full fixed bg-black bg-opacity-40 z-10'></div>
                            ) : null
                        }
                    </>
                ) : null
            }

            <main className='bg-slate-50 fixed w-full h-full overflow-auto'>
                {children}
            </main>
        </>
    )
}

export default Layout
