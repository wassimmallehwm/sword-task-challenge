import React from 'react';

interface InputProps {
    [x: string]: any;
}

const Input = ({ ...props }: InputProps) => {
    const { disabled, error} = props;
    let editableClass = " bg-white py-1 px-2 border"
    if(disabled){
        editableClass = " bg-transparent border-none p-0"
    }
    return props.textarea ? (
        <textarea className={`w-full resize-none rounded mt-1 outline-hidden focus:border-primary-300 focus:outline-none focus:ring-1 ${error ? 'border-red-700' : 'border-gray-300'} ${editableClass}`} 
        disabled={disabled} rows={3} {...props}></textarea>
    ) : (
        <input className={`w-full h-9 rounded mt-1 outline-hidden focus:border-primary-300 focus:outline-none focus:ring-1 ${error ? 'border-red-700' : 'border-gray-300'} ${editableClass}`} 
        disabled={disabled} {...props} />
    );
};

export default Input;
