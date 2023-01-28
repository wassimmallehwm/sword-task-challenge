import React from 'react';

interface CheckboxProps {
    checked: boolean
    name: string
    label: string
    onChange: any
    [x: string]: any;
}

const Checkbox = ({
    checked,
    name,
    label,
    onChange,
    ...props
}: CheckboxProps) => {
    const { disabled, error } = props;
    let editableClass = " bg-white py-1 px-2 border"
    if (disabled) {
        editableClass = " bg-transparent border-none p-0"
    }
    return (
        <label className='flex items-center cursor-pointer'>
            <input onChange={onChange} name={name}
                className='w-6 h-6 mx-2 cursor-pointer accent-blue-600' type='checkbox'
                checked={checked} />
            {label}
        </label>
    );
};

export default Checkbox;
