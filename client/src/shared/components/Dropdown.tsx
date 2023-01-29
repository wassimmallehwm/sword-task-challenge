import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type DropdownProps = {
    trigger: ReactNode
    list: any[]
    onAction?: any
    keyField?: string
    displayField?: string
}

const Dropdown = ({
    trigger,
    list,
    onAction,
    keyField,
    displayField
}: DropdownProps) => {

    const {t} = useTranslation()

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
                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 min-w-[12rem] max-w-md w-max rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {
                        list && list.length > 0 ? list.map((item) => (
                            <Menu.Item key={
                                keyField && item[keyField] ?
                                    item[keyField] :
                                    item
                            }>
                                {({ active }) =>
                                    <div
                                        onClick={
                                            item.onAction ?
                                                item.onAction :
                                                () => onAction(item)}
                                        className={classNames(
                                            item.active || active ? 'bg-gray-200' : '',
                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer border-b border-b-gray-300 last:border-none'
                                        )}>
                                        {
                                            displayField && item[displayField] ?
                                                item[displayField] :
                                                item
                                        }
                                    </div>

                                }
                            </Menu.Item>
                        )) : (
                            <div className='flex items-center justify-center h-20'>
                                {t('noData')}
                            </div>
                        )
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Dropdown