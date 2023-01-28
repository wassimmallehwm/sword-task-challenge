import React from 'react'
import { AuthProvider } from './auth/AuthProvider'
import { ErrorProvider } from './error/ErrorProvider'
import { SocketProvider } from './socket/SocketProvider'

const AppContext = ({ children }: any) => {
    return (
        <ErrorProvider>
            <AuthProvider>
                <SocketProvider>
                        {children}
                </SocketProvider>
            </AuthProvider>
        </ErrorProvider>
    )
}

export default AppContext