import React, { useReducer } from 'react';
import { ErrorData } from '@shared/types';
import { ErrorContext } from './ErrorContext';

const initState = {
    error: null
}


function errorReducer(state: any, action: any){
    switch(action.type){
        case 'SETERROR':
            return{
                ...state,
                error: action.payload
            }
        default: 
        return state
    }
}

export const ErrorProvider = (props?: any) => {
    const [state, dispatch] = useReducer(errorReducer, initState);

    const setError = (errorData: ErrorData | null) => {
        dispatch({
            type: 'SETERROR',
            payload: errorData
        })
    }

    return(
        <ErrorContext.Provider
            value={{error: state.error, setError}}
            {...props}
        />
    )
}
