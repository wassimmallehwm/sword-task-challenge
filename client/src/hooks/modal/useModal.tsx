import { Modal } from '@shared/components'
import React, { useState } from 'react'

type useModalProps = {
    title: string
    content: any
    save?: any
    modalBtns?: boolean
    onSave?: any
    onCancel?: any
    fixedHeight?: boolean
}

const useModal = ({
    title,
    content,
    save,
    modalBtns = false,
    onSave,
    onCancel,
    fixedHeight
}: useModalProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const confirm = () => {
        if(save != undefined){
            save()
            if(onSave != undefined){
                onSave()
            }
        }
    }

    const cancel = () => {
        closeModal()
        if(onCancel != undefined){
            onCancel()
        }
    }


    const modal = (
        <Modal
            title={title}
            open={open}
            cancel={cancel}
            footerBtns={modalBtns}
            confirm={confirm}
            fixedHeight={fixedHeight}
        >
            {content}

        </Modal>
    )

    return {
        modal,
        openModal,
        closeModal
    }
}

export default useModal