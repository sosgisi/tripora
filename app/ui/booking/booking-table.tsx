import { fetchFilteredBookings } from "@/app/lib/data/booking";
import { User } from "@prisma/client";
import BookingTableContent from "./booking-table-content";

export default async function BookingTable({
  query,
  currentPage,
  user
}: {
  query: string;
  currentPage: number;
  user: User;
}) {

    const bookings = await fetchFilteredBookings(query, currentPage, user.id);
    
    return(
        <div className="grid-span-1">
            { bookings.length > 0 ? 
                bookings?.map((booking) => (
                    <BookingTableContent key={booking.id} booking={booking} />
                )) :
                <p className="mt-10">No bookings found.</p>
            }
        </div>
    )
}