'use client'

export const dynamic = "force-dynamic";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar"
import { ChevronLeft, ChevronRight, Shield, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import TripSection from "./(root)/sections/trip";
import CategoryFilter from "./ui/category-filter";
import Search from "./ui/search"
import { Category, Trip } from "@prisma/client";

type CategoryWithTrip = Category & {
  trip: Trip[]
}

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState<CategoryWithTrip[]>([]);

  useEffect(() => {
    const fetchCategories = async() => {
      const res = await fetch('/api/admin/category');
      const data = await res.json();
      setCategories(data);
    }
    
    fetchCategories();
  }, [])

  const testimonials = [
    {
      name: "أحمد رزقي",
      avatar: "/images/avatar-ahmad.jpg",
      text: "كانت عمرتي الأولى مع تريبورا مميزة للغاية. خدمة ممتازة ورفقة رائعة!",
      trip: "عمرة بلس تركيا",
    },
    {
      name: "مايا ساري",
      avatar: "/images/avatar-maya.jpg",
      text: "كانت تجربة الإبحار في كومودو لا تُنسى. تريبورا بالفعل أفضل منصة للرحلات المفتوحة!",
      trip: "الإبحار في كومودو",
    },
  ]

  const heroSlides = [
    {
      image: "/images/hero-hiking-adventure.png",
      title: "مغامرة تسلق الجبال معًا",
      subtitle: "مجتمع متماسك",
      description:
        "اكتشف قمم إندونيسيا مع مجتمع من المتسلقين ذوي الخبرة. لا داعي للقلق بشأن السفر بمفردك!",
      highlight: "أكثر من 2500 متسلق نشط",
      cta: "ابدأ المغامرة",
    },
    {
      image: "/images/hero-sailing-paradise.png",
      title: "إبحار إلى الجنة المخفية",
      subtitle: "وصول حصري",
      description:
        "استمتع بجمال البحر الإندونيسي غير المكتشف. وصول إلى جزر ومواقع لا يمكن الوصول إليها بمفردك.",
      highlight: "50+ جزيرة استوائية",
      cta: "أبحر الآن",
    },
    {
      image: "/images/hero-spiritual-journey.png",
      title: "رحلة روحية لا تُنسى",
      subtitle: "إرشاد خبراء",
      description:
        "عمرة وزيارة مع مشايخ ذوي خبرة. رحلة روحية آمنة ومميزة.",
      highlight: "رضا 98% من المعتمرين",
      cta: "سجل الآن",
    },
    {
      image: "/images/hero-community-travel.png",
      title: "سفر اقتصادي مع الأصدقاء",
      subtitle: "أسعار مناسبة",
      description:
        "تكاليف الرحلة أقل لأنها مشتركة مع الآخرين. احصل على أصدقاء جدد وتجربة قيمة مع الحفاظ على الميزانية!",
      highlight: "توفير حتى 60%",
      cta: "انضم الآن",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <>
      <Navbar/>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden min-h-[80vh]">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              <div className="space-y-8 text-white">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-[#C9A15C]/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-[#C9A15C]" />
                    <span className="text-sm font-medium text-[#C9A15C]">{heroSlides[currentSlide].subtitle}</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">{heroSlides[currentSlide].title}</h1>

                  <p className="text-xl leading-relaxed text-white/90">{heroSlides[currentSlide].description}</p>

                  <div className="flex items-center space-x-4">
                    <div className="bg-[#C9A15C] px-4 py-2 rounded-lg">
                      <span className="font-bold text-white">{heroSlides[currentSlide].highlight}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="rounded-md bg-[#C9A15C] text-white px-8 py-4 text-lg font-semibold"
                  >
                    {heroSlides[currentSlide].cta}
                  </button>
                </div>

                {/* Search Form */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <form>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Search placeholder="ابحث عن رحلة"/>
                      <CategoryFilter categories={categories} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-[#C9A15C] w-8" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">الفئات الأكثر شعبية</h2>
              <p className="text-xl text-[#2F4F4F]/70">اختر المغامرة التي تناسب اهتماماتك وشغفك</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/trips?category=${category.name.replace(/\s+/g, "+").replace("&", "")}`}
                >
                  <div className="group hover:shadow-lg transition-all duration-300 border-[#2F4F4F]/10 hover:border-[#C9A15C]/30 cursor-pointer">
                    <div className="p-6 text-center border border-gray-200 rounded-md hover:border-gray-300">
                      <h3 className="font-semibold text-[#2F4F4F] group-hover:text-[#C9A15C] transition-colors mb-2 whitespace-nowrap">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[#2F4F4F]/60 whitespace-nowrap">{category?.trip?.length} رحلات</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Trips */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">الرحلات الأكثر شعبية</h2>
                <p className="text-xl text-[#2F4F4F]/70">أكثر الرحلات تفضيلاً من مجتمعنا</p>
              </div>
              <Link href="/trips">
                <button className="border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white flex items-center px-3 py-1.5 border bg-white rounded whitespace-nowrap cursor-pointer transform duration-200">
                  عرض الكل
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>

            <TripSection/>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">لماذا تختار تريبورا؟</h2>
              <p className="text-xl text-[#2F4F4F]/70">
                منصة موثوقة لتجارب سفر لا تُنسى
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border rounded-md border-[#2F4F4F]/10 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-[#C9A15C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">موثوق وآمن</h3>
                  <p className="text-[#2F4F4F]/70">
                    جميع الرحلات تم التحقق منها وتدار من قبل فريق محترف بمعايير عالية للسلامة
                  </p>
                </div>
              </div>

              <div className="border rounded-md border-[#2F4F4F]/10 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-[#C9A15C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">مجتمع متماسك</h3>
                  <p className="text-[#2F4F4F]/70">
                    انضم إلى آلاف المسافرين الذين يشاركونك نفس الشغف لاكتشاف إندونيسيا
                  </p>
                </div>
              </div>

              <div className="border rounded-md border-[#2F4F4F]/10 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-[#C9A15C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">تجارب عالية الجودة</h3>
                  <p className="text-[#2F4F4F]/70">
                    رحلات مصممة خصيصًا مع برامج تفصيلية ومرشدين ذوي خبرة لتجربة لا تُنسى
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">آراء المسافرين عن تريبورا</h2>
              <p className="text-xl text-[#2F4F4F]/70">تجارب حقيقية من المسافرين</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-md border border-[#2F4F4F]/10 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 text-[#2F4F4F] dark:text-white">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm">{testimonial.trip}</p>
                      </div>
                    </div>
                    <p className="italic">{`"${testimonial.text}"`}</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9A15C] text-[#C9A15C]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-br text-[#2F4F4F] dark:text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold">احصل على آخر تحديثات الرحلات</h2>
              <p className="text-xl">
                اشترك في النشرة الإخبارية للحصول على أحدث الرحلات ونصائح السفر والعروض الحصرية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="border rounded-md flex-1 px-3 border-[#2F4F4F]/20 dark:border-white/20 focus:border-[#C9A15C] h-12"
                />
                <button className="bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white px-8 h-12 rounded-md">اشترك</button>
              </div>
              <p className="text-sm">
                بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا
              </p>
            </div>
          </div>
        </section>

        <Footer/>

      </main>
    </>
  );
}


// 'use client'

// import { Footer } from "@/components/footer";
// import { Navbar } from "@/components/navbar"
// import { ChevronLeft, ChevronRight, Shield, Star, Users } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react"
// import TripSection from "./(root)/sections/trip";
// import CategoryFilter from "./ui/category-filter";
// import Search from "./ui/search"
// import { Category, Trip } from "@prisma/client";

// type CategoryWithTrip = Category & {
//   trip: Trip[]
// }

// export default function Home() {

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [categories, setCategories] = useState<CategoryWithTrip[]>([]);

//   useEffect(() => {
//     const fetchCategories = async() => {
//       const res = await fetch('/api/admin/category');
//       const data = await res.json();
//       setCategories(data);
//     }
    
//     fetchCategories();
//   }, [])

//   const testimonials = [
//     {
//       name: "Ahmad Rizki",
//       avatar: "/images/avatar-ahmad.jpg",
//       text: "Umroh pertama saya melalui Tripora sangat berkesan. Pelayanan excellent dan jamaah yang kompak!",
//       trip: "Umroh Plus Turki",
//     },
//     {
//       name: "Maya Sari",
//       avatar: "/images/avatar-maya.jpg",
//       text: "Sailing di Komodo jadi pengalaman tak terlupakan. Tripora memang platform terbaik untuk open trip!",
//       trip: "Sailing Komodo",
//     },
//   ]

//   const heroSlides = [
//     {
//       image: "/images/hero-hiking-adventure.png",
//       title: "Petualangan Hiking Bersama",
//       subtitle: "Komunitas Solid",
//       description:
//         "Jelajahi puncak-puncak Indonesia bersama komunitas hiking yang berpengalaman. Tidak perlu khawatir pergi sendiri!",
//       highlight: "2,500+ Hiker Aktif",
//       cta: "Mulai Petualangan",
//     },
//     {
//       image: "/images/hero-sailing-paradise.png",
//       title: "Sailing ke Surga Tersembunyi",
//       subtitle: "Akses Eksklusif",
//       description:
//         "Nikmati keindahan laut Indonesia yang belum terjamah. Akses ke spot-spot tersembunyi yang tidak bisa dicapai sendiri.",
//       highlight: "50+ Pulau Eksotis",
//       cta: "Berlayar Sekarang",
//     },
//     {
//       image: "/images/hero-spiritual-journey.png",
//       title: "Perjalanan Spiritual Berkesan",
//       subtitle: "Bimbingan Ahli",
//       description:
//         "Umroh dan ziarah dengan bimbingan ustadz berpengalaman. Perjalanan spiritual yang aman dan berkesan.",
//       highlight: "98% Kepuasan Jamaah",
//       cta: "Daftar Umroh",
//     },
//     {
//       image: "/images/hero-community-travel.png",
//       title: "Traveling Hemat Bareng Teman",
//       subtitle: "Harga Terjangkau",
//       description:
//         "Biaya trip lebih murah karena dibagi bersama. Dapat teman baru, pengalaman berharga, budget tetap aman!",
//       highlight: "Hemat hingga 60%",
//       cta: "Gabung Sekarang",
//     },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
//   }

//   return (
//     <>
//       <Navbar/>
//       <main>
//         {/* Image Container starts */}
//         <section className="relative py-20 overflow-hidden min-h-[80vh]">
//           <div className="absolute inset-0">
//             {heroSlides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-1000 ${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <Image
//                   src={slide.image || "/placeholder.svg"}
//                   alt={slide.title}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Content */}
//           <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
//             <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
//               <div className="space-y-8 text-white">
//                 <div className="space-y-4">
//                   <div className="inline-flex items-center space-x-2 bg-[#C9A15C]/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                     <Star className="w-4 h-4 text-[#C9A15C]" />
//                     <span className="text-sm font-medium text-[#C9A15C]">{heroSlides[currentSlide].subtitle}</span>
//                   </div>

//                   <h1 className="text-5xl lg:text-6xl font-bold leading-tight">{heroSlides[currentSlide].title}</h1>

//                   <p className="text-xl leading-relaxed text-white/90">{heroSlides[currentSlide].description}</p>

//                   <div className="flex items-center space-x-4">
//                     <div className="bg-[#C9A15C] px-4 py-2 rounded-lg">
//                       <span className="font-bold text-white">{heroSlides[currentSlide].highlight}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button
//                     className="rounded-md bg-[#C9A15C] text-white px-8 py-4 text-lg font-semibold"
//                   >
//                     {heroSlides[currentSlide].cta}
//                   </button>
//                 </div>

//                 {/* Search Form */}
//                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
//                   {/* <form action={handleSearch}> */}
//                   <form>
//                     <div className="flex flex-col md:flex-row gap-4">
//                       <Search placeholder="search trip"/>
                      
//                       <CategoryFilter categories={categories} />
                      
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Slide Indicators */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
//             {heroSlides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   index === currentSlide ? "bg-[#C9A15C] w-8" : "bg-white/50 hover:bg-white/70"
//                 }`}
//               />
//             ))}
//           </div>
//         </section>


//         {/* Categories Grid starts */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Kategori Trip Populer</h2>
//               <p className="text-xl text-[#2F4F4F]/70">Pilih petualangan sesuai minat dan passion Anda</p>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {categories.map((category, index) => (
//                 <Link
//                   key={index}
//                   href={`/trips?category=${category.name.replace(/\s+/g, "+").replace("&", "")}`}
//                 >
//                   <div className="group hover:shadow-lg transition-all duration-300 border-[#2F4F4F]/10 hover:border-[#C9A15C]/30 cursor-pointer">
//                     <div className="p-6 text-center border border-gray-200 rounded-md hover:border-gray-300">
//                       <h3 className="font-semibold text-[#2F4F4F] group-hover:text-[#C9A15C] transition-colors mb-2 whitespace-nowrap">
//                         {category.name}
//                       </h3>
//                       <p className="text-sm text-[#2F4F4F]/60 whitespace-nowrap">{category?.trip?.length} trips</p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>


//         {/* Popular Trips starts */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center mb-12">
//               <div>
//                 <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Trip Populer</h2>
//                 <p className="text-xl text-[#2F4F4F]/70">Perjalanan terfavorit dari komunitas kami</p>
//               </div>
//               <Link href="/trips">
//                 <button className="border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white flex items-center px-3 py-1.5 border bg-white rounded whitespace-nowrap cursor-pointer transform duration-200">
//                   Lihat Semua
//                   <ChevronRight className="w-4 h-4 ml-2" />
//                 </button>
//               </Link>
//             </div>

//             <TripSection/>
//           </div>
//         </section>


//         {/* Why Choose Us Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Mengapa Memilih Tripora?</h2>
//               <p className="text-xl text-[#2F4F4F]/70">
//                 Platform terpercaya untuk pengalaman traveling yang tak terlupakan
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="border rounded-md border-[#2F4F4F]/10 text-center">
//                 <div className="p-8">
//                   <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                     <Shield className="w-8 h-8 text-[#C9A15C]" />
//                   </div>
//                   <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">Terpercaya & Aman</h3>
//                   <p className="text-[#2F4F4F]/70">
//                     Semua trip telah diverifikasi dan dikelola oleh tim profesional dengan standar keamanan tinggi
//                   </p>
//                 </div>
//               </div>

//               <div className="border rounded-md border-[#2F4F4F]/10 text-center">
//                 <div className="p-8">
//                   <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                     <Users className="w-8 h-8 text-[#C9A15C]" />
//                   </div>
//                   <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">Komunitas Solid</h3>
//                   <p className="text-[#2F4F4F]/70">
//                     Bergabung dengan ribuan traveler yang memiliki passion sama untuk menjelajahi Indonesia
//                   </p>
//                 </div>
//               </div>

//               <div className="border rounded-md border-[#2F4F4F]/10 text-center">
//                 <div className="p-8">
//                   <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                     <Star className="w-8 h-8 text-[#C9A15C]" />
//                   </div>
//                   <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">Pengalaman Berkualitas</h3>
//                   <p className="text-[#2F4F4F]/70">
//                     Trip yang dirancang khusus dengan itinerary detail dan guide berpengalaman untuk pengalaman terbaik
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>


//         {/* Testimonials */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Kata Mereka Tentang Tripora</h2>
//               <p className="text-xl text-[#2F4F4F]/70">Pengalaman nyata dari para traveler</p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className="rounded-md border border-[#2F4F4F]/10 dark:border-white/10 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 text-[#2F4F4F] dark:text-white">
//                   <div className="p-6">
//                     <div className="flex items-center mb-4">
//                       <Image
//                         src={testimonial.avatar || "/placeholder.svg"}
//                         alt={testimonial.name}
//                         width={60}
//                         height={60}
//                         className="w-12 h-12 rounded-full mr-4 object-cover"
//                       />
//                       <div>
//                         <h4 className="font-semibold">{testimonial.name}</h4>
//                         <p className="text-sm">{testimonial.trip}</p>
//                       </div>
//                     </div>
//                     <p className="italic">{`"${testimonial.text}"`}</p>
//                     <div className="flex mt-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-4 h-4 fill-[#C9A15C] text-[#C9A15C]" />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>


//         {/* Newsletter */}
//         <section className="py-16 bg-gradient-to-br text-[#2F4F4F] dark:text-white">
//           <div className="container mx-auto px-4 text-center">
//             <div className="max-w-2xl mx-auto space-y-6">
//               <h2 className="text-4xl font-bold">Dapatkan Update Trip Terbaru</h2>
//               <p className="text-xl">
//                 Berlangganan newsletter untuk mendapatkan informasi trip terbaru, tips traveling, dan penawaran eksklusif
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   placeholder="Masukkan email Anda"
//                   className="border rounded-md flex-1 px-3 border-[#2F4F4F]/20 dark:border-white/20 focus:border-[#C9A15C] h-12"
//                 />
//                 <button className="bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white px-8 h-12 rounded-md">Langganan</button>
//               </div>
//               <p className="text-sm">
//                 Dengan mendaftar, Anda menyetujui Terms of Service dan Privacy Policy kami
//               </p>
//             </div>
//           </div>
//         </section>


//         <Footer/>

//       </main>
//     </>
//   );
// }

