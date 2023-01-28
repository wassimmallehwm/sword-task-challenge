import { Menu, Transition } from '@headlessui/react'
import { DropdownItem } from '@shared/types'
import React, { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type DropdownProps = {
    trigger: ReactNode
    items: DropdownItem[]
}

const Dropdown = ({
    trigger,
    items
}: DropdownProps) => {

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-slate-50">
                    <span className="sr-only">Open dropdown</span>
                    {trigger}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {items.map((item) => (
                        <Menu.Item key={item.label}>
                            {({ active }) => {
                                return item.isLink ? (
                                    <Link
                                        to={item.action}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <div
                                        onClick={item.action}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        )}>
                                        {item.component != undefined ? item.component : item.label}
                                    </div>
                                )
                            }}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Dropdown