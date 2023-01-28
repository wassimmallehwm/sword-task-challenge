import React from 'react';
import { Socket } from 'socket.io-client';
import { Config } from '@config/Config';
import { Account } from '@modules/users/models/Account';


export interface SocketContextInterface {
    socket: Socket | null;
    connect: (user: Account) => void;
    disconnect: () => void;
}

export const SocketContextDefaults: SocketContextInterface = {
    socket: null,
    connect: (user: Account) => null,
    disconnect: () => null
};


export const SocketContext = React.createContext<SocketContextInterface>(
    SocketContextDefaults
);