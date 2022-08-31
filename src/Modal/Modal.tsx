import React, { FC, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';

interface ModalProps {
    children: JSX.Element,
    isOpen: boolean,
    shouldBeCloseOnOutsideClick: boolean,
    handleOnClose: () => void;
}
 
const Modal: FC<ModalProps> = ({ children, handleOnClose, isOpen, shouldBeCloseOnOutsideClick }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    useEffect(() => {
      if(!modalRef.current) {
        return;
      }

      const { current: modal } = modalRef;

      if(isOpen) {
        previousActiveElement.current = document.activeElement;
        modal.showModal();
      } else if(previousActiveElement.current) {
        modal.close();
        // TODO Fix this focus
        // previousActiveElement.current.focus()
      }
    }, [isOpen])

    useEffect(() => {
      const { current: modal } = modalRef;

        const handleCancel = (event: any) => {
            event.preventDefault();
            handleOnClose();
        }

        modal!.addEventListener('cancel', handleCancel);

        return () => {
            modal!.removeEventListener('cancel', handleCancel);
        }
    }, [handleOnClose])
    
    

    const handleOutsideClick = (evt: any) => {
        const { current } = modalRef;

        if(shouldBeCloseOnOutsideClick && evt.target === current) {
            handleOnClose()
        }
    }

    return ReactDOM.createPortal((
        <dialog className='modal' ref={modalRef} onClick={handleOutsideClick}>
            {children}
        </dialog>
    ), document.body);
}
 
export default Modal;