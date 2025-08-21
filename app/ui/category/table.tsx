import { fetchFilteredCategory } from "@/app/lib/data/category";
import DeleteButton from "@/components/buttons/delete-button";
import EditCategoryButton from "./edit-button";

export default async function CategoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

    const categories = await fetchFilteredCategory(query, currentPage);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((category, i:number) => (
                    <tr
                        key={category.id}
                        className="bg-white dark:bg-gray-800"
                        >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {(currentPage - 1) * 6 + i + 1}
                        </td>
                        <td className="px-6 py-4">{category.name}</td>
                        <td className="px-6 py-4 flex gap-5 items-center">
                            <EditCategoryButton selectedItem={category} modal="trip" />
                            <DeleteButton modal="category" selectedId={category.id}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
