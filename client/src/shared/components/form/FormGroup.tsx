import React from 'react'
import { Input } from '.'

interface FormGroupProps {
    label: string;
    [x: string]: any;
}
const FormGroup = ({label, ...props }: FormGroupProps) => {
    return (
        <div>
            <label className="text-sm font-bold text-gray-600 block">
                {label}
            </label>
            <Input {...props} />
        </div>
    )
}

export default FormGroup