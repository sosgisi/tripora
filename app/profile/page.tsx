"use client"

import React, { useEffect, useRef, useState } from "react"
import { Compass, ArrowLeft, Edit, MapPin, Calendar, Star, Camera, Bell, Shield, CreditCard, Heart, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { Navbar } from "@/components/navbar"

type UserDataType = {
  id: string,
  name: string,
  email: string,
  phonenumber: string,
  location: string,
  bio: string,
  profileImage: string,
  role: string,
}

export default function ProfilePage() {

  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserDataType>({
    id: "",
    name: "",
    email: "",
    phonenumber: "",
    location: "",
    bio: "",
    profileImage: "",
    role: "",
  });

  const [profileDataEdited, setProfileDataEdited] = useState<UserDataType>({
    id: "",
    name: "",
    email: "",
    phonenumber: "",
    location: "",
    bio: "",
    profileImage: "",
    role: "",
  });

  const userStats = {
    tripsJoined: 12,
    reviewsGiven: 8,
    wishlistCount: 5,
    memberSince: "2023",
  }

  const recentTrips = [
    {
      id: 1,
      title: "Hiking Gunung Bromo",
      image: "/images/bromo-hiking.jpg",
      date: "15-17 Des 2024",
      status: "upcoming",
      rating: null,
    },
    {
      id: 2,
      title: "Sailing Komodo",
      image: "/images/komodo-sailing.jpg",
      date: "5-9 Nov 2024",
      status: "completed",
      rating: 5,
    },
    {
      id: 3,
      title: "Yogyakarta Culture Tour",
      image: "/images/yogyakarta-culture.png",
      date: "20-22 Okt 2024",
      status: "completed",
      rating: 4,
    },
  ]

  const wishlistTrips = [
    {
      id: 1,
      title: "Raja Ampat Diving",
      image: "/images/raja-ampat-diving.png",
      price: "Rp 8.500.000",
      location: "Papua Barat",
    },
    {
      id: 2,
      title: "Bali Digital Nomad",
      image: "/images/bali-nomad.png",
      price: "Rp 2.500.000",
      location: "Bali",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <h1 className="bg-blue-100 text-blue-700">Akan Datang</h1>
      case "completed":
        return <h1 className="bg-green-100 text-green-700">Selesai</h1>
      case "cancelled":
        return <h1 className="bg-red-100 text-red-700">Dibatalkan</h1>
      default:
        return <h1>Unknown</h1>
    }
  }
  
  const fetchUser = async () => {
    setIsLoading(true); 
    try{
      const res = await fetch('/api/me', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if(!data.user) return console.error('User not found');
      if(!res.ok) return console.error('Failed to fetch user: ', data.message || 'Unknown error');
      setProfileData(data.user);
      setProfileDataEdited(data.user);
    }catch(err){
      console.error('Failed to get user: ', err);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try{
      const res = await fetch('/api/update-profile', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileDataEdited),
      });
      const data = await res.json();
      if(!res.ok) return console.error('Update failed: ', data.message || 'Unknown error');
    }catch(err){
      console.error('fetch failed: ', err || 'Unknown error');
    }finally{
      await fetchUser();
      setIsEditing(false);
      setIsLoading(false);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if(!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try{
      const res = await fetch('/api/upload-image', {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if(!res.ok) return console.error('Upload failed: ', data.message || 'Unknown error');

      console.log('Image uploaded: ', data.url || 'Unknown error');
    }catch(err){
      console.error('Failed to upload image: ', err);
    }finally{
      setIsLoading(false);
    }
  }

  const handleSelectImage = (e:React.FormEvent) => {
    e.preventDefault();
    inputRef?.current?.click();
  }

  const handleLogout = async (e:React.FormEvent) => {
    e.preventDefault();
    try{
      if(session?.user){
        await signOut({ callbackUrl: '/login', redirect: false });
        // clear custom JWT cookie
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login';
      }else{
        await fetch('/api/user/logout', {
          method: "POST"
        });
        window.location.href = '/login';
      }
    }catch(err){
      console.error('error while logging out: ', err);
    }
  }

  return (
    <>
      {/* Header */}
      <Navbar/>

      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="rounded-md border border-[#2F4F4F]/10 mb-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-md">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  { session?.user?.image ?
                      <Image
                        src={session?.user?.image || "/placeholder.svg"}
                        alt=""
                        width={128}
                        height={128}
                        className="object-cover rounded-full"
                      />
                  :
                    <div className="w-32 h-32 rounded-full border overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                      {profileData?.profileImage ? (
                        <Image
                          src={profileData.profileImage}
                          fill
                          alt="Profile"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-full h-full">
                          <User />
                        </div>
                      )}
                    </div>
                  }
                  
                  { isLoading ? 
                    <div className="flex justify-end text-xs opacity-50">loading...</div>
                    :
                    <>
                    <input 
                      ref={inputRef}
                      type="file" 
                      disabled={session?.user?.image ? true : false}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <button
                      onClick={handleSelectImage}
                      className="absolute bottom-0 right-0 flex justify-center items-center w-8 h-8 bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    </>
                  }
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-[#2F4F4F] dark:text-white mb-2">{session?.user?.name || profileData?.name}</h1>
                      <div className="flex items-center text-[#2F4F4F]/60 dark:text-white mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {profileData?.location || '-'}
                      </div>
                      <p className="text-[#2F4F4F]/80 dark:text-white">
                        {profileData?.bio || '-'}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-end gap-10">
                      <button
                        onClick={handleLogout}
                        className="py-0.5 px-5 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transform duration-200"
                      >
                        Logout
                      </button>
                      { !session?.user?.email &&
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                      
                          className="flex items-center py-1 px-3 rounded border border-[#2F4F4F] dark:border-white text-[#2F4F4F] dark:text-white hover:bg-[#2F4F4F] hover:text-white cursor-pointer"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          {isEditing ? "Batal" : "Edit Profil"}
                        </button>
                      }
                    </div>
                  </div>

                  { profileData?.role === 'admin' || profileData?.role === 'provider' &&
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#C9A15C]">{userStats.tripsJoined}</p>
                        <p className="text-sm text-[#2F4F4F]/60 dark:text-white">Trip Diikuti</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#C9A15C]">{userStats.reviewsGiven}</p>
                        <p className="text-sm text-[#2F4F4F]/60 dark:text-white">Review Diberikan</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#C9A15C]">{userStats.wishlistCount}</p>
                        <p className="text-sm text-[#2F4F4F]/60 dark:text-white">Wishlist</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#C9A15C]">{userStats.memberSince}</p>
                        <p className="text-sm text-[#2F4F4F]/60 dark:text-white">Member Sejak</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          { profileData?.role !== 'admin' && profileData?.role !== 'provider' &&
            <div className="w-full">
              { !isEditing && (
                <div className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border border-[#2F4F4F]/10">
                  <div
                    className={`cursor-pointer py-2 px-4 text-center ${activeTab === 'trips' ? 'border-b-2 border-[#C9A15C] font-bold text-[#C9A15C]' : ''}`}
                    onClick={() => setActiveTab('trips')}
                  >Trip Saya</div>
                  <div
                    className={`cursor-pointer py-2 px-4 text-center ${activeTab === 'wishlist' ? 'border-b-2 border-[#C9A15C] font-bold text-[#C9A15C]' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                  >Wishlist</div>
                  <div
                    className={`cursor-pointer py-2 px-4 text-center ${activeTab === 'reviews' ? 'border-b-2 border-[#C9A15C] font-bold text-[#C9A15C]' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                  >Review</div>
                  <div
                    className={`cursor-pointer py-2 px-4 text-center ${activeTab === 'settings' ? 'border-b-2 border-[#C9A15C] font-bold text-[#C9A15C]' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >Pengaturan</div>
                </div>
              )}

              {/* Tab Content */}
              {activeTab === 'trips' && !isEditing && (
                <div className="mt-6">
                  <div className="border-[#2F4F4F]/10 border rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-[#2F4F4F]/10">
                      <div className="text-[#2F4F4F] text-lg font-bold">Riwayat Trip</div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="space-y-4">
                        {recentTrips.map((trip) => (
                          <div key={trip.id} className="flex items-center gap-4 p-4 border border-[#2F4F4F]/10 rounded-lg">
                            <Image
                              src={trip.image || "/placeholder.svg"}
                              alt={trip.title}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#2F4F4F] mb-1">{trip.title}</h3>
                              <div className="flex items-center text-sm text-[#2F4F4F]/60 mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                {trip.date}
                              </div>
                              {getStatusBadge(trip.status)}
                            </div>
                            <div className="text-right">
                              {trip.rating && (
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < trip.rating! ? "fill-[#C9A15C] text-[#C9A15C]" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                              <div className="space-y-2">
                                <Link href={`/trip/${trip.id}`}>
                                  <button className="w-full">
                                    Lihat Detail
                                  </button>
                                </Link>
                                {trip.status === "completed" && !trip.rating && (
                                  <button className="w-full bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white">
                                    Beri Review
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && !isEditing && (
                <div className="mt-6">
                  <div className="border-[#2F4F4F]/10 border rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-[#2F4F4F]/10">
                      <div className="text-[#2F4F4F] text-lg font-bold">Trip Favorit</div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        {wishlistTrips.map((trip) => (
                          <div key={trip.id} className="border border-[#2F4F4F]/10 rounded-lg overflow-hidden">
                            <Image
                              src={trip.image || "/placeholder.svg"}
                              alt={trip.title}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-semibold text-[#2F4F4F] mb-2">{trip.title}</h3>
                              <div className="flex items-center text-sm text-[#2F4F4F]/60 mb-3">
                                <MapPin className="w-4 h-4 mr-2" />
                                {trip.location}
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="font-bold text-[#C9A15C]">{trip.price}</p>
                                <div className="flex gap-2">
                                  <button className="w-8 h-8">
                                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                  </button>
                                  <Link href={`/trip/${trip.id}`}>
                                    <button className="bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 text-white">
                                      Lihat
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && !isEditing && (
                <div className="mt-6">
                  <div className="border-[#2F4F4F]/10 border rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-[#2F4F4F]/10">
                      <div className="text-[#2F4F4F] text-lg font-bold">Review yang Diberikan</div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="space-y-4">
                        <div className="p-4 border border-[#2F4F4F]/10 rounded-lg">
                          <div className="flex items-start gap-4">
                            <Image
                              src="/images/komodo-sailing.jpg"
                              alt="Sailing Komodo"
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-[#2F4F4F] mb-1">Sailing Adventure Komodo</h4>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-[#C9A15C] text-[#C9A15C]" />
                                ))}
                                <span className="ml-2 text-sm text-[#2F4F4F]/60">5 Nov 2024</span>
                              </div>
                              <p className="text-[#2F4F4F]/80">
                                Trip yang luar biasa! Pemandangan Komodo sangat menakjubkan dan crew sangat profesional.
                                Highly recommended!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && !isEditing && (
                <div className="mt-6 space-y-6">
                  <div className="border-[#2F4F4F]/10 border rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-[#2F4F4F]/10 flex items-center text-[#2F4F4F] text-lg font-bold">
                      <Bell className="w-5 h-5 mr-2" />
                      Notifikasi
                    </div>
                    <div className="px-6 py-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#2F4F4F]">Email Notifikasi</p>
                          <p className="text-sm text-[#2F4F4F]/60">Terima update trip dan promosi via email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#2F4F4F]">Push Notifikasi</p>
                          <p className="text-sm text-[#2F4F4F]/60">Notifikasi langsung di browser</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="border-[#2F4F4F]/10 border rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-[#2F4F4F]/10 flex items-center text-[#2F4F4F] text-lg font-bold">
                      <Shield className="w-5 h-5 mr-2" />
                      Keamanan
                    </div>
                    <div className="px-6 py-4 space-y-4">
                      <button className="w-full justify-start border border-[#2F4F4F]/10 rounded px-4 py-2 bg-white hover:bg-gray-100">Ubah Password</button>
                      <button className="w-full justify-start border border-[#2F4F4F]/10 rounded px-4 py-2 bg-white hover:bg-gray-100">Verifikasi Dua Faktor</button>
                    </div>
                  </div>

                  <div className="border-[#2F4F4F]/10 border rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-[#2F4F4F]/10 flex items-center text-[#2F4F4F] text-lg font-bold">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pembayaran
                    </div>
                    <div className="px-6 py-4 space-y-4">
                      <button className="w-full justify-start border border-[#2F4F4F]/10 rounded px-4 py-2 bg-white hover:bg-gray-100">Kelola Metode Pembayaran</button>
                      <button className="w-full justify-start border border-[#2F4F4F]/10 rounded px-4 py-2 bg-white hover:bg-gray-100">Riwayat Transaksi</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }

          { isEditing &&
            <div className="border-[#2F4F4F]/10 border-2 rounded-md p-5">
              { isLoading ?
                <div>Loading...</div>
              :
                <>
                <div>
                  <h1 className="text-[#2F4F4F] cursor-pointer mb-5">Edit Profil</h1>
                </div>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#2F4F4F] mb-1 block">Nama Lengkap</label>
                      <input
                        value={profileDataEdited?.name}
                        disabled={session?.user?.name ? true : false}
                        onChange={(e) => setProfileDataEdited({ ...profileDataEdited, name: e.target.value })}
                        className="w-full border rounded py-1 px-3 border-[#2F4F4F]/20 focus:border-[#C9A15C]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2F4F4F] mb-1 block">Email</label>
                      <input
                        type="email"
                        value={profileDataEdited?.email}
                        disabled={session?.user?.email ? true : false}
                        onChange={(e) => setProfileDataEdited({ ...profileDataEdited, email: e.target.value })}
                        className="w-full border rounded py-1 px-3 border-[#2F4F4F]/20 focus:border-[#C9A15C]"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#2F4F4F] mb-1 block">Nomor HP</label>
                      <input
                        value={profileDataEdited?.phonenumber}
                        onChange={(e) => setProfileDataEdited({ ...profileDataEdited, phonenumber: e.target.value })}
                        className="w-full border rounded py-1 px-3 border-[#2F4F4F]/20 focus:border-[#C9A15C]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2F4F4F] mb-1 block">Lokasi</label>
                      <input
                        value={profileDataEdited?.location || ''}
                        onChange={(e) => setProfileDataEdited({ ...profileDataEdited, location: e.target.value })}
                        className="w-full border rounded py-1 px-3 border-[#2F4F4F]/20 focus:border-[#C9A15C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#2F4F4F] mb-1 block">Bio</label>
                    <textarea
                      value={profileDataEdited?.bio || ''}
                      onChange={(e) => setProfileDataEdited({ ...profileDataEdited, bio: e.target.value })}
                      className="w-full border rounded py-1 px-3 border-[#2F4F4F]/20 focus:border-[#C9A15C] min-h-20 max-h-40"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handleSaveProfile} className="py-1 px-3 rounded bg-[#C9A15C] hover:bg-[#C9A15C]/90 text-white cursor-pointer transform duration-200">
                      Simpan Perubahan
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex items-center py-1 px-3 rounded border border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white cursor-pointer transform duration-200">
                      Batal
                    </button>
                  </div>
                </div>
                </>
              }
            </div>
          }
        </div>
      </div>
    </>
  )
}
