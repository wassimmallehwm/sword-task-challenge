import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaExclamation, FaTimes } from 'react-icons/fa'
import Button from './Button'
import { useTranslation } from 'react-i18next'

interface ModalProps {
    open: boolean
    cancel: any
    confirm?: any
    title?: string
    color?: string
    footerBtns?: boolean
    children?: any
    showOverlay?: boolean
    overlay?: any
    fixedHeight?: boolean
}

const Modal = ({
    open,
    cancel,
    confirm,
    title,
    color = 'primary', //indigo
    footerBtns,
    children,
    showOverlay,
    overlay,
    fixedHeight
}: ModalProps) => {
    const cancelButtonRef = useRef(null)
    const {t} = useTranslation()
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={cancel}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className='flex justify-end p-2'>
                                {
                                    title ? (
                                        <h4 className="text-lg w-full font-bold text-gray-600 block mx-2">
                                            {title}
                                        </h4>
                                    ) : null
                                }
                                <Button title='close' onClick={cancel} color='primary' outline rounded>
                                    <FaTimes className='cursor-pointer' />
                                </Button>
                            </div>
                            <hr />
                            <div className={`p-0 relative `}>
                                {showOverlay && (
                                    <div  className='absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-black opacity-50'>
                                        {overlay}
                                    </div>
                                ) }
                                <div className={`bg-white ${fixedHeight ? 'h-96 overflow-y-hidden' : 'max-h-96 overflow-y-auto'}  px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                                    {children}
                                </div>
                            </div>
                            {
                                footerBtns ? (
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${color}-500 text-base font-medium text-white hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-400 sm:ml-3 sm:w-auto sm:text-sm`}
                                            onClick={confirm}
                                        >
                                            {t('btns.save')}
                                        </button>
                                        <button
                                            type="button"
                                            className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                                            onClick={cancel}
                                            ref={cancelButtonRef}
                                        >
                                            {t('btns.cancel')}
                                        </button>
                                    </div>
                                ) : null
                            }

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
