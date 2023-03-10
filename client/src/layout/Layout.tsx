import { useContext, useEffect, useState } from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import { AuthContext, SocketContext } from '@contexts/index'
import { useTranslation } from 'react-i18next'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    const { connect, disconnect } = useContext(SocketContext)
    const [isSidebarOpen, openSidebar] = useState<boolean>(false)
    const {t} = useTranslation()
    document.title = t('app_name')


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
