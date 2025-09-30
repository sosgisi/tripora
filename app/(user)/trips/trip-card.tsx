import { fetchFilteredTrips } from "@/app/lib/data/trip";
import { Calendar, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TripCard({
  query,
  currentPage,
  category
}: {
  query: string;
  currentPage: number;
  category: string;
}) {

  const trips = await fetchFilteredTrips(query, currentPage, category);

  return (
    <>
      <h1 className="text-heading">{`${trips.length} رحلة متوفرة`}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="group hover:shadow-xl transition-all duration-300 border border-[#2F4F4F]/20 overflow-hidden bg-white dark:bg-gray-800 text-[#2F4F4F] dark:text-white rounded-lg"
          >
            <div className="relative">
              <Image
                src={trip.images[0]?.imageUrl || "/placeholder.svg"}
                alt={trip.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute py-0.5 px-2 rounded-full text-xs font-medium top-4 left-4 bg-[#C9A15C] text-white">
                {trip.currentParticipants}/{trip.maxParticipants} مشارك
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-3 line-clamp-2">{trip.title}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {trip.location}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {trip.departureDate}
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 fill-[#C9A15C] text-[#C9A15C]" />
                  {trip.reviews?.[0]?.rating || 0} تقييم
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-[#C9A15C]">{trip.price}</p>
                  <p className="text-sm">لكل شخص</p>
                </div>
                <Link href={`/trips/${trip.id}`}>
                  <button className="bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 text-white py-1 px-3 whitespace-nowrap rounded cursor-pointer transform duration-200">
                    عرض التفاصيل
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}



// import { fetchFilteredTrips } from "@/app/lib/data/trip";
// import { Calendar, MapPin, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default async function TripCard({
//   query,
//   currentPage,
//   category
// }: {
//   query: string;
//   currentPage: number;
//   category: string;
// }) {

//     const trips = await fetchFilteredTrips(query, currentPage, category);

//     return(
//         <>
//         <h1 className="text-heading">{`${trips.length} Trip found`}</h1>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {trips.map((trip, index) => (
//             <div
//                 key={index}
//                 className="group hover:shadow-xl transition-all duration-300 border border-[#2F4F4F]/20 overflow-hidden bg-white dark:bg-gray-800 text-[#2F4F4F] dark:text-white rounded-lg"
//             >
//                 <div className="relative">
//                     <Image
//                         src={trip.images[0]?.imageUrl || "/placeholder.svg"}
//                         alt={trip.title}
//                         width={300}
//                         height={200}
//                         className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <p className="absolute py-0.5 px-2 rounded-full text-xs font-medium top-4 left-4 bg-[#C9A15C] text-white">
//                         {trip.currentParticipants}/{trip.maxParticipants} peserta
//                     </p>
//                 </div>
//                 <div className="p-6">
//                     <h3 className="font-bold text-lg mb-3 line-clamp-2">{trip.title}</h3>

//                     <div className="space-y-2 mb-4">
//                         <div className="flex items-center text-sm">
//                             <MapPin className="w-4 h-4 mr-2" />
//                             {trip.location}
//                         </div>
//                         <div className="flex items-center text-sm">
//                             <Calendar className="w-4 h-4 mr-2" />
//                             {trip.departureDate}
//                         </div>
//                         <div className="flex items-center text-sm">
//                             <Star className="w-4 h-4 mr-2 fill-[#C9A15C] text-[#C9A15C]" />
//                             {trip.reviews?.[0]?.rating || 0} rating
//                         </div>
//                     </div>

//                     <div className="flex justify-between items-center">
//                         <div>
//                             <p className="text-2xl font-bold text-[#C9A15C]">{trip.price}</p>
//                             <p className="text-sm">per orang</p>
//                         </div>
//                         <Link href={`/trips/${trip.id}`}>
//                             <button className="bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 text-white py-1 px-3 whitespace-nowrap rounded cursor-pointer transform duration-200">Lihat Detail</button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//             ))}
//         </div>
//         </>
//     )
// }