import { fetchFilteredTrips } from "@/app/lib/data/trip";
import DeleteButton from "@/components/buttons/delete-button";
import EditTripButton from "./edit-button";

export default async function TripTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

    const trips = await fetchFilteredTrips(query, currentPage);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Provider</th>
                        <th scope="col" className="px-6 py-3">Departure</th>
                        <th scope="col" className="px-6 py-3">Return</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Participants</th>
                        <th scope="col" className="px-6 py-3">Active</th>
                    </tr>
                </thead>
                <tbody>
                {trips.map((trip, i:number) => (
                    <tr
                        key={trip.id}
                        className="bg-white dark:bg-gray-800"
                        >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {(currentPage - 1) * 6 + i + 1}
                        </td>
                        <td className="px-6 py-4">{trip.title}</td>
                        <td className="px-6 py-4">{trip.category?.name}</td>
                        <td className="px-6 py-4">{trip.location}</td>
                        <td className="px-6 py-4">{trip?.provider?.companyName || "-"}</td>
                        <td className="px-6 py-4">{trip.departureDate}</td>
                        <td className="px-6 py-4">{trip.returnDate}</td>
                        <td className="px-6 py-4">Rp{trip.price.toLocaleString()}</td>
                        <td className="px-6 py-4">{trip.currentParticipants}/{trip.maxParticipants}</td>
                        <td className="px-6 py-4 flex gap-5 items-center justify-center">
                            <span className={trip.isActive ? "text-green-600" : "text-red-600"}>
                                {trip.isActive ? "Yes" : "No"}
                            </span>
                            <EditTripButton selectedItem={trip} modal="trip" />
                            <DeleteButton modal="trip" selectedId={`${trip.id}`}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
