import { Compass, Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer(){
    return(
      <footer className="bg-[#2F4F4F] text-[#F4F1E1] py-12" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#C9A15C] rounded-lg flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">تريبورا</span>
              </div>
              <p className="text-[#F4F1E1]/70">
                سوق موثوق للرحلات المفتوحة ذات الطابع الخاص في إندونيسيا. اكتشف المغامرات التي تناسب اهتماماتك وشغفك.
              </p>
              <div className="flex space-x-4 justify-start">
                <Facebook className="w-5 h-5 text-[#F4F1E1]/70 hover:text-[#C9A15C] cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-[#F4F1E1]/70 hover:text-[#C9A15C] cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-[#F4F1E1]/70 hover:text-[#C9A15C] cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#C9A15C]">استكشاف</h3>
              <ul className="space-y-2 text-[#F4F1E1]/70">
                <li>
                  <Link href="/explore" className="hover:text-[#C9A15C] transition-colors">
                    جميع الرحلات
                  </Link>
                </li>
                <li>
                  <Link href="/explore?category=hiking" className="hover:text-[#C9A15C] transition-colors">
                    رحلات المشي والطبيعة
                  </Link>
                </li>
                <li>
                  <Link href="/explore?category=religi" className="hover:text-[#C9A15C] transition-colors">
                    العمرة والرحلات الدينية
                  </Link>
                </li>
                <li>
                  <Link href="/explore?category=city" className="hover:text-[#C9A15C] transition-colors">
                    جولات المدن
                  </Link>
                </li>
                <li>
                  <Link href="/explore?category=sailing" className="hover:text-[#C9A15C] transition-colors">
                    الإبحار والشواطئ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#C9A15C]">الخدمات</h3>
              <ul className="space-y-2 text-[#F4F1E1]/70">
                <li>
                  <Link href="/how-to-book" className="hover:text-[#C9A15C] transition-colors">
                    كيفية الحجز
                  </Link>
                </li>
                <li>
                  <Link href="/travel-tips" className="hover:text-[#C9A15C] transition-colors">
                    نصائح السفر
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="hover:text-[#C9A15C] transition-colors">
                    دليل الرحلات
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#C9A15C] transition-colors">
                    المدونة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#C9A15C]">المساعدة</h3>
              <ul className="space-y-2 text-[#F4F1E1]/70">
                <li>
                  <Link href="/faq" className="hover:text-[#C9A15C] transition-colors">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#C9A15C] transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#C9A15C] transition-colors">
                    الشروط والأحكام
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#C9A15C] transition-colors">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-[#F4F1E1]/70">
                  <Mail className="w-4 h-4 ml-2" />
                  <span className="text-sm">hello@tripora.com</span>
                </div>
                <div className="flex items-center text-[#F4F1E1]/70">
                  <Phone className="w-4 h-4 ml-2" />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F4F1E1]/20 mt-8 pt-8 text-center text-[#F4F1E1]/60">
            <p>© ٢٠٢٤ تريبورا. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    )
}

// import { Compass, Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
// import Link from "next/link";

// export function Footer(){
//     return(
//       <footer className="bg-[#2F4F4F] text-[#F4F1E1] py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-[#C9A15C] rounded-lg flex items-center justify-center">
//                   <Compass className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold">Tripora</span>
//               </div>
//               <p className="text-[#F4F1E1]/70">
//                 Marketplace terpercaya untuk open trip tematik di Indonesia. Temukan petualangan sesuai minat dan
//                 passion Anda.
//               </p>
//               <div className="flex space-x-4">
//                 <Facebook className="w-5 h-5 text-[#F4F1E1]/70 hover:text-[#C9A15C] cursor-pointer transition-colors" />
//                 <Instagram className="w-5 h-5 text-[#F4F1E1]/70 hover:text-[#C9A15C] cursor-pointer transition-colors" />
//                 <Twitter className="w-5 h-5 text-[#F4F1E1]/70 hover:text-[#C9A15C] cursor-pointer transition-colors" />
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 text-[#C9A15C]">Eksplor</h3>
//               <ul className="space-y-2 text-[#F4F1E1]/70">
//                 <li>
//                   <Link href="/explore" className="hover:text-[#C9A15C] transition-colors">
//                     Semua Trip
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/explore?category=hiking" className="hover:text-[#C9A15C] transition-colors">
//                     Hiking & Alam
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/explore?category=religi" className="hover:text-[#C9A15C] transition-colors">
//                     Umroh & Religi
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/explore?category=city" className="hover:text-[#C9A15C] transition-colors">
//                     City Tour
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/explore?category=sailing" className="hover:text-[#C9A15C] transition-colors">
//                     Sailing & Pantai
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 text-[#C9A15C]">Layanan</h3>
//               <ul className="space-y-2 text-[#F4F1E1]/70">
//                 <li>
//                   <Link href="/how-to-book" className="hover:text-[#C9A15C] transition-colors">
//                     Cara Booking
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/travel-tips" className="hover:text-[#C9A15C] transition-colors">
//                     Tips Traveling
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/guide" className="hover:text-[#C9A15C] transition-colors">
//                     Panduan Trip
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/blog" className="hover:text-[#C9A15C] transition-colors">
//                     Blog
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 text-[#C9A15C]">Bantuan</h3>
//               <ul className="space-y-2 text-[#F4F1E1]/70">
//                 <li>
//                   <Link href="/faq" className="hover:text-[#C9A15C] transition-colors">
//                     FAQ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="hover:text-[#C9A15C] transition-colors">
//                     Kebijakan Privasi
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/terms" className="hover:text-[#C9A15C] transition-colors">
//                     Syarat & Ketentuan
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="hover:text-[#C9A15C] transition-colors">
//                     Hubungi Kami
//                   </Link>
//                 </li>
//               </ul>
//               <div className="mt-6 space-y-2">
//                 <div className="flex items-center text-[#F4F1E1]/70">
//                   <Mail className="w-4 h-4 mr-2" />
//                   <span className="text-sm">hello@tripora.com</span>
//                 </div>
//                 <div className="flex items-center text-[#F4F1E1]/70">
//                   <Phone className="w-4 h-4 mr-2" />
//                   <span className="text-sm">+62 812-3456-7890</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-[#F4F1E1]/20 mt-8 pt-8 text-center text-[#F4F1E1]/60">
//             <p>&copy; 2024 Tripora. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     )
// }