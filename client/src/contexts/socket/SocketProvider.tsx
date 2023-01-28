import React, { useReducer } from 'react';
import { io, Socket } from 'socket.io-client';
import { Config } from '@config/Config';
import { SocketContext } from './SocketContext';
import { Account } from '@modules/users/models/Account';


const initState = {
    socket: null
}


function socketReducer(state: any, action: any) {
    switch (action.type) {
        case 'CONNECT':
            return {
                ...state,
                socket: action.payload
            }
        case 'DISCONNECT':
            return {
                ...state,
                socket: null
            }
        default:
            return state
    }
}

export const SocketProvider = (props?: any) => {
    const [state, dispatch] = useReducer(socketReducer, initState);

    const connect = (user: Account) => {
        const socket = io(
            Config.getConfig().socketUrl, {
            transports: ['websocket'],
            secure: true,
            autoConnect: true,
            reconnection: true,
            rejectUnauthorized: false,
            reconnectionDelay: 0,
            reconnectionAttempts: 10,
            query: {
                userId: user.id,
                role: user.role
            }
        })
        dispatch({
            type: 'CONNECT',
            payload: socket
        })
    }
    const disconnect = () => {
        dispatch({type: 'DISCONNECT'})
    }

    return (
        <SocketContext.Provider
            value={{ socket: state.socket, connect, disconnect }}
            {...props}
        />
    )
}
