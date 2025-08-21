"use client";

import { useEffect, useState } from "react";
import ProviderModal from "@/app/ui/provider/provider-modal";
import { UserPlus } from "lucide-react";

export default function AddProviderButton() {

  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center py-1 px-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transform duration-200"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Add Provider
      </button>

      {showModal && (
        <ProviderModal
          setShowProviderModal={setShowModal}
        />
      )}
    </>
  );
}
