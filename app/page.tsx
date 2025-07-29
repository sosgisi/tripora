'use client'

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar"
import { Badge, BookOpen, Building, Calendar, Camera, ChevronLeft, ChevronRight, Compass, Heart, Laptop, MapPin, Mountain, Search, Shield, Star, Users, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0)

  const categories = [
    { icon: Mountain, name: "Hiking & Alam", count: "120+ trip" },
    { icon: Compass, name: "Umroh & Religi", count: "45+ trip" },
    { icon: Camera, name: "City Tour", count: "89+ trip" },
    { icon: Waves, name: "Sailing & Pantai", count: "67+ trip" },
    { icon: BookOpen, name: "Edukasi", count: "34+ trip" },
    { icon: Building, name: "Budaya & Sejarah", count: "56+ trip" },
    { icon: Laptop, name: "Digital Nomad", count: "23+ trip" },
    { icon: Heart, name: "Wellness", count: "41+ trip" },
  ];

  const popularTrips = [
    {
      image: "/images/bromo-hiking.jpg",
      title: "Hiking Gunung Bromo & Sunrise Tour",
      location: "Malang, Jawa Timur",
      date: "15-17 Des 2024",
      price: "Rp 850.000",
      rating: 4.8,
      participants: 12,
      maxParticipants: 15,
    },
    {
      image: "/images/umroh-makkah.jpg",
      title: "Umroh Plus Turki 12 Hari",
      location: "Makkah - Istanbul",
      date: "20 Jan - 1 Feb 2025",
      price: "Rp 28.500.000",
      rating: 4.9,
      participants: 8,
      maxParticipants: 20,
    },
    {
      image: "/images/komodo-sailing.jpg",
      title: "Sailing Adventure Komodo",
      location: "Labuan Bajo, NTT",
      date: "5-9 Mar 2025",
      price: "Rp 3.200.000",
      rating: 4.7,
      participants: 6,
      maxParticipants: 10,
    },
  ]

  const testimonials = [
    {
      name: "Ahmad Rizki",
      avatar: "/images/avatar-ahmad.jpg",
      text: "Umroh pertama saya melalui Tripora sangat berkesan. Pelayanan excellent dan jamaah yang kompak!",
      trip: "Umroh Plus Turki",
    },
    {
      name: "Maya Sari",
      avatar: "/images/avatar-maya.jpg",
      text: "Sailing di Komodo jadi pengalaman tak terlupakan. Tripora memang platform terbaik untuk open trip!",
      trip: "Sailing Komodo",
    },
  ]

  const heroSlides = [
    {
      image: "/images/hero-hiking-adventure.png",
      title: "Petualangan Hiking Bersama",
      subtitle: "Komunitas Solid",
      description:
        "Jelajahi puncak-puncak Indonesia bersama komunitas hiking yang berpengalaman. Tidak perlu khawatir pergi sendiri!",
      highlight: "2,500+ Hiker Aktif",
      cta: "Mulai Petualangan",
    },
    {
      image: "/images/hero-sailing-paradise.png",
      title: "Sailing ke Surga Tersembunyi",
      subtitle: "Akses Eksklusif",
      description:
        "Nikmati keindahan laut Indonesia yang belum terjamah. Akses ke spot-spot tersembunyi yang tidak bisa dicapai sendiri.",
      highlight: "50+ Pulau Eksotis",
      cta: "Berlayar Sekarang",
    },
    {
      image: "/images/hero-spiritual-journey.png",
      title: "Perjalanan Spiritual Berkesan",
      subtitle: "Bimbingan Ahli",
      description:
        "Umroh dan ziarah dengan bimbingan ustadz berpengalaman. Perjalanan spiritual yang aman dan berkesan.",
      highlight: "98% Kepuasan Jamaah",
      cta: "Daftar Umroh",
    },
    {
      image: "/images/hero-community-travel.png",
      title: "Traveling Hemat Bareng Teman",
      subtitle: "Harga Terjangkau",
      description:
        "Biaya trip lebih murah karena dibagi bersama. Dapat teman baru, pengalaman berharga, budget tetap aman!",
      highlight: "Hemat hingga 60%",
      cta: "Gabung Sekarang",
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

        {/* Image Container starts */}
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
                    className="rounded-md bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white px-8 py-4 text-lg font-semibold cursor-pointer"
                  >
                    {heroSlides[currentSlide].cta}
                  </button>
                </div>

                {/* Search Form */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  {/* <form action={handleSearch}> */}
                  <form>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <input
                          name="destination"
                          placeholder="Cari destinasi atau jenis trip..."
                          className="w-full rounded-md px-3 border-white/30 bg-white/10 text-white placeholder:text-white/70 focus:border-[#C9A15C] h-12 backdrop-blur-sm"
                        />
                      </div>
                      <select
                        name="category"
                        className="px-4 py-3 border border-white/30 bg-white/10 text-white rounded-lg focus:border-[#C9A15C] focus:outline-none backdrop-blur-sm"
                      >
                        <option className="text-black">Semua Kategori</option>
                        <option className="text-black">Hiking & Alam</option>
                        <option className="text-black">Umroh & Religi</option>
                        <option className="text-black">City Tour</option>
                        <option className="text-black">Sailing & Pantai</option>
                      </select>
                      <button type="submit" className="flex items-center rounded-md bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white px-8 h-12 cursor-pointer">
                        <Search className="w-5 h-5 mr-2" />
                        Cari Trip
                      </button>
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


        {/* Categories Grid starts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Kategori Trip Populer</h2>
              <p className="text-xl text-[#2F4F4F]/70">Pilih petualangan sesuai minat dan passion Anda</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/explore?category=${category.name.toLowerCase().replace(/\s+/g, "-").replace("&", "")}`}
                >
                  <div className="group hover:shadow-lg transition-all duration-300 border-[#2F4F4F]/10 hover:border-[#C9A15C]/30 cursor-pointer">
                    <div className="p-6 text-center border border-gray-200 rounded-md hover:border-gray-300">
                      <div className="w-16 h-16 bg-[#2F4F4F]/5 group-hover:bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                        <category.icon className="w-8 h-8 text-[#2F4F4F] group-hover:text-[#C9A15C] transition-colors" />
                      </div>
                      <h3 className="font-semibold text-[#2F4F4F] group-hover:text-[#C9A15C] transition-colors mb-2 whitespace-nowrap">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[#2F4F4F]/60 whitespace-nowrap">{category.count}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Popular Trips starts */}
        <section className="py-16 bg-[#F4F1E1]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Trip Populer</h2>
                <p className="text-xl text-[#2F4F4F]/70">Perjalanan terfavorit dari komunitas kami</p>
              </div>
              <Link href="/explore">
                <button className="border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white">
                  Lihat Semua
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularTrips.map((trip, index) => (
                <div
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-[#2F4F4F]/10 overflow-hidden bg-white rounded-lg"
                >
                  <div className="relative">
                    <Image
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute py-0.5 px-2 rounded-full text-xs font-medium top-4 left-4 bg-[#C9A15C] text-white">
                      {trip.participants}/{trip.maxParticipants} peserta
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#2F4F4F] text-lg mb-3 line-clamp-2">{trip.title}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-[#2F4F4F]/60 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {trip.location}
                      </div>
                      <div className="flex items-center text-[#2F4F4F]/60 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {trip.date}
                      </div>
                      <div className="flex items-center text-[#2F4F4F]/60 text-sm">
                        <Star className="w-4 h-4 mr-2 fill-[#C9A15C] text-[#C9A15C]" />
                        {trip.rating} rating
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-[#C9A15C]">{trip.price}</p>
                        <p className="text-sm text-[#2F4F4F]/60">per orang</p>
                      </div>
                      <Link href={`/trip/${index + 1}`}>
                        <button className="bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 text-white py-1 px-3 whitespace-nowrap rounded">Lihat Detail</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Mengapa Memilih Tripora?</h2>
              <p className="text-xl text-[#2F4F4F]/70">
                Platform terpercaya untuk pengalaman traveling yang tak terlupakan
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-[#2F4F4F]/10 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-[#C9A15C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">Terpercaya & Aman</h3>
                  <p className="text-[#2F4F4F]/70">
                    Semua trip telah diverifikasi dan dikelola oleh tim profesional dengan standar keamanan tinggi
                  </p>
                </div>
              </div>

              <div className="border-[#2F4F4F]/10 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-[#C9A15C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">Komunitas Solid</h3>
                  <p className="text-[#2F4F4F]/70">
                    Bergabung dengan ribuan traveler yang memiliki passion sama untuk menjelajahi Indonesia
                  </p>
                </div>
              </div>

              <div className="border-[#2F4F4F]/10 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9A15C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-[#C9A15C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">Pengalaman Berkualitas</h3>
                  <p className="text-[#2F4F4F]/70">
                    Trip yang dirancang khusus dengan itinerary detail dan guide berpengalaman untuk pengalaman terbaik
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="py-16 bg-[#F4F1E1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#2F4F4F] mb-4">Kata Mereka Tentang Tripora</h2>
              <p className="text-xl text-[#2F4F4F]/70">Pengalaman nyata dari para traveler</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-md border-[#2F4F4F]/10 hover:shadow-lg transition-shadow bg-white">
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
                        <h4 className="font-semibold text-[#2F4F4F]">{testimonial.name}</h4>
                        <p className="text-sm text-[#2F4F4F]/60">{testimonial.trip}</p>
                      </div>
                    </div>
                    <p className="text-[#2F4F4F]/80 italic">{`"${testimonial.text}"`}</p>
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
        <section className="py-16 bg-gradient-to-br from-[#F4F1E1] to-[#C9A15C]/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold text-[#2F4F4F]">Dapatkan Update Trip Terbaru</h2>
              <p className="text-xl text-[#2F4F4F]/70">
                Berlangganan newsletter untuk mendapatkan informasi trip terbaru, tips traveling, dan penawaran eksklusif
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="border rounded-md flex-1 px-3 border-[#2F4F4F]/20 focus:border-[#C9A15C] h-12"
                />
                <button className="bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white px-8 h-12 rounded-md">Langganan</button>
              </div>
              <p className="text-sm text-[#2F4F4F]/60">
                Dengan mendaftar, Anda menyetujui Terms of Service dan Privacy Policy kami
              </p>
            </div>
          </div>
        </section>


        <Footer/>

      </main>
    </>
  );
}
