import { Switch } from '@headlessui/react'
import React from 'react'

type ToggleProps = {
    enabled: boolean
    onChange: any
    label: string
}

const Toggle = ({
    enabled,
    onChange,
    label
}: ToggleProps) => {
    return (
        <div className='flex items-center gap-2'>
            <Switch
                checked={enabled}
                onChange={onChange}
                className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                <span className="sr-only"> {label} </span>
                <span
                    className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
            <span> {label} </span>
        </div>
    )
}

export default Toggle