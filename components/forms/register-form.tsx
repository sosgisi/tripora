"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterForm(){

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
    })
    const [fieldError, setFieldError] = useState<Record<string, string>>({});
    const [error, setError] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const newErrors = {};
        setFieldError(newErrors);

        if(formData.password !== formData.confirmPassword){
            const passwordError = {
                password: 'Password do not match',
                confirmPassword: 'Password do not match',
            }
            setFieldError(passwordError);
            setIsLoading(false);
            return;
        }

        try{
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                return setError(data.message || 'Registration failed');
            }

            alert('Registration Successfull');
            router.push('/');
        }catch(error){
            console.error('Register error: ', error);
            setError('Something went wrong. Please try again');
        }finally{
            setIsLoading(false);
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setFieldError((prev) => ({ ...prev, [field]: ''}))
    }

    return(
        <form onSubmit={handleRegister} className="space-y-4">

            <div className="relative space-y-2">
                <label className="text-sm font-medium text-[#2F4F4F]">Nama Lengkap</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 h-12 border-[#2F4F4F]/20 focus:border-[#C9A15C] w-full border rounded"
                        required
                    />
                </div>
                { fieldError?.name && <p className="absolute -bottom-4 text-xs text-red-500">{fieldError?.name}</p> }
            </div>

            <div className="relative space-y-2">
                <label className="text-sm font-medium text-[#2F4F4F]">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 w-5 h-5" />
                    <input
                        type="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-12 border-[#2F4F4F]/20 focus:border-[#C9A15C] w-full border rounded"
                        required
                    />
                </div>
                { fieldError?.email && <p className="absolute -bottom-4 text-xs text-red-500">{fieldError?.email}</p> }
            </div>

            <div className="relative space-y-2">
                <label className="text-sm font-medium text-[#2F4F4F]">Nomor Telepon</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 w-5 h-5" />
                    <input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={formData.phonenumber}
                        onChange={(e) => handleInputChange("phonenumber", e.target.value)}
                        className={`${fieldError?.phonenumber && 'border-red-500'} pl-10 h-12 border-[#2F4F4F]/20 focus:border-[#C9A15C] w-full border rounded`}
                        required
                    />
                </div>
                { fieldError?.phonenumber && <p className="absolute -bottom-4 text-xs text-red-500">{fieldError?.phonenumber}</p> }
            </div>

            <div className="relative space-y-2">
                <label className="text-sm font-medium text-[#2F4F4F]">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 w-5 h-5" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 h-12 border-[#2F4F4F]/20 focus:border-[#C9A15C] w-full border rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 hover:text-[#2F4F4F]"
                    >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                { fieldError?.password && <p className="absolute -bottom-4 text-xs text-red-500">{fieldError?.password}</p> }
            </div>

            <div className="relative space-y-2">
                <label className="text-sm font-medium text-[#2F4F4F]">Konfirmasi Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 w-5 h-5" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 h-12 border-[#2F4F4F]/20 focus:border-[#C9A15C] w-full border rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 hover:text-[#2F4F4F]"
                    >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                { fieldError?.confirmPassword && <p className="absolute -bottom-4 text-xs text-red-500">{fieldError?.confirmPassword}</p> }
            </div>

            <div className="flex items-center">
                <input type="checkbox" id="agree" className="mr-2" required />
                <label htmlFor="agree" className="text-sm text-[#2F4F4F]/70">
                    Saya menyetujui{" "}
                    <Link href="/terms" className="text-[#C9A15C] hover:underline">
                        Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link href="/privacy" className="text-[#C9A15C] hover:underline">
                        Kebijakan Privasi
                    </Link>
                </label>
            </div>

            <div>
                { error && <p className="text-xs text-red-500">{error}</p> }
                <button
                    type="submit"
                    className={`${isLoading && 'opacity-50'} w-full bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white h-12 text-lg font-semibold rounded-md cursor-pointer`}
                    disabled={isLoading}
                >
                {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
                </button>
            </div>

        </form>
    )
}