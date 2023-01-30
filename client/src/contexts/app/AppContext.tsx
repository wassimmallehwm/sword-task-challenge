import React from 'react'
import { AuthProvider } from '../auth/AuthProvider'
import { SocketProvider } from '../socket/SocketProvider'

const AppContext = ({ children }: any) => {
    return (
        <AuthProvider>
            <SocketProvider>
                {children}
            </SocketProvider>
        </AuthProvider>
    )
}

export default AppContext