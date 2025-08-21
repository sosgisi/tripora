'use client'

import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import ProviderModal from "@/app/ui/provider/provider-modal";

type Props = {
    modal: string;
}

export default function EditButton({modal}: Props) {

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
        <Edit onClick={() => setShowModal(true)} className="size-4 hover:text-gray-800 dark:hover:text-gray-300 cursor-pointer transform duration-200"/>
        { showModal && (
            modal==='provider' && <ProviderModal setShowProviderModal={setShowModal} />
        )}
        </>
    )
}