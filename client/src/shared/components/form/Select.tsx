import React from 'react';

interface SelectProps {
    opacity?: number;
    children: any;
    [x: string]: any;
}

const Select = ({ opacity = 1, children, ...props }: SelectProps) => {
    return <select className={`w-full h-9 py-1 px-2 border border-gray-300 
    rounded mt-1 opacity-${opacity} outline-none focus:border-primary-300 
    focus:outline-none focus:ring-1`} {...props} >
            {children}
        </select>;
};

export default Select;
