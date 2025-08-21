'use client'

import type React from "react"
import { Compass } from "lucide-react"
import Link from "next/link"
import LoginForm from "@/components/forms/login-form"
import { signIn } from "next-auth/react"

export default function LoginPage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F1E1] to-[#C9A15C]/10 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-4">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <div className="w-12 h-12 bg-[#2F4F4F] rounded-xl flex items-center justify-center">
                            <Compass className="w-7 h-7 text-[#F4F1E1]" />
                        </div>
                        <span className="text-3xl font-bold text-[#2F4F4F]">Tripora</span>
                    </Link>
                    <p className="text-[#2F4F4F]/70 mt-2">Masuk ke akun Anda</p>
                </div>

                <div className="border-[#2F4F4F]/10 shadow-xl p-5 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-center pb-4">
                        <h1 className="text-2xl font-bold text-[#2F4F4F] dark:text-white">Selamat Datang Kembali</h1>
                        <p className="text-[#2F4F4F]/60 dark:text-white/60">Masuk untuk melanjutkan petualangan Anda</p>
                    </div>
                    
                    <div className="space-y-6">
                    
                        <LoginForm/>

                        <div className="relative">
                            <div className="relative flex justify-center items-center text-sm">
                                <div className="w-full border-[#2F4F4F]/20 dark:border-white/20 border-t"></div>
                                <span className="px-2 text-[#2F4F4F]/60 dark:text-white/60 whitespace-nowrap">Atau masuk dengan</span>
                                <div className="w-full border-[#2F4F4F]/20 dark:border-white/20 border-t"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => signIn('google', { callbackUrl: '/' })} className="border-[#2F4F4F]/20 dark:border-white/20 text-[#2F4F4F] dark:text-white hover:bg-[#2F4F4F]/5 flex justify-center items-center py-2 gap-2 rounded border cursor-pointer">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                </svg>
                                Google
                            </button>
                            <button onClick={() => signIn('facebook', { callbackUrl: '/' })} className="border-[#2F4F4F]/20 dark:border-white/20 text-[#2F4F4F] dark:text-white hover:bg-[#2F4F4F]/5 flex justify-center items-center py-2 gap-2 rounded border cursor-pointer">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-[#2F4F4F]/70 dark:text-white/70">
                                Belum punya akun?{" "}
                                <Link href="/register" className="text-[#C9A15C] hover:underline font-medium">
                                Daftar sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-[#2F4F4F]/60">
                        Dengan masuk, Anda menyetujui{" "}
                        <Link href="/terms" className="text-[#C9A15C] hover:underline">
                            Syarat & Ketentuan
                        </Link>{" "}
                            dan{" "}
                        <Link href="/privacy" className="text-[#C9A15C] hover:underline">
                            Kebijakan Privasi
                        </Link>{" "}
                            kami
                    </p>
                </div>
            </div>
        </div>
    )
}
