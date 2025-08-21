import { fetchFilteredProviders } from "@/app/lib/data/provider";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const providers = await fetchFilteredProviders(query, currentPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 z-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Company Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Location</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">Category</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, i) => (
            <tr
              key={provider.id}
              className="bg-white dark:bg-gray-800"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {(currentPage - 1) * 6 + i + 1}
              </td>
              <td className="px-6 py-4">{provider.companyName}</td>
              <td className="px-6 py-4">{provider.companyEmail}</td>
              <td className="px-6 py-4">{provider.companyPhonenumber}</td>
              <td className="px-6 py-4">{provider.companyLocation}</td>
              <td className="px-6 py-4">{provider.companyDescription}</td>
              <td className="px-6 py-4">{provider.companyAddress}</td>
              <td className="px-6 py-4">{provider.companyCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
