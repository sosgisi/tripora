"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginForm() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) {
        return setError(data.message || 'فشل تسجيل الدخول');
      }
      if (data.role === 'user') {
        router.push('/');
      } else if (data.role === 'admin' || data.role === 'provider') {
        router.push('/provider/overview');
      }
    } catch (err) {
      console.log(err)
      setError("حدث خطأ ما");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4" dir="rtl">
      
      {/* البريد الإلكتروني */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2F4F4F] dark:text-white">البريد الإلكتروني</label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 dark:text-white/60 w-5 h-5" />
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pr-10 h-12 border-[#2F4F4F]/20 dark:border-white/20 focus:border-[#C9A15C] w-full border rounded text-right"
            required
          />
        </div>
      </div>

      {/* كلمة المرور */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2F4F4F] dark:text-white">كلمة المرور</label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 dark:text-white/60 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10 pl-10 h-12 border-[#2F4F4F]/20 dark:border-white/20 focus:border-[#C9A15C] w-full border rounded text-right"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 dark:text-white/60 hover:text-[#2F4F4F]"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* خيارات إضافية */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="ml-2" />
          <span className="text-sm text-[#2F4F4F]/70 dark:text-white/70">تذكرني</span>
        </label>
        <Link href="/forgot-password" className="text-sm text-[#C9A15C] hover:underline whitespace-nowrap">
          نسيت كلمة المرور؟
        </Link>
      </div>

      {/* زر تسجيل الدخول */}
      <div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className={`${isLoading && 'opacity-50'} w-full bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white h-12 text-lg font-semibold rounded-md cursor-pointer`}
          disabled={isLoading}
        >
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </div>

    </form>
  )
}


// "use client"

// import { useState } from "react"
// import { Eye, EyeOff, Mail, Lock } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function LoginForm(){

//     const router = useRouter();

//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [error, setError] = useState<string|null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false)

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setIsLoading(true)
//         setError(null);

//         try{
//             const res = await fetch('/api/auth/login', {
//                 method: 'POST',
//                 body: JSON.stringify({ email, password }),
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             const data = await res.json();
//             if(!res.ok){
//                 return setError(data.message || 'Login failed');
//             }
//             if(data.role==='user'){
//                 router.push('/');
//             }else if(data.role==='admin' || data.role==='provider'){
//                 router.push('/provider/overview');
//             }
//         }catch(err){
//             console.log(err)
//             setError("something went wrong");
//         }finally{
//             setIsLoading(false)
//         }
//   }

//   return (
//     <form onSubmit={handleLogin} className="space-y-4">
        
//         <div className="space-y-2">
//             <label className="text-sm font-medium text-[#2F4F4F] dark:text-white">Email</label>
//             <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 dark:text-white/60 w-5 h-5" />
//                 <input
//                     type="email"
//                     placeholder="nama@email.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 h-12 border-[#2F4F4F]/20 dark:border-white/20 focus:border-[#C9A15C] w-full border rounded"
//                     required
//                 />
//             </div>
//         </div>

//         <div className="space-y-2">
//             <label className="text-sm font-medium text-[#2F4F4F] dark:text-white">Password</label>
//             <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 dark:text-white/60 w-5 h-5" />
//                 <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Masukkan password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10 h-12 border-[#2F4F4F]/20 dark:border-white/20 focus:border-[#C9A15C] w-full border rounded"
//                     required
//                 />
//                 <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/60 dark:text-white/60 hover:text-[#2F4F4F]"
//                 >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//             </div>
//         </div>

//         <div className="flex items-center justify-between">
//             <label className="flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 <span className="text-sm text-[#2F4F4F]/70 dark:text-white/70">Ingat saya</span>
//             </label>
//             <Link href="/forgot-password" className="text-sm text-[#C9A15C] hover:underline whitespace-nowrap">
//                 Lupa password?
//             </Link>
//         </div>

//         <div>
//             { error && <p className="text-xs text-red-500">{error}</p> }
//             <button
//                 type="submit"
//                 className={`${isLoading && 'opacity-50'} w-full bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white h-12 text-lg font-semibold rounded-md cursor-pointer`}
//                 disabled={isLoading}
//             >
//             {isLoading ? "Masuk..." : "Masuk"}
//             </button>
//         </div>

//     </form>
//   )
// }