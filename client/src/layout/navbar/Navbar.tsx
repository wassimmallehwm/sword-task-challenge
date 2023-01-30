import React, { Fragment, useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext, SocketContext } from '@contexts/index'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { showToast, showNotif } from '@utils/toast'
import { useTranslation } from 'react-i18next'
import { Config } from '@config/Config'
import { Dropdown } from '@shared/components'
import logo from '../../assets/logo.png'
import { NotificationsIcon } from '@modules/notifications'
import { isManager } from '@utils/roles'



interface NavbarProps {
    toggleSidebar: any
}

const Navbar = ({
    toggleSidebar
}: NavbarProps) => {
    const { user, logout } = useContext(AuthContext)
    const { socket, disconnect } = useContext(SocketContext)
    const navigate = useNavigate()
    const { t } = useTranslation();

    const onLogout = () => {
        socket?.disconnect()
        disconnect()
        logout()
        navigate('/login')
    }

    const dropdownItems = [
        {
            id: 0,
            label: 'Sign out',
            onAction: onLogout
        }
    ]
    return (
        <header className="bg-slate-50 shadow-md h-16 flex items-center justify-center w-full border-b-2 border-b-gray-200">
            <div className="flex flex-grow items-center justify-between px-4 h-full">
                <div className='flex items-center justify-center'>
                    <button className="w-10 p-1 md:hidden"
                        onClick={toggleSidebar}
                        title="Toggle menu"
                        tabIndex={1}
                    >
                        <FaBars className="text-black" size="25px" />
                    </button>
                    <Link to="/">
                        <img src={logo} className="h-16 m-auto" alt="logo" />
                    </Link>
                </div>
                <ul className='hidden md:flex items-center justify-center h-full'>
                    {
                        Config.getMenu(user?.role!).map((menu: any) => (
                            <NavLink className="h-full"
                                key={menu.label} to={menu.url}>
                                <li className="px-2 h-full cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
                                    <span className="mx-4"> {t(`titles.${menu.label}`)} </span>
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>
                <div className='flex items-center gap-4'>
                    {
                        isManager(user?.role) ? 
                        <NotificationsIcon /> : null
                    }
                    <Dropdown trigger={(
                        <span>{user?.displayName}</span>
                    )}
                        list={dropdownItems} displayField="label" keyField='id'
                    />
                </div>

            </div>
        </header>
    )
}

export default Navbar