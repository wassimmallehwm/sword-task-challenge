import { Confirmation } from '@shared/components'
import React, { useState } from 'react'

type useConfirmationProps = {
    color?: string
    onConfirm?: any
    onCancel?: any
}

const useConfirmation = ({
    color = "secondary",
    onConfirm,
    onCancel
}: useConfirmationProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const confirm = () => {
        if(onConfirm != undefined){
            onConfirm()
        }
    }

    const cancel = () => {
        closeModal()
        if(onCancel != undefined){
            onCancel()
        }
    }

    const modal = (
        <Confirmation
            open={open}
            cancel={cancel}
            confirm={confirm}
            color={color}
        />
    )

    return {
        modal,
        openModal,
        closeModal
    }
}

export default useConfirmation