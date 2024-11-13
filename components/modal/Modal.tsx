import React, { ReactNode, useRef, useEffect } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    showModal: boolean
}

const Modal = ({ children, onClose, showModal }: ModalProps) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        showModal ? (document.body.style.overflow = 'hidden') : null
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [showModal])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed w-screen h-screen left-0 right-0 bottom-0 top-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center">
            <div ref={modalRef}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
