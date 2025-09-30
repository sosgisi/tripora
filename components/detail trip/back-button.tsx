'use client';

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {

  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center w-fit gap-2 text-primary hover:text-primary-hover dark:text-primary-dark hover:dark:text-primary-dark-hover mb-8 cursor-pointer"
      dir="rtl"
    >
      <ArrowLeft className="rotate-180" />
      رجوع
    </button>

  );
}