'use client'

import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import DeleteConfirmation from "../modals/delete-confirmation";

type Props = {
    modal: string;
    selectedId: string;
}

export default function DeleteButton({modal, selectedId}:Props) {

    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showModal]);

    return(
        <>
        <Trash2 onClick={() => setShowModal(true)} className="size-4 hover:text-gray-800 dark:hover:text-gray-300 cursor-pointer transform duration-200"/>
        { showModal && <DeleteConfirmation setShowModal={setShowModal} modal={modal} selectedId={selectedId} /> }
        </>
    )
}