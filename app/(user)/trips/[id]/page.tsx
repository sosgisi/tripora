import { getProviderById } from "@/app/lib/data/provider";
import { getTripById } from "@/app/lib/data/trip";
import BackButton from "@/components/detail trip/back-button";
import DetailTripImage from "@/components/detail trip/detail-trip-image";
import DetailTripTabs from "@/components/detail trip/detail-trip-tabs";
import { Navbar } from "@/components/navbar"
import { Calendar, Clock, Dot, MapPin, Send, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TripDetailPage ({ params }: { params: Promise<{ id: number }>}) {

  const { id } = await params;
  const trip = await getTripById(id);

  const provider = await getProviderById(trip?.providerId || "");

  const date = () => {
    if(trip?.departureDate.substring(5, 7) === trip?.returnDate.substring(5, 7)){
      return `${trip?.departureDate.substring(trip.departureDate.length - 2)} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}`
    }
    const departureMonth = trip?.departureDate.substring(5, 7);
    const returnMonth = trip?.returnDate.substring(5, 7);
    return `${trip?.departureDate.substring(trip.departureDate.length - 2)}/${departureMonth} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}/${returnMonth}`
  }

  const duration = () => {
    if (!trip?.departureDate || !trip?.returnDate) return "";

    const departure = new Date(trip.departureDate);
    const returnDate = new Date(trip.returnDate);

    const diffTime = Number(returnDate) - Number(departure);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} يوم${diffDays > 1 ? "" : ""}`;
  };

  const tripRateAverage = trip?.reviews && trip?.reviews.reduce((acc, review) => acc + review.rating, 0) / (trip?.reviews.length || 1);

  return(
    <>
      <Navbar />
      
      <div className="p-20 mt-16 grid grid-cols-[2fr_1fr] gap-8" dir="rtl">
        {/* تفاصيل الرحلة */}
        <div className="col-span-1">
          <BackButton/>

          {/* محتوى */}
          <DetailTripImage trip={trip}/>

          <div className="flex items-center gap-1 w-fit mt-10 px-3 py-0.5 rounded-xl bg-primary-hover text-white">
            <Users size={15}/>
            {trip?.currentParticipants}/{trip?.maxParticipants} مشارك
          </div>
          <h1 className="text-primary dark:text-primary-dark text-3xl font-bold mt-10">{trip?.title}</h1>
          <div className="flex justify-between gap-5 mt-5">
            <div className="flex flex-col gap-2 w-full p-5 bg-white dark:bg-gray-800 rounded-md hover:shadow-xl border border-gray-200 transform duration-200">
              <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><MapPin size={15} className="text-primary-hover"/>{trip?.location}</h1>
              <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><Calendar size={15} className="text-primary-hover"/>التاريخ: {date()}</h1>
            </div>
            <div className="flex flex-col gap-2 w-full p-5 bg-white dark:bg-gray-800 rounded-md hover:shadow-xl border border-gray-200 transform duration-200">
              <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><Clock size={15} className="text-primary-hover"/>المدة: {duration()}</h1>
              <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><Star size={15} className="text-primary-hover"/>التقييم: {tripRateAverage} ({trip?.reviews.length} مراجعة)</h1>
            </div>
          </div>

          {/* تبويبات */}
          <DetailTripTabs trip={trip}/>

        </div>

        {/* الشريط الجانبي */}
        <div className="col-span-1 h-full bg-white dark:bg-gray-800 rounded-lg">
          <div className="sticky top-24 font-bold flex flex-col justify-center items-center p-10">
            {/* محتوى الشريط الجانبي */}
            <h1 className="text-4xl text-primary-hover dark:text-primary-hover-dark">ريال {trip?.price}</h1>
            <p className="text-gray-500">لكل شخص</p>
            <div className="w-full flex justify-between border-b border-gray-200 mt-14 text-gray-500 py-2">
              <h1>التاريخ</h1>
              <h1 className="text-primary dark:text-primary-dark">{date()}</h1>
            </div>
            <div className="w-full flex justify-between border-b border-gray-200 mt-5 text-gray-500 py-2">
              <h1>المدة</h1>
              <h1 className="text-primary dark:text-primary-dark">{duration()}</h1>
            </div>
            <div className="w-full flex justify-between border-b border-gray-200 mt-5 text-gray-500 py-2">
              <h1>المشاركين</h1>
              <h1 className="text-primary dark:text-primary-dark">{trip?.currentParticipants}/{trip?.maxParticipants}</h1>
            </div>
            
            <Link href={`/trips/${trip?.id}/booking`} className="flex justify-center items-center gap-2 w-full mt-10 py-3 rounded-lg text-white bg-primary-hover hover:scale-105 transition-transform duration-200 cursor-pointer">
              <Send/>
              انضم إلى الرحلة
            </Link>

            <div className="w-full mt-10 border-t border-gray-200">
              <h1 className="my-8 text-primary dark:text-primary-dark font-bold">منظم الرحلة</h1>
              <div className="flex gap-3">
                <Image
                  src={trip?.provider?.companyProfileImage || '/images/placeholder-user.jpg'}
                  alt={trip?.provider?.companyName || 'صورة المنظم'}
                  width={70}
                  height={70}
                  className={`rounded-full object-cover ${!trip?.provider.companyProfileImage && 'border'} border-gray-500`}
                />
                <div className="">
                  <h1 className="text-primary dark:text-primary-dark font-bold">{trip?.provider.companyName}</h1>
                  { provider?.trips && (
                    <h1 className="flex text-gray-500 font-normal">
                      {provider?.trips.length} رحلة
                      <Dot/>
                      منذ {provider?.createdAt.toLocaleDateString("ar-EG", { year: 'numeric' })}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© {new Date().getFullYear()} تريبورا. جميع الحقوق محفوظة.</p>
      </footer>
    </>
  )
}



// import { getProviderById } from "@/app/lib/data/provider";
// import { getTripById } from "@/app/lib/data/trip";
// import BackButton from "@/components/detail trip/back-button";
// import DetailTripImage from "@/components/detail trip/detail-trip-image";
// import DetailTripTabs from "@/components/detail trip/detail-trip-tabs";
// import { Navbar } from "@/components/navbar"
// import { Calendar, Clock, Dot, MapPin, Send, Star, Users } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default async function TripDetailPage ({ params }: { params: Promise<{ id: number }>}) {

//   const { id } = await params;
//   const trip = await getTripById(id);

//   const provider = await getProviderById(trip?.providerId || "");

//   const date = () => {
//     if(trip?.departureDate.substring(5, 7) === trip?.returnDate.substring(5, 7)){
//       return `${trip?.departureDate.substring(trip.departureDate.length - 2)} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}`
//     }
//     const departureMonth = trip?.departureDate.substring(5, 7);
//     const returnMonth = trip?.returnDate.substring(5, 7);
//     return `${trip?.departureDate.substring(trip.departureDate.length - 2)}}/${departureMonth} - ${trip?.returnDate.substring(trip.returnDate.length - 2)}/${returnMonth}`
//   }

//   const duration = () => {
//     if (!trip?.departureDate || !trip?.returnDate) return "";

//     const departure = new Date(trip.departureDate);
//     const returnDate = new Date(trip.returnDate);

//     // Calculate difference in milliseconds
//     const diffTime = Number(returnDate) - Number(departure);

//     // Convert milliseconds to days
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
//   };

//   const tripRateAverage = trip?.reviews && trip?.reviews.reduce((acc, review) => acc + review.rating, 0) / (trip?.reviews.length || 1);

//   return(
//     <>
//       <Navbar />
      
//       <div className="p-20 mt-16 grid grid-cols-[2fr_1fr] gap-8">
//         {/* Detailed Trip */}
//         <div className="col-span-1">
//           <BackButton/>

//           {/* Content */}
//           <DetailTripImage trip={trip}/>

//           <div className="flex items-center gap-1 w-fit mt-10 px-3 py-0.5 rounded-xl bg-primary-hover text-white">
//             <Users size={15}/>
//             {trip?.currentParticipants}/{trip?.maxParticipants} Participants
//           </div>
//           <h1 className="text-primary dark:text-primary-dark text-3xl font-bold mt-10">{trip?.title}</h1>
//           <div className="flex justify-between gap-5 mt-5">
//             <div className="flex flex-col gap-2 w-full p-5 bg-white dark:bg-gray-800 rounded-md hover:shadow-xl border border-gray-200 transform duration-200">
//               <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><MapPin size={15} className="text-primary-hover"/>{trip?.location}</h1>
//               <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><Calendar size={15} className="text-primary-hover"/>{date()}</h1>
//             </div>
//             <div className="flex flex-col gap-2 w-full p-5 bg-white dark:bg-gray-800 rounded-md hover:shadow-xl border border-gray-200 transform duration-200">
//               <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><Clock size={15} className="text-primary-hover"/>{duration()}</h1>
//               <h1 className="flex items-center gap-2 text-primary dark:text-primary-dark"><Star size={15} className="text-primary-hover"/>{tripRateAverage} ({trip?.reviews.length} review)</h1>
//             </div>
//           </div>

//           {/* Tabs content */}
//           <DetailTripTabs trip={trip}/>

//         </div>

//         {/* Sidebar */}
//         <div className="col-span-1 h-full bg-white dark:bg-gray-800 rounded-lg">
//           <div className="sticky top-24 font-bold flex flex-col justify-center items-center p-10">
//             {/* Sidebar Content */}
//             <h1 className="text-4xl text-primary-hover dark:text-primary-hover-dark">Rp {trip?.price}</h1>
//             <p className="text-gray-500">per person</p>
//             <div className="w-full flex justify-between border-b border-gray-200 mt-14 text-gray-500 py-2">
//               <h1>Date</h1>
//               <h1 className="text-primary dark:text-primary-dark">{date()}</h1>
//             </div>
//             <div className="w-full flex justify-between border-b border-gray-200 mt-5 text-gray-500 py-2">
//               <h1>Duration</h1>
//               <h1 className="text-primary dark:text-primary-dark">{duration()}</h1>
//             </div>
//             <div className="w-full flex justify-between border-b border-gray-200 mt-5 text-gray-500 py-2">
//               <h1>Participants</h1>
//               <h1 className="text-primary dark:text-primary-dark">{trip?.currentParticipants}/{trip?.maxParticipants}</h1>
//             </div>
            
//             <Link href={`/trips/${trip?.id}/booking`} className="flex justify-center items-center gap-2 w-full mt-10 py-3 rounded-lg text-white bg-primary-hover hover:scale-105 transition-transform duration-200 cursor-pointer">
//               <Send/>
//               Join Trip
//             </Link>

//             <div className="w-full mt-10 border-t border-gray-200">
//               <h1 className="my-8 text-primary dark:text-primary-dark font-bold">Host Trip</h1>
//               <div className="flex gap-3">
//                 <Image
//                   src={trip?.provider?.companyProfileImage || '/images/placeholder-user.jpg'}
//                   alt={trip?.provider?.companyName || 'Host Image'}
//                   width={70}
//                   height={70}
//                   className={`rounded-full object-cover ${!trip?.provider.companyProfileImage && 'border'} border-gray-500`}
//                 />
//                 <div className="">
//                   <h1 className="text-primary dark:text-primary-dark font-bold">{trip?.provider.companyName}</h1>
//                   { provider?.trips && (
//                     <h1 className="flex text-gray-500 font-normal">
//                       {provider?.trips.length} trip{provider?.trips.length > 1 ? "s" : ""}
//                       <Dot/>
//                       Since {provider?.createdAt.toLocaleDateString("en-US", { year: 'numeric' })}
//                     </h1>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <footer className="bg-gray-800 text-white py-4 text-center">
//         <p>&copy; {new Date().getFullYear()} Tripora. All rights reserved.</p>
//       </footer>
//     </>
//   )
// }

