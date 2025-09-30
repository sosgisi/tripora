import { getTripById } from "@/app/lib/data/trip";
import BookingForm from "@/components/booking/booking-form";
import { BookingFormProvider } from "@/components/booking/booking-form-provider";
import BackButton from "@/components/detail trip/back-button";
import { Navbar } from "@/components/navbar";
import { Calendar, Dot, MapPin, Users } from "lucide-react";
import Image from "next/image";
import SidebarContent from "@/components/booking/sidebar-content";

export default async function BookingPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const trip = await getTripById(id);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center h-screen" dir="rtl">
        <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">
          الرحلة غير موجودة
        </h1>
      </div>
    );
  }

  const date = () => {
    if (trip?.departureDate.substring(5, 7) === trip?.returnDate.substring(5, 7)) {
      return `${trip?.departureDate.substring(trip.departureDate.length - 2)} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}`;
    }
    const departureMonth = trip?.departureDate.substring(5, 7);
    const returnMonth = trip?.returnDate.substring(5, 7);
    return `${trip?.departureDate.substring(trip.departureDate.length - 2)}}/${departureMonth} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}/${returnMonth}`;
  };

  const duration = () => {
    if (!trip?.departureDate || !trip?.returnDate) return "";

    const departure = new Date(trip.departureDate);
    const returnDate = new Date(trip.returnDate);

    const diffTime = Number(returnDate) - Number(departure);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} يوم${diffDays > 1 ? "" : ""}`;
  };

  return (
    <BookingFormProvider>
      <Navbar />
      <BackButton />
      <div
        className="flex flex-col w-full justify-center gap-3 text-primary dark:text-primary-dark text-center mt-20"
        dir="rtl"
      >
        <h1 className="font-bold text-3xl">حجز الرحلة</h1>
        <p>يرجى إكمال البيانات لتأكيد الحجز الخاص بك</p>
      </div>

      <div className="p-20 grid grid-cols-[2fr_1fr] gap-8" dir="rtl">
        {/* تفاصيل الرحلة */}
        <div className="col-span-1 text-primary dark:text-primary-dark">
          <h1 className="text-xl font-bold">تفاصيل الرحلة</h1>
          <div className="flex gap-3 mt-2">
            <Image
              src={trip.images[0]?.imageUrl || "/images/placeholder.png"}
              alt={trip.title}
              width={100}
              height={100}
              className="rounded-lg object-cover h-[100px]"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-xl">{trip.title}</h1>
              <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark">
                <MapPin size={15} />
                {trip?.location}
              </h1>
              <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark">
                <Calendar size={15} />
                {date()}
                <Dot size={15} />
                {duration()}
              </h1>
              <div className="flex items-center gap-1 w-fit px-3 py-0.5 rounded-xl bg-primary-hover text-white">
                <Users size={15} />
                {trip?.maxParticipants - trip.currentParticipants} مقعد متبقٍ
              </div>
            </div>
          </div>
          <BookingForm trip={trip} />
        </div>

        {/* محتوى الشريط الجانبي */}
        <SidebarContent trip={trip} />
      </div>
    </BookingFormProvider>
  );
}



// import { getTripById } from "@/app/lib/data/trip"
// import BookingForm from "@/components/booking/booking-form"
// import { BookingFormProvider } from "@/components/booking/booking-form-provider"
// import BackButton from "@/components/detail trip/back-button"
// import { Navbar } from "@/components/navbar"
// import { Calendar, Dot, MapPin, Users } from "lucide-react"
// import Image from "next/image"
// import SidebarContent from "@/components/booking/sidebar-content"

// export default async function BookingPage({ params }: { params: Promise<{ id: number }> }) {

//     const { id } = await params
//     const trip = await getTripById(id);

//     if(!trip){
//         return (
//             <div className="flex flex-col items-center justify-center h-screen">
//                 <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">Trip not found</h1>
//             </div>
//         );
//     }

//     const date = () => {
//         if(trip?.departureDate.substring(5, 7) === trip?.returnDate.substring(5, 7)){
//         return `${trip?.departureDate.substring(trip.departureDate.length - 2)} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}`
//         }
//         const departureMonth = trip?.departureDate.substring(5, 7);
//         const returnMonth = trip?.returnDate.substring(5, 7);
//         return `${trip?.departureDate.substring(trip.departureDate.length - 2)}}/${departureMonth} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}/${returnMonth}`
//     }

//     const duration = () => {
//         if (!trip?.departureDate || !trip?.returnDate) return "";

//         const departure = new Date(trip.departureDate);
//         const returnDate = new Date(trip.returnDate);

//         // Calculate difference in milliseconds
//         const diffTime = Number(returnDate) - Number(departure);

//         // Convert milliseconds to days
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
//     };

//     return(
//         <BookingFormProvider>
//             <Navbar/>
//             <BackButton/>
//             <div className="flex flex-col w-full justify-center gap-3 text-primary dark:text-primary-dark text-center mt-20">
//                 <h1 className="font-bold text-3xl">Booking Trip</h1>
//                 <p>Lengkapi data untuk mengkonfirmasi booking Anda</p>
//             </div>

//             <div className="p-20 grid grid-cols-[2fr_1fr] gap-8">
//                 {/* Detail Trip */}
//                 <div className="col-span-1 text-primary dark:text-primary-dark">
//                     <h1 className="text-xl font-bold">Detail Trip</h1>
//                     <div className="flex gap-3 mt-2">
//                         <Image
//                             src={trip.images[0]?.imageUrl || "/images/placeholder.png"}
//                             alt={trip.title}
//                             width={100}
//                             height={100}
//                             className="rounded-lg object-cover h-[100px]"
//                         />
//                         <div className="flex flex-col justify-center gap-">
//                             <h1 className="font-bold text-xl">{trip.title}</h1>
//                             <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><MapPin size={15}/>{trip?.location}</h1>
//                             <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark">
//                                 <Calendar size={15}/>
//                                 {date()}
//                                 <Dot size={15}/>
//                                 {duration()}
//                             </h1>
//                             <div className="flex items-center gap-1 w-fit px-3 py-0.5 rounded-xl bg-primary-hover text-white">
//                                 <Users size={15}/>
//                                 {trip?.maxParticipants - trip.currentParticipants} slot tersisa
//                             </div>
//                         </div>
//                     </div>
//                     <BookingForm trip={trip} />
//                 </div>

//                 {/* Sidebar Content */}
//                 <SidebarContent trip={trip}/>
//             </div>
//         </BookingFormProvider>
//     )
// }
